import json
import os
import sqlite3
import time
import pandas as pd
import numpy as np
import itertools
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view

from api.utils.fetcher import pipeline
from api.utils.mappers import convert_date, convert_number
from api.utils.technical_analysis_utils import *
from sklearn.preprocessing import LabelEncoder
from keras.saving import load_model



def index(request):
    return HttpResponse("Hello, world. You're at the API index.")


def update(request):
    start_time = time.time()
    pipeline()
    end_time = time.time()
    return HttpResponse(f"Data processing completed in {end_time - start_time} seconds")


def price(request, option1, adder):
    conn = sqlite3.connect("./databases/final_stock_data.db")
    curs = conn.cursor()

    curs.execute("SELECT * FROM stock_prices WHERE issuer = ?", (option1,))
    data = curs.fetchall()

    conn.close()
    dataframe = pd.DataFrame(data, columns=['issuer', 'date', 'cena_posledna', 'mak', 'min', 'average', 'percentChange',
                                            'kolichina', 'prometbest', 'vkupenPromet'])

    dataframe['date'] = dataframe['date'].apply(convert_date).astype(int)
    dataframe['cena_posledna'] = dataframe['cena_posledna'].apply(convert_number)
    dataframe['mak'] = dataframe['mak'].apply(convert_number)
    dataframe['min'] = dataframe['min'].apply(convert_number)
    dataframe['average'] = dataframe['average'].apply(convert_number)
    dataframe['percentChange'] = dataframe['percentChange'].apply(convert_number)
    dataframe['kolichina'] = dataframe['kolichina'].apply(convert_number)
    dataframe['prometbest'] = dataframe['prometbest'].apply(convert_number)
    dataframe['vkupenPromet'] = dataframe['vkupenPromet'].apply(convert_number)

    df2 = pd.DataFrame()
    df2['time'] = dataframe['date']
    df2['close'] = dataframe['cena_posledna']

    df2 = df2.dropna(subset=['close', 'time'])
    df2 = df2.sort_values(by=['time'])
    if adder == "y":
        df2 = df2.tail(min(len(df2), 365))
    elif adder == "m":
        df2 = df2.tail(min(len(df2), 30))
    elif adder == "w":
        df2 = df2.tail(min(len(df2), 7))
    df2 = df2.to_json(orient="records")

    return HttpResponse(df2)


def symbols(request):
    conn = sqlite3.connect("./databases/final_stock_data.db")
    curs = conn.cursor()

    curs.execute("SELECT * FROM tickers")
    data = curs.fetchall()
    conn.close()

    flattened_list = [item for sublist in data for item in sublist]

    return HttpResponse(json.dumps(flattened_list))


def technical_analysis(request, option1, adder):
    conn = sqlite3.connect("./databases/final_stock_data.db")
    curs = conn.cursor()

    curs.execute("SELECT * FROM stock_prices WHERE issuer = ?", (option1,))
    data = curs.fetchall()

    conn.close()
    dataframe = pd.DataFrame(data, columns=['issuer', 'date', 'cena_posledna', 'mak', 'min', 'average', 'percentChange',
                                            'kolichina', 'prometbest', 'vkupenPromet'])

    dataframe['date'] = dataframe['date'].apply(convert_date).astype(int)
    dataframe['cena_posledna'] = dataframe['cena_posledna'].apply(convert_number)
    dataframe['mak'] = dataframe['mak'].apply(convert_number)
    dataframe['min'] = dataframe['min'].apply(convert_number)
    dataframe['average'] = dataframe['average'].apply(convert_number)
    dataframe['percentChange'] = dataframe['percentChange'].apply(convert_number)
    dataframe['kolichina'] = dataframe['kolichina'].apply(convert_number)
    dataframe['prometbest'] = dataframe['prometbest'].apply(convert_number)
    dataframe['vkupenPromet'] = dataframe['vkupenPromet'].apply(convert_number)

    df2 = pd.DataFrame()
    df2['time'] = dataframe['date']
    df2['close'] = dataframe['cena_posledna']
    df2['high'] = dataframe['mak']
    df2['low'] = dataframe['min']

    df2 = df2.dropna(subset=['close', 'time'])
    df2 = df2.sort_values(by=['time'])
    if adder == "y":
        df2 = df2.tail(min(len(df2), 365))
    elif adder == "m":
        df2 = df2.tail(min(len(df2), 30))
    elif adder == "w":
        df2 = df2.tail(min(len(df2), 7))

    df2 = df2.sort_values(by=['time'], ascending=False)
    window = len(df2)

    df2['sma'] = calculate_sma(df2, window)
    df2['ema'] = calculate_ema(df2, window)
    df2['wma'] = calculate_wma(df2, window)
    df2['hma'] = calculate_hma(df2, window)
    df2['rsi'] = calculate_rsi(df2, window)
    df2['stochastic_k'], df2['stochastic_d'] = calculate_stochastic(df2, window)
    df2['macd'], df2['macd_signal'] = calculate_macd(df2, window)
    df2['cci'] = calculate_cci(df2, window)
    df2['williams_r'] = calculate_williams_r(df2, window)
    df2['ichimoku_conversion'], df2['ichimoku_base'] = calculate_ichimoku(df2, window)

    df2 = df2[-1:].to_json(orient="records")

    return HttpResponse(df2)


