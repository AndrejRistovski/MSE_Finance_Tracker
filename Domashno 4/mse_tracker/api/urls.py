from django.urls import path
from api import views

urlpatterns = [
    path("", views.index, name="index"),
    path("update", views.update, name="update"),
    path('price/<str:option1>/<str:adder>', views.price, name="price"),
    path('lstm_prediction/<str:issuer>', views.lstm_prediction, name="lstm_prediction"),
    path('technical_analysis/<str:option1>/<str:adder>', views.technical_analysis, name="technical_analysis"),
    path('fundamental_analysis/<str:issuer>', views.fundamental_analysis, name="fundamental_analysis"),
    path('symbols', views.symbols, name="get_issuers"),
    path('news', views.news, name="news"),
    path('news_article/<str:document_id>', views.news_article, name="news_article"),
]
