import os
import requests
from bs4 import BeautifulSoup
import sqlite3
from datetime import datetime
from multiprocessing import Pool, Manager, Lock
import time


dblock = Lock()


# Филтер 1: Функција за преземање на издавачите
def fetch_issuers():
    with dblock:
        connection = sqlite3.connect("./databases/final_stock_data.db")
        cursor = connection.cursor()
        url = 'https://www.mse.mk/mk/stats/symbolhistory/ALKB'  # Се користи еден издавач за да се превземат сите други
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        issuers = []
        for option in soup.select('select#Code option'):
            issuer_code = option['value']
            if not any(char.isdigit() for char in issuer_code):  # Не се земаат кодовите со цифри во нив затоа што тоа се обврзници
                issuers.append(issuer_code)
                cursor.execute("INSERT INTO tickers (ID) VALUES (?)", (issuer_code,))
        connection.commit()
        connection.close()
    return issuers


# Филтер 2: Функција за проверка на последен датум
def check_last_date(issuer, db_name):
    with dblock:
        conn = sqlite3.connect(db_name)
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS stock_prices (
                            issuer TEXT,
                            date TEXT,
                            cena_posledna TEXT,
                            mak TEXT,
                            min TEXT,
                            average TEXT,
                            percentChange TEXT,
                            kolichina TEXT,
                            prometbest TEXT,
                            vkupenPromet TEXT,
                            PRIMARY KEY (issuer, date));''')  # Доколку не постои табелата за цените, се креира таква табела
        cursor.execute('''SELECT MAX(date(substr(date, 7, 4) || '-' || substr(date, 4, 2) || '-' || substr(date, 1, 2)))
            FROM stock_prices
            WHERE issuer = ?;
            ''', (issuer,))
        # Форматот на датумите кој ни потребен е дд.мм.гггг, a SQLite3 ги гледа како стрингови и при обичен MAX враќа грешен резултат.
        # Затоа се реформатира датумот, па потоа се извршува MAX прашалникот. Податоците во базата сеуште го имаат форматот дд.мм.гггг
        result = cursor.fetchone()
        last_date = result[0] if result[0] else '2013.01.01'
        conn.close()
    return last_date


# Филтер 3: Функција за собирање на податоците кои недостасуваат
def fetch_missing_data(issuer, last_date):
    start_year = int(last_date[:4])  # Се гледа само годината, табелата која се добива ќе содржи податоци за цела година, и покрај тоа што може истите податоци за се вметнат, базата е множество од торки и при INSERT нема да се внесуваат ппдатоци кои веќе ги има.
    end_year = datetime.now().year
    all_data = []

    session = requests.Session()

    for year in reversed(range(start_year, end_year + 1)):  # Се почнува од 2024 па се до годината до која недостасуваат податоци. Доколку нема податоци на пр. за 2020, нема да има податоци и за 2019 итн.
        url = f'https://www.mse.mk/mk/stats/symbolhistory/{issuer}/?FromDate=01.01.{year}&ToDate=31.12.{year}'
        try:
            response = session.get(url)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            continue

        soup = BeautifulSoup(response.text, "html.parser")
        table = soup.find('tbody')

        if not table:
            break

        rows = table.find_all('tr')
        data = []
        for row in rows:
            cols = row.find_all('td')
            if len(cols) == 9:
                try:
                    datum = cols[0].text.strip()
                    cena_posledna = cols[1].text.strip()
                    mak = cols[2].text.strip()
                    min = cols[3].text.strip()
                    average = cols[4].text.strip()
                    percentChange = cols[5].text.strip()
                    kolichina = cols[6].text.strip()
                    prometbest = cols[7].text.strip()
                    vkupenPromet = cols[8].text.strip()
                    data.append((datum, cena_posledna, mak, min, average, percentChange, kolichina, prometbest, vkupenPromet))
                except Exception as e:
                    print(f"Error parsing row for issuer {issuer} in year {year}: {e}")
                    continue

        if data:
            all_data.extend(data)

    return all_data


# Функција за зачувување на податоците во база
def save_data_to_db(data, issuer, db_name):
    with dblock:
        conn = sqlite3.connect(db_name)
        cursor = conn.cursor()

        rows_to_insert = [(issuer, *row) for row in data]

        cursor.executemany('''INSERT OR IGNORE INTO stock_prices (issuer, date, cena_posledna, mak, min, average, percentChange, kolichina, prometbest, vkupenPromet)
                              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''', rows_to_insert)
        conn.commit()
        conn.close()


# Функција каде се користат Филтер 2 и Филтер 3
def process_issuer(issuer, db_name):
    last_date = check_last_date(issuer, db_name)
    data = fetch_missing_data(issuer, last_date)
    save_data_to_db(data, issuer, db_name)


# Функција за поделба на издавачите на n листи кои ќе се обработуваат во n процеси
def split_issuers(issuers, n):
    k, m = divmod(len(issuers), n)
    return [issuers[i * k + min(i, m):(i + 1) * k + min(i + 1, m)] for i in range(n)]


# Функција која ги спојува сите бази на податоци во една
def merge_databases(db_names, final_db_name):
    with dblock:
        final_conn = sqlite3.connect(final_db_name)
        final_cursor = final_conn.cursor()

        final_cursor.execute('''CREATE TABLE IF NOT EXISTS stock_prices (
                                issuer TEXT,
                                date TEXT,
                                cena_posledna TEXT,
                                mak TEXT,
                                min TEXT,
                                average TEXT,
                                percentChange TEXT,
                                kolichina TEXT,
                                prometbest TEXT,
                                vkupenPromet TEXT,
                                PRIMARY KEY (issuer, date));''')

        for db_name in db_names:
            temp_conn = sqlite3.connect(db_name)
            temp_cursor = temp_conn.cursor()

            temp_cursor.execute('''SELECT * FROM stock_prices''')
            rows = temp_cursor.fetchall()

            final_cursor.executemany('''INSERT OR IGNORE INTO stock_prices (issuer, date, cena_posledna, mak, min, average, percentChange, kolichina, prometbest, vkupenPromet)
                                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''', rows)

            temp_conn.close()

        final_conn.commit()
        final_conn.close()


# Имлементација на Pipe and Filter
# Излезот од fetch_issuers() се користи како влезен аргумент во process_issuer()
# која е функција во која се наоѓаат филтрите 2 и 3.
#               1                  2                    3
# Pipeline-от e fetch_issuers() -> check_last_date() -> fetch_missing_data()
# Сите останати функции се помошни функции и се имплементирани така поради разбирливост на кодот.
def pipeline():
    issuers = fetch_issuers()
    issuer_groups = split_issuers(issuers, 8)
    print(os.getcwd())
    db_names = [f'./databases/stock_data_part_{i}.db' for i in range(8)]

    # Се воведува multiprocessing за да се активираат повеќе процесорски јадра при обработката на податоците
    with Manager() as manager:
        with Pool(processes=8) as pool:
            for i, group in enumerate(issuer_groups):
                db_name = db_names[i]
                pool.starmap(process_issuer, [(issuer, db_name) for issuer in group])

    merge_databases(db_names, './databases/final_stock_data.db')


# # Се стартува тајмер, се извршува pipeline-от
# # и завршува тајмерот што дава презицни резултати за времето кое е потребно да се соберат податоците
# def main():
#     start_time = time.time()
#     pipeline()
#     end_time = time.time()
#     print(f"Data processing completed in {end_time - start_time} seconds")
#
# if __name__ == "__main__":
#     main()
