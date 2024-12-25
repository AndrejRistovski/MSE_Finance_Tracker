import numpy as np
import pandas as pd


def calculate_sma(data, window):
    return data['close'].rolling(window=window).mean()

def calculate_ema(data, window):
    return data['close'].ewm(span=window, adjust=False).mean()

def calculate_wma(data, window):
    weights = np.arange(1, window + 1)
    return data['close'].rolling(window).apply(lambda prices: np.dot(prices, weights) / weights.sum(), raw=True)

def calculate_hma(data, window):
    half_length = int(window / 2)
    sqrt_length = int(np.sqrt(window))
    wma_half = calculate_wma(data, half_length)
    wma_full = calculate_wma(data, window)
    diff = 2 * wma_half - wma_full
    return calculate_wma(pd.DataFrame({'close': diff}), sqrt_length)

def calculate_rsi(data, window):
    delta = data['close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=window).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=window).mean()
    rs = gain / loss
    return 100 - (100 / (1 + rs))

def calculate_stochastic(data, window):
    low_min = data['close'].rolling(window=window).min()
    high_max = data['close'].rolling(window=window).max()
    k_percent = 100 * (data['close'] - low_min) / (high_max - low_min)
    d_percent = k_percent.rolling(window=3, min_periods=1).mean()
    return k_percent, d_percent

def calculate_macd(data, window):
    ema12 = data['close'].ewm(span=window, adjust=False).mean()
    ema26 = data['close'].ewm(span=window, adjust=False).mean()
    macd = ema12 - ema26
    signal = macd.ewm(span=window, adjust=False).mean()
    return macd, signal

def calculate_cci(data, window):
    typical_price = (data['close'] + data['high'] + data['low']) / 3
    mean_deviation = typical_price.rolling(window=window).apply(lambda x: np.mean(np.abs(x - x.mean())), raw=True)
    cci = (typical_price - calculate_sma(pd.DataFrame({'close': typical_price}), window)) / (0.015 * mean_deviation)
    return cci

def calculate_williams_r(data, window):
    high_max = data['high'].rolling(window=window).max()
    low_min = data['low'].rolling(window=window).min()
    return (high_max - data['close']) / (high_max - low_min) * -100

def calculate_ichimoku(data, window):
    conversion_line = ((data['high'].rolling(window=window).max() + data['low'].rolling(window=window).min()) / 2)
    base_line = ((data['high'].rolling(window=window).max() + data['low'].rolling(window=window).min()) / 2)
    return conversion_line, base_line

