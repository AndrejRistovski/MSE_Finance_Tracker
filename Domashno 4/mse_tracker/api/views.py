import json
import os
import sqlite3
import time
import pandas as pd
import numpy as np
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from api.utils.fetcher import pipeline
from api.utils.mappers import convert_date, convert_number
from api.utils.technical_analysis_utils import *
from sklearn.preprocessing import LabelEncoder
from keras.saving import load_model

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

    for col in ['date', 'cena_posledna', 'mak', 'min', 'average', 'percentChange', 'kolichina', 'prometbest', 'vkupenPromet']:
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
        data = fetch_data("SELECT * FROM stock_prices WHERE issuer = ?", (option1,))
        if not data:
            return JsonResponse({"error": "No data found for the specified issuer."}, status=404)

        dataframe = preprocess_stock_data(data)
        df2 = pd.DataFrame({
            'time': dataframe['date'],
            'close': dataframe['cena_posledna'],
            'high': dataframe['mak'],
            'low': dataframe['min'],
        }).dropna(subset=['close', 'time'])

        df2 = df2.sort_values(by='time')
        df2 = filter_timeframe(df2, adder)

        if df2.empty:
            return JsonResponse({"error": "No data available for the specified timeframe."}, status=404)

        window = len(df2)
        technical_indicators = [
            (calculate_sma, ['sma']),
            (calculate_ema, ['ema']),
            (calculate_wma, ['wma']),
            (calculate_hma, ['hma']),
            (calculate_rsi, ['rsi']),
            (calculate_stochastic, ['stochastic_k', 'stochastic_d']),
            (calculate_macd, ['macd', 'macd_signal']),
            (calculate_cci, ['cci']),
            (calculate_williams_r, ['williams_r']),
            (calculate_ichimoku, ['ichimoku_conversion', 'ichimoku_base']),
        ]

        for func, cols in technical_indicators:
            result = func(df2, window)
            if isinstance(result, pd.DataFrame):
                df2[cols] = result
            elif isinstance(result, tuple):
                for col, res in zip(cols, result):
                    df2[col] = res
            else:
                df2[cols[0]] = result

        latest_data = df2.tail(1).to_json(orient="records")
        return HttpResponse(latest_data, content_type="application/json")

    except Exception as e:
        return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)

def fundamental_analysis(request, issuer):
    data = fetch_data("SELECT * FROM news WHERE company_code = ?", (issuer,))
    dataframe = pd.DataFrame(data, columns=['document_id', 'date', 'description', 'content', 'company_code', 'company_name',
                                            'sentiment', 'probability'])
    dataframe['date'] = pd.to_datetime(dataframe['date']).sort_values(ascending=False)
    return HttpResponse(dataframe.head(2).to_json(orient="records"))

def news_article(request, document_id):
    data = fetch_data("SELECT * FROM news WHERE document_id = ?", (document_id,))
    dataframe = pd.DataFrame(data, columns=['document_id', 'date', 'description', 'content', 'company_code', 'company_name',
                                            'sentiment', 'probability'])
    return HttpResponse(dataframe.to_json(orient="records"))

def news(request):
    data = fetch_data("SELECT * FROM news ORDER BY date DESC LIMIT 100")
    dataframe = pd.DataFrame(data, columns=['document_id', 'date', 'description', 'content', 'company_code', 'company_name',
                                            'sentiment', 'probability'])
    return HttpResponse(dataframe.to_json(orient="records"))

def lstm_prediction(request, issuer):
    data = fetch_data("SELECT * FROM stock_prices WHERE issuer = ?", (issuer,))
    dataframe = preprocess_stock_data(data)
    df2 = dataframe[['date', 'cena_posledna']].rename(columns={'date': 'time', 'cena_posledna': 'close'})
    df2['time'] = pd.to_datetime(df2['time'], unit="s")
    df2.set_index('time', inplace=True)

    close_prices = df2['close'].values
    if len(close_prices) < 3:
        return JsonResponse({"error": "Not enough data to make a prediction"}, status=400)

    input_data = np.array(close_prices[-3:]).reshape((1, 3, 1))
    model = load_model("./stock_lstm.keras")
    predicted_price = model.predict(input_data)[0][0]

    return JsonResponse({"predicted_price": predicted_price / 269})
