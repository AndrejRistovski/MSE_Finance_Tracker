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

        # Try to get or create the stock
        stock, created = Stock.objects.get_or_create(ticker=ticker)

        # Check if the stock is already in the user's watchlist
        if Watchlist.objects.filter(user=user, stock=stock).exists():
            raise serializers.ValidationError(f"The stock '{ticker}' is already in your watchlist.")

        data['stock'] = stock  # Use the stock instance itself here
        return data

    def create(self, validated_data):
        user = self.context['request'].user
        stock = validated_data['stock']

        try:
            # Create and return the watchlist entry
            return Watchlist.objects.create(user=user, stock=stock)
        except IntegrityError:
            raise serializers.ValidationError(f"The stock '{stock.ticker}' is already in your watchlist.")
