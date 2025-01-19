import json
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from keras.saving import load_model

MODEL_PATH = "./stock_lstm.keras"
model = load_model(MODEL_PATH)

@csrf_exempt
def predict(request):
    if request.method == 'POST':
        try:
            # Parse JSON payload
            data = json.loads(request.body.decode('utf-8'))
            close_prices = data.get('close_prices')

            if not close_prices or len(close_prices) < 3:
                return JsonResponse({"error": "Insufficient data. Provide at least 3 recent closing prices."}, status=400)

            # Prepare input for the LSTM model
            input_data = np.array(close_prices[-3:]).reshape((1, 3, 1))

            # Make prediction
            predicted_price = model.predict(input_data)[0][0]

            # Return the prediction
            return JsonResponse({"predicted_price": float(predicted_price/269)}, status=200)
        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)
    return JsonResponse({"error": "Only POST requests are allowed."}, status=405)