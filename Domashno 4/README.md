# Домашна 4

## Шаблони

### Factory Pattern

Се користи Factory Pattern за повикување на техничката, фундаменталната анализа и LSTM предвидувањето.
Со употребата на Factory Pattern-от може лесно да се креира нова анализа без да се изменува многу во кодот.

```python
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
```

При повикување на статичкиот метод ```get_handler(handler_type)``` се враќа инстанца од еден од креираните хендлери.
Креирањето на api endpoint за нов вид на анализа е олеснато.

### MVC
Исто така се употребува и MVC шаблонот во делот за најава и watchlist.

## Микросервис

Одлучивме да го поставиме LSTM предвидувањето како микросервис.