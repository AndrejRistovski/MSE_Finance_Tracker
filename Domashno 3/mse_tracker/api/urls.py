from django.urls import path
from api import views

urlpatterns = [
    path("", views.index, name="index"),
    path("update", views.update, name="update"),
    path('price/<str:option1>/<str:adder>', views.price, name="price"),
    path('technical_analysis/<str:option1>/<str:adder>', views.technical_analysis, name="technical_analysis"),
    path('symbols', views.symbols, name="get_issuers"),
]
