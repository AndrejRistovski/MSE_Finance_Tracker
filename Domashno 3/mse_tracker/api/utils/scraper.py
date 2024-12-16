import requests
from bs4 import BeautifulSoup
import json
import re


# 1. Skrejpanje na vesti.mk

def scrape_vesti_mk():
    url = "https://www.vesti.mk/category/biznis"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    articles = soup.find_all("div", class_="grid lg:mb-5 pb-1 lg:h-28 lg:grid-cols-6 lg:pr-7 grid-cols-12")
    data = []

    for article in articles:
        try:

            headline_tag = article.find("p",
                                        class_="lg:line-clamp-2 line-clamp-3 leading-4 cursor-pointer roboto-font .najnovi-font font-semibold lg:font-bold")
            headline = headline_tag.text.strip() if headline_tag else None


            text_tag = article.find("div", class_="lg:grid grid-cols-1 hidden")
            p_tag = text_tag.find("p",
                                  class_="col-span-1 line-clamp-2 lg:line-clamp-3 text-sm-small-line-height") if text_tag else None
            text = p_tag.text.strip() if p_tag else None


            date_match = re.search(r"\d{2}/\d{2}/\d{4}", text)
            date = date_match.group(0) if date_match else None

            # PROBLEM SO SLIKITE NE SE VADAT NESTO SO BASE64 FORMAT

            img_tag = article.find("div").find("img")
            if img_tag and img_tag.has_attr("src"):
                img_url = img_tag["src"]

                if img_url.startswith("data:image/svg+xml;base64,"):
                    img_url = None
            else:
                img_url = None


            data.append({
                "headline": headline,
                "text": text,
                "image_url": img_url,
                "date": date
            })
        except Exception as e:
            print(f"Error on vesti.mk: {e}")
            continue

    return data


# 2. Scraping grid.mk

def scrape_grid_mk():
    url = "https://grid.mk/biznis"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")


    articles = soup.find_all("article", class_="post")

    data = []
    for article in articles:
        try:
            # Naslov
            headline_tag = article.find("h2", class_="post-title")
            headline = headline_tag.text.strip() if headline_tag else None

            # I teksto e dinamicki treba so Selenium
            hidden_div_tag = article.find("div", class_="hidden")
            if hidden_div_tag:
                text_tag = hidden_div_tag.find("p", class_="post-text")
                text = text_tag.text.strip() if text_tag else None
            else:
                text = None

            # Slika URL
            img_tag = article.find("img", class_="post-image")
            img_url = img_tag["src"] if img_tag and img_tag.has_attr("src") else None

            # Problem datata se naogja koa so otvore article, treba na drug nacin da se iskrejpa
            date_tag = article.find("span", class_="time")
            date = date_tag.text.strip() if date_tag else None


            data.append({
                "headline": headline,
                "text": text,
                "image_url": img_url,
                "date": date
            })
        except Exception as e:
            print(f"Error on grid.mk: {e}")
            continue

    return data



# 3. Scraping investnorthmacedonia.gov.mk
def scrape_investnorthmacedonia():
    url = "https://investnorthmacedonia.gov.mk/mk/archive/biznis-vesti/"

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad HTTP responses
    except requests.RequestException as e:
        print(f"Failed to fetch data from {url}: {e}")
        return []

    soup = BeautifulSoup(response.text, "html.parser")
    articles = soup.find_all("article")

    if not articles:
        print("No articles found on the page.")
        return []

    data = []
    for article in articles:
        try:

            headline_tag = article.find("h2", class_="post-title")
            headline = headline_tag.text.strip() if headline_tag else "No headline available"


            text_tag = article.find("div", class_="post-excerpt")
            text = text_tag.text.strip() if text_tag else "No excerpt available"

            img_tag = article.find("img")
            img_url = img_tag["src"] if img_tag else "No image available"


            date_tag = article.find("time")
            date = date_tag.text.strip() if date_tag else "No date available"


            data.append({
                "headline": headline,
                "text": text,
                "image_url": img_url,
                "date": date
            })
        except Exception as e:
            print(f"Error processing an article: {e}")
            continue

    return data #Ne se vlecat pogledi go sajto


# 4. Scraping biznisinfo.mk
def scrape_biznisinfo_mk():
    url = "https://biznisinfo.mk/kategorija/biznis-vesti/makedonija/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    articles = soup.find_all("article")

    data = []
    for article in articles:
        try:
            headline_tag = article.find("h2", class_="post-title")
            headline = headline_tag.text.strip() if headline_tag else None

            text_tag = article.find("div", class_="post-excerpt")
            text = text_tag.text.strip() if text_tag else None

            img_tag = article.find("img")
            img_url = img_tag["src"] if img_tag else None

            date_tag = article.find("time")
            date = date_tag.text.strip() if date_tag else None

            data.append({
                "headline": headline,
                "text": text,
                "image_url": img_url,
                "date": date
            })
        except Exception as e:
            print(f"Error on biznisinfo.mk: {e}")
            continue

    return data



