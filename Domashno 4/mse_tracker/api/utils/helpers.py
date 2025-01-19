import sqlite3

import pandas as pd
from api.utils.mappers import *

def connect_to_db():
    return sqlite3.connect("./databases/final_stock_data.db")


def fetch_data(query, params=()):
    with connect_to_db() as conn:
        curs = conn.cursor()
        curs.execute(query, params)
        return curs.fetchall()


def preprocess_stock_data(data):
    dataframe = pd.DataFrame(data, columns=['issuer', 'date', 'cena_posledna', 'mak', 'min', 'average', 'percentChange',
                                            'kolichina', 'prometbest', 'vkupenPromet'])

    for col in ['date', 'cena_posledna', 'mak', 'min', 'average', 'percentChange', 'kolichina', 'prometbest',
                'vkupenPromet']:
        dataframe[col] = dataframe[col].apply(convert_date if col == 'date' else convert_number)
    return dataframe


def filter_timeframe(dataframe, adder):
    if adder == "y":
        return dataframe.tail(min(len(dataframe), 365))
    elif adder == "m":
        return dataframe.tail(min(len(dataframe), 30))
    elif adder == "w":
        return dataframe.tail(min(len(dataframe), 7))
    return dataframe
