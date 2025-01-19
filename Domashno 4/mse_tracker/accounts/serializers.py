from django.db import IntegrityError
from rest_framework import serializers
from .models import CustomUser, Watchlist, Stock


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'email']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class AddToWatchlistSerializer(serializers.ModelSerializer):
    ticker = serializers.CharField(write_only=True)

    class Meta:
        model = Watchlist
        fields = ['ticker']

    def validate(self, data):
        user = self.context['request'].user
        ticker = data['ticker']

        stock, created = Stock.objects.get_or_create(ticker=ticker)

        if Watchlist.objects.filter(user=user, stock=stock).exists():
            raise serializers.ValidationError(f"The stock '{ticker}' is already in your watchlist.")

        data['stock'] = stock
        return data

    def create(self, validated_data):
        user = self.context['request'].user
        stock = validated_data['stock']

        try:
            return Watchlist.objects.create(user=user, stock=stock)
        except IntegrityError:
            raise serializers.ValidationError(f"The stock '{stock.ticker}' is already in your watchlist.")


class WatchlistSerializer(serializers.ModelSerializer):
    stock_name = serializers.CharField(source='stock.name', read_only=True)
    stock_ticker = serializers.CharField(source='stock.ticker', read_only=True)

    class Meta:
        model = Watchlist
        fields = ['id', 'stock_name', 'stock_ticker']
