from django.urls import path
from .views import LoginView, LogoutView, RegisterView, AddToWatchlistView, WatchlistView, DeleteFromWatchlistView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('watchlist/add', AddToWatchlistView.as_view(), name='add-to-watchlist'),
    path('watchlist/', WatchlistView.as_view(), name='watchlist'),
    path('watchlist/<int:pk>', DeleteFromWatchlistView.as_view(), name='delete-from-watchlist'),

]
