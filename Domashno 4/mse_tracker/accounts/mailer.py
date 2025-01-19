import time
import calendar
from Emailer import template_types
from Emailer.core import EmailSender
from datetime import date
from sqlite3 import connect
from django.conf import settings
from django.core.mail import send_mail
from django.db import models
from .models import CustomUser, Watchlist, Stock

HOST_USER = "financetracker.mk@gmail.com"
HOST_PW = "qvvz fttq vnxr qbze"
sender = EmailSender(HOST_USER, HOST_PW)

def sendStockInfo(user_email, stock_info):
    print(f"Sending stock info email to {user_email}...")

    context = {
        "name": stock_info["name"],
        "stocks": stock_info["stocks"]
    }

    sender.send(
        receiver=user_email,
        subject="Latest Stock Prices for Your Watchlist: " + str(date.today()),
        template="Your watchlist stock prices are updated below.",
        context=context,
        template_type=template_types.TEMPLATE_TYPE_HTML
    )

def bulkSend():
    todaysdate = str(date.today())

    active_users = CustomUser.objects.filter(is_active=True)
    connection2 = connect("final_stock_data.db")
    curs2 = connection2.cursor()

    for user in active_users:
        email = user.email
        username = user.username

        watchlist = Watchlist.objects.filter(user=user)

        stocks_info = []

        for watchlist_item in watchlist:
            stock = watchlist_item.stock
            stock_ticker = stock.ticker

            curs2.execute(f"SELECT price FROM stock_data WHERE ticker = '{stock_ticker}' ORDER BY date DESC LIMIT 1")
            stock_price = curs2.fetchone()

            if stock_price:
                stock_info = {
                    "ticker": stock_ticker,
                    "name": stock.name,
                    "price": stock_price[0]
                }
                stocks_info.append(stock_info)

        connection2.close()

        if stocks_info:
            sendStockInfo(email, {"name": username, "stocks": stocks_info})

    print(f"Emails sent for {len(active_users)} users.")
