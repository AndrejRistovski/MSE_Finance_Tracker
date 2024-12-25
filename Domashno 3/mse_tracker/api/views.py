import json
import os
import sqlite3
import time
import pandas as pd
import numpy as np
import itertools
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.decorators import api_view

from api.utils.fetcher import pipeline
from api.utils.mappers import convert_date, convert_number

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
