import json
import time
import pandas as pd
from django.http import HttpResponse, JsonResponse
from api.utils.fetcher import pipeline
from api.utils.helpers import *
from api.utils.technical_analysis_utils import *
from api.handlers.stock_handlers import StockHandlerFactory


def index(request):
    return HttpResponse("Hello, world. You're at the API index.")


def update(request):
    start_time = time.time()
    pipeline()
    end_time = time.time()
    return HttpResponse(f"Data processing completed in {end_time - start_time:.2f} seconds")


def price(request, option1, adder):
    data = fetch_data("SELECT * FROM stock_prices WHERE issuer = ?", (option1,))
    dataframe = preprocess_stock_data(data)
    df2 = dataframe[['date', 'cena_posledna']].rename(columns={'date': 'time', 'cena_posledna': 'close'}).dropna()
    df2 = filter_timeframe(df2.sort_values(by='time'), adder)
    return HttpResponse(df2.to_json(orient="records"))


def symbols(request):
    data = fetch_data("SELECT * FROM tickers")
    return HttpResponse(json.dumps([item for sublist in data for item in sublist]))


def technical_analysis(request, option1, adder):
    try:
        handler = StockHandlerFactory.get_handler("technical_analysis")
        return handler.process(option1, adder)
    except Exception as e:
        return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)


def fundamental_analysis(request, issuer):
    try:
        handler = StockHandlerFactory.get_handler("fundamental_analysis")
        return handler.process(issuer)
    except Exception as e:
        return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)


def lstm_prediction(request, issuer):
    try:
        handler = StockHandlerFactory.get_handler("lstm_prediction")
        return handler.process(issuer)
    except Exception as e:
        return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)


def news_article(request, document_id):
    data = fetch_data("SELECT * FROM news WHERE document_id = ?", (document_id,))
    dataframe = pd.DataFrame(data,
                             columns=['document_id', 'date', 'description', 'content', 'company_code', 'company_name',
                                      'sentiment', 'probability'])
    return HttpResponse(dataframe.to_json(orient="records"))


def news(request):
    data = fetch_data("SELECT * FROM news ORDER BY date DESC LIMIT 100")
    dataframe = pd.DataFrame(data,
                             columns=['document_id', 'date', 'description', 'content', 'company_code', 'company_name',
                                      'sentiment', 'probability'])
    return HttpResponse(dataframe.to_json(orient="records"))
