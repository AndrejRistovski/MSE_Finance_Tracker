from django.http import JsonResponse, HttpResponse
import pandas as pd
import numpy as np
from api.utils.mappers import convert_date, convert_number
from api.utils.technical_analysis_utils import *
from keras.saving import load_model
from api.views import fetch_data, preprocess_stock_data, filter_timeframe


class StockHandler:
    """Base class for all stock handlers."""
    def process(self, *args, **kwargs):
        raise NotImplementedError("Subclasses must implement the `process` method.")


class TechnicalAnalysisHandler(StockHandler):
    def process(self, issuer, adder):
        data = fetch_data("SELECT * FROM stock_prices WHERE issuer = ?", (issuer,))
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


class FundamentalAnalysisHandler(StockHandler):
    def process(self, issuer):
        data = fetch_data("SELECT * FROM news WHERE company_code = ?", (issuer,))
        dataframe = pd.DataFrame(data, columns=['document_id', 'date', 'description', 'content', 'company_code', 'company_name',
                                                'sentiment', 'probability'])
        dataframe['date'] = pd.to_datetime(dataframe['date']).sort_values(ascending=False)
        return HttpResponse(dataframe.head(2).to_json(orient="records"))


class LSTMPredictionHandler(StockHandler):
    def process(self, issuer):
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


class StockHandlerFactory:
    @staticmethod
    def get_handler(handler_type):
        handlers = {
            "technical_analysis": TechnicalAnalysisHandler,
            "fundamental_analysis": FundamentalAnalysisHandler,
            "lstm_prediction": LSTMPredictionHandler,
        }
        handler_class = handlers.get(handler_type)
        if handler_class is None:
            raise ValueError(f"No handler found for type: {handler_type}")
        return handler_class()
