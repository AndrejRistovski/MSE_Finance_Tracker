import sqlite3
import requests
import html
import re
import pdfplumber
from io import BytesIO
from concurrent.futures import ThreadPoolExecutor
from multiprocessing import Process
from html.parser import HTMLParser
from transformers import pipeline

parser = HTMLParser()
classifier = pipeline('sentiment-analysis')


def process_document(document):
    try:
        content = document.get('content', '')
        document_id = document.get('documentId', '')
        description = document['layout']['description']
        content = html.unescape(content)
        content = re.sub(r'<[^>]*>', '', content)
        published_date = document['publishedDate'].split("T")[0]
        issuer_code = document['issuer']['code']
        display_name = document['issuer']['localizedTerms'][0]['displayName']

        if 'this is automaticaly generated document'.lower() in content.lower():
            return

        text = ""
        attachments = document.get('attachments', [])
        if attachments:
            attachment_id = attachments[0].get('attachmentId')
            file_name = attachments[0].get('fileName')

            if file_name.lower().endswith('.pdf'):
                attachment_url = f"https://api.seinet.com.mk/public/documents/attachment/{attachment_id}"
                response = requests.get(attachment_url)
                if response.status_code == 200:
                    pdf_file = BytesIO(response.content)
                    with pdfplumber.open(pdf_file) as pdf:
                        for page in pdf.pages:
                            text += page.extract_text()
                content += "\n"
                content += text

        # Ensure there's text to classify
        if not content.strip():
            print(f"Empty text for document {document_id}, skipping sentiment analysis.")
            return

        # Sentiment analysis
        try:
            classification = classifier(content[:500])[0]
            print(f"Model output: {classification}")
            sentiment = classification.get('label', 'Unknown')  # Use 'label' as the key
            probability = classification.get('score', 0.0)
        except Exception as e:
            print(f"Error during sentiment classification for document {document_id}: {e}")
            return

        # Database insert
        connection = sqlite3.connect("../../databases/final_stock_data.db")
        cursor = connection.cursor()

        cursor.execute("SELECT 1 FROM news WHERE document_id = ?", (document_id,))
        existing_entry = cursor.fetchone()

        if not existing_entry:
            try:
                cursor.execute(
                    """
                    INSERT INTO news (document_id, date, description, content, company_code, company_name, sentiment, probability)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (document_id, published_date, description, content, issuer_code, display_name, sentiment,
                     probability)
                )
                connection.commit()
                print("Inserted new entry into database")
            except Exception as e:
                print(f"Error inserting document into database for {document_id}: {e}")
        else:
            print(f"Entry Exists: {existing_entry}")

        connection.close()
    except Exception as e:
        print(f"Error processing document {document_id}: {e}")


def process_page(page):
    payload = {
        "issuerId": 0,
        "languageId": 2,
        "channelId": 1,
        "dateFrom": "2020-02-01T00:00:00",
        "dateTo": "2024-12-31T23:59:59",
        "isPushRequest": False,
        "page": page
    }
    headers = {"Content-Type": "application/json"}
    url = "https://api.seinet.com.mk/public/documents"

    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        json_data = response.json()
        documents = json_data.get('data', [])
        with ThreadPoolExecutor(max_workers=4) as executor:
            for document in documents:
                executor.submit(process_document, document)


def fetch_pages_worker(pages_subset):
    for page in pages_subset:
        process_page(page)


def fetch():
    processes = []
    chunk_size = 1030 // 8
    page_chunks = [range(i, min(i + chunk_size, 1030 + 1)) for i in range(1, 1030 + 1, chunk_size)]

    for chunk in page_chunks:
        p = Process(target=fetch_pages_worker, args=(chunk,))
        processes.append(p)
        p.start()

    for p in processes:
        p.join()


if __name__ == "__main__":
    fetch()