def fundamental_analysis(request, issuer):
    conn = sqlite3.connect("./databases/final_stock_data.db")
    curs = conn.cursor()

    curs.execute("SELECT * FROM news WHERE company_code = ?", (issuer,))
    data = curs.fetchall()
    data = pd.DataFrame(data, columns=['document_id', 'date', 'description', 'content', 'company_code', 'company_name',
                                       'sentiment', 'probability'])

    data['date'] = pd.to_datetime(data['date'])
    data.sort_values(by=['date'], ascending=False, inplace=True)

    data = data[:2]
    data = data.to_json(orient="records")
    return HttpResponse(data)


def news_article(request, document_id):
    conn = sqlite3.connect("./databases/final_stock_data.db")
    curs = conn.cursor()

    curs.execute("""SELECT * FROM news WHERE document_id = ?""", (document_id,))
    data = curs.fetchall()
    data = pd.DataFrame(data, columns=['document_id', 'date', 'description', 'content', 'company_code', 'company_name',
                                       'sentiment', 'probability'])

    data = data.to_json(orient="records")
    return HttpResponse(data)


def news(request):
    conn = sqlite3.connect("./databases/final_stock_data.db")
    curs = conn.cursor()

    curs.execute("""SELECT * FROM news ORDER BY date DESC LIMIT 100""")
    data = curs.fetchall()

    data = pd.DataFrame(data, columns=['document_id', 'date', 'description', 'content', 'company_code', 'company_name',
                                       'sentiment', 'probability'])

    data = data.to_json(orient="records")
    return HttpResponse(data)


def lstm_prediction(request, issuer):
    # Connect to SQLite database
    conn = sqlite3.connect("./databases/final_stock_data.db")
    curs = conn.cursor()

    # Fetch data for the given issuer
    curs.execute("""SELECT * FROM stock_prices WHERE issuer = ?""", (issuer,))
    data = curs.fetchall()
    conn.close()

    # Create a DataFrame
    dataframe = pd.DataFrame(data, columns=['issuer', 'date', 'cena_posledna', 'mak', 'min', 'average',
                                            'percentChange', 'kolichina', 'prometbest', 'vkupenPromet'])

    # Convert columns to appropriate formats
    dataframe['date'] = dataframe['date'].apply(convert_date).astype(int)
    dataframe['cena_posledna'] = dataframe['cena_posledna'].apply(convert_number)

    # Prepare a smaller DataFrame with only necessary columns
    df2 = pd.DataFrame()
    df2['time'] = dataframe['date']
    df2['close'] = dataframe['cena_posledna']
    df2['issuer'] = dataframe['issuer']

    # Sort values and set index
    df2 = df2.sort_values(by=['time'])
    df2['time'] = pd.to_datetime(df2['time'], unit="s")
    df2.set_index('time', inplace=True)
    df2.sort_index(inplace=True)

    # Get the last three closing prices for prediction
    close_prices = df2['close'].values
    if len(close_prices) < 3:
        return JsonResponse({"error": "Not enough data to make a prediction"}, status=400)

    last_three_days = close_prices[-3:]  # Get the last three prices
    input_data = np.array(last_three_days).reshape((1, 3, 1))  # Reshape for LSTM input (1 sample, 3 timesteps, 1 feature)

    # Load the trained LSTM model
    model = load_model("./stock_lstm.keras")

    # Predict the next day's price
    prediction = model.predict(input_data)
    predicted_price = int(prediction[0][0])  # Extract the single predicted value

    # Return the prediction as JSON
    return JsonResponse({"predicted_price": predicted_price/269})
