from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FacilityViewSet, BookingViewSet, ReviewViewSet, SeedDatabaseView

router = DefaultRouter()
router.register(r'facilities', FacilityViewSet, basename='facility')
router.register(r'bookings', BookingViewSet, basename='booking')
router.register(r'reviews', ReviewViewSet, basename='review')

urlpatterns = [
    path('', include(router.urls)),
    path('seed/', SeedDatabaseView.as_view(), name='seed-database'),
]
