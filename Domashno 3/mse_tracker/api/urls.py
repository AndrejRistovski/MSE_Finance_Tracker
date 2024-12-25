from django.urls import path
from api import views

urlpatterns = [
    path("", views.index, name="index"),
    path("update", views.update, name="update"),
    path('price/<str:option1>/<str:adder>', views.price, name="price"),
    path('symbols', views.symbols, name="get_issuers")
]
