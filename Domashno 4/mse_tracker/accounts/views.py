from django.contrib.auth import authenticate, login, logout
from .serializers import LoginSerializer, RegisterSerializer, AddToWatchlistSerializer, WatchlistSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login
from rest_framework.generics import ListAPIView, DestroyAPIView
from .models import Watchlist


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "You are authenticated!"})


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            login(request, user)
            return Response({"message": "User registered and logged in successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddToWatchlistView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = AddToWatchlistSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Stock added to watchlist successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WatchlistView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = WatchlistSerializer

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            print("Request user is not authenticated!")
            return []
        print(f"Authenticated user: {self.request.user}")
        return Watchlist.objects.filter(user=self.request.user)


class DeleteFromWatchlistView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        stock_id = kwargs.get('pk')  # Get the stock ID from the URL
        try:
            watchlist_item = Watchlist.objects.get(id=stock_id, user=request.user)
            watchlist_item.delete()
            return Response({"message": "Stock removed from watchlist successfully."},
                            status=status.HTTP_204_NO_CONTENT)
        except Watchlist.DoesNotExist:
            return Response({"error": "Stock not found in your watchlist."}, status=status.HTTP_404_NOT_FOUND)