def scrape_daily_mk():
    url = "https://daily.mk/ekonomija/latest"

    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Failed to fetch data from {url}: {e}")
        return []

    soup = BeautifulSoup(response.text, "html.parser")
    articles = soup.find_all("div", class_="articlecontainer")

    if not articles:
        print("No articles found on the page.")
        return []

    data = []
    for article in articles:
        try:

            headline_tag = article.find("h2", itemprop="name")
            headline = headline_tag.text.strip() if headline_tag else "No headline available"


            text_tag = article.find("div", class_="voved")
            text = text_tag.text.strip() if text_tag else "No text available"


            image_container = article.find_parent("div", class_="imagecontainer")  # Parent/sibling relationship
            if not image_container:
                image_container = soup.find("div", class_="imagecontainer")
            img_tag = image_container.find("img") if image_container else None
            img_url = img_tag["src"] if img_tag else "No image available"


            date_tag = article.find("span", class_="thetime")
            date = date_tag.text.strip() if date_tag else "No date available"


            data.append({
                "headline": headline,
                "text": text,
                "image_url": img_url,
                "date": date
            })
        except Exception as e:
            print(f"Error processing an article: {e}")
            continue

    return data




# 6. Scraping time.mk
# def scrape_time_mk():
#     url = "https://time.mk/s/biznisvesti/1"
#     response = requests.get(url)
#     soup = BeautifulSoup(response.text, "html.parser")
#     articles = soup.find_all("article")
#
#     data = []
#     for article in articles:
#         try:
#             headline_tag = article.find("h2", class_="entry-title")
#             headline = headline_tag.text.strip() if headline_tag else None
#
#             text_tag = article.find("div", class_="entry-summary")
#             text = text_tag.text.strip() if text_tag else None
#
#             img_tag = article.find("img")
#             img_url = img_tag["src"] if img_tag else None
#
#             date_tag = article.find("time")
#             date = date_tag.text.strip() if date_tag else None
#
#             data.append({
#                 "headline": headline,
#                 "text": text,
#                 "image_url": img_url,
#                 "date": date
#             })
#         except Exception as e:
#             print(f"Error on time.mk: {e}")
#             continue
#
#     return data nema sansi da se iskrejpa


# 7. Scraping plusinfo.mk
# def scrape_plusinfo_mk():
#     url = "https://plusinfo.mk/category/biznis/"
#     response = requests.get(url)
#     soup = BeautifulSoup(response.text, "html.parser")
#     articles = soup.find_all("article")
#
#     data = []
#     for article in articles:
#         try:
#             headline_tag = article.find("h2", class_="entry-title")
#             headline = headline_tag.text.strip() if headline_tag else None
#
#             text_tag = article.find("div", class_="entry-summary")
#             text = text_tag.text.strip() if text_tag else None
#
#             img_tag = article.find("img")
#             img_url = img_tag["src"] if img_tag else None
#
#             date_tag = article.find("time")
#             date = date_tag.text.strip() if date_tag else None
#
#             data.append({
#                 "headline": headline,
#                 "text": text,
#                 "image_url": img_url,
#                 "date": date
#             })
#         except Exception as e:
#             print(f"Error on plusinfo.mk: {e}")
#             continue
#
#     return data


# 8. Scraping centar.mk
import requests
from bs4 import BeautifulSoup
import re

def scrape_centar_mk():
    url = "https://centar.mk/blog/category/biznis/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    articles = soup.find_all("article")

    data = []
    for article in articles:
        try:

            headline_tag = article.find("h2", class_="entry-title")
            headline = headline_tag.text.strip() if headline_tag else None


            text_tag = article.find("div", class_="entry-content")
            text = text_tag.text.strip() if text_tag else None


            img_tag = article.find("a", class_="penci-link-post penci-image-holder penci-lazy")
            if img_tag:
                style = img_tag.get("style", "")
                match = re.search(r'url\("([^"]+)"\)', style)
                img_url = match.group(1) if match else None
            else:
                img_url = None


            date_tag = article.find("time")
            date = date_tag.text.strip() if date_tag else None

            data.append({
                "headline": headline,
                "text": text,
                "image_url": img_url,
                "date": date
            })
        except Exception as e:
            print(f"Error on centar.mk: {e}")
            continue

    return data

def scrape_biznisvesti():
    url = "https://biznisvesti.mk/category/finansii/"
    response = requests.get(url)

    if response.status_code != 200:
        return json.dumps({"error": f"Failed to retrieve the page: {response.status_code}"}, ensure_ascii=False)

    soup = BeautifulSoup(response.text, "html.parser")
    articles = soup.find_all("article")

    scraped_data = []
    for article in articles:
        try:
            # Vadenje naslov
            headline_tag = article.find("h2", class_="post-box-title")
            headline = headline_tag.text.strip() if headline_tag else None

            # Vadenje tekst
            text_tag = article.find("div", class_="entry")
            text = text_tag.text.strip() if text_tag else None

            # Vadenje slika URL
            img_tag = article.find("img")
            img_url = img_tag["src"] if img_tag else None

            # Vadenje datum
            date_tag = article.find("span", class_="tie-date")
            date = date_tag.text.strip() if date_tag else None

            # Dodavanje u lista
            scraped_data.append({
                "headline": headline,
                "text": text,
                "image_url": img_url,
                "date": date
            })
        except AttributeError:
            continue

    # JSON konverzija
    return scraped_data



def scrape_all_sites():
    all_data = []
    all_data.extend(scrape_vesti_mk())
    all_data.extend(scrape_grid_mk())
    all_data.extend(scrape_investnorthmacedonia())
    all_data.extend(scrape_biznisinfo_mk())
    all_data.extend(scrape_daily_mk())
    #all_data.extend(scrape_time_mk())
    #all_data.extend(scrape_plusinfo_mk())
    all_data.extend(scrape_centar_mk())
    all_data.extend(scrape_biznisvesti())

    return all_data



if __name__ == "__main__":
    all_news_data = scrape_all_sites()
    print(json.dumps(all_news_data, ensure_ascii=False, indent=4))
