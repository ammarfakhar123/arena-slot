from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Facility, Booking, Review
from .serializers import FacilitySerializer, BookingSerializer, ReviewSerializer

class FacilityViewSet(viewsets.ModelViewSet):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class SeedDatabaseView(APIView):
    def post(self, request):
        # Clear existing data
        Facility.objects.all().delete()
        Booking.objects.all().delete()
        Review.objects.all().delete()

        # Seed Facilities
        facilities_data = [
            {
                "id": 1,
                "name": "Rawalpindi Padel & Badminton Arena",
                "city": "Rawalpindi",
                "location": "Satellite Town, Block B",
                "address": "Plot 45, Main Commercial Market, Satellite Town, Rawalpindi",
                "sports": ["Padel", "Badminton"],
                "rating": 4.9,
                "total_reviews": 84,
                "starting_price": 3500.00,
                "image": "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=800",
                "gallery_images": [
                    "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800"
                ],
                "description": "Premier indoor glass padel courts and 4 professional BWF-approved wooden badminton courts with LED floodlights and AC player lounge.",
                "amenities": ["Floodlights", "Air Conditioned Lounge", "Parking", "Changing Rooms", "Pro Shop & Racket Rental"],
                "payment_policy": "partial_advance",
                "partial_advance_percentage": 30,
                "host_name": "Malik Hamza (Ground Manager)",
                "is_superhost": True,
                "cancellation_policy": "Free cancellation up to 4 hours before slot start time.",
                "status": "published",
                "distance_km": 1.8
            },
            {
                "id": 2,
                "name": "Islamabad Velocity Indoor Cricket Nets",
                "city": "Islamabad",
                "location": "F-8 Markaz",
                "address": "Sub Basement 2, Velocity Sports Hub, F-8 Markaz, Islamabad",
                "sports": ["Cricket"],
                "rating": 4.8,
                "total_reviews": 120,
                "starting_price": 2200.00,
                "image": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
                "gallery_images": [
                    "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800"
                ],
                "description": "High-speed automated bowling machines (up to 150 km/h), AstroTurf cricket lanes, and video replay analysis for batsman practice.",
                "amenities": ["Automated Bowling Machines", "Floodlights", "Video Speed Radar", "Locker Room"],
                "payment_policy": "full_advance",
                "partial_advance_percentage": 100,
                "host_name": "Captain Usman Tariq",
                "is_superhost": True,
                "cancellation_policy": "Strict cancellation policy — 24h advance notice required.",
                "status": "published",
                "distance_km": 3.2
            },
            {
                "id": 3,
                "name": "Lahore Champions Futsal Turf & Arena",
                "city": "Lahore",
                "location": "Gulberg III",
                "address": "92-B2, Main Kasuri Road, Gulberg III, Lahore",
                "sports": ["Futsal", "Football"],
                "rating": 4.7,
                "total_reviews": 96,
                "starting_price": 4000.00,
                "image": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
                "gallery_images": [
                    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=800"
                ],
                "description": "FIFA 2-Star synthetic grass futsal arena under night floodlights. Popular for 5-a-side and 7-a-side late night leagues.",
                "amenities": ["FIFA Synthetic Grass", "HD Floodlights", "Referees on Demand", "Shower Facilities", "Parking"],
                "payment_policy": "no_advance",
                "partial_advance_percentage": 0,
                "host_name": "Zain Ul Abideen",
                "is_superhost": False,
                "cancellation_policy": "Cancel anytime up to 2 hours before kickoff.",
                "status": "published",
                "distance_km": 5.5
            }
        ]

        for fac_data in facilities_data:
            Facility.objects.create(**fac_data)

        # Seed Bookings
        bookings_data = [
            {
                "booking_id": "AS-89421",
                "facility_id": "1",
                "facility_name": "Rawalpindi Padel & Badminton Arena",
                "location": "Satellite Town, Rawalpindi",
                "sport": "Padel",
                "date": "2026-08-17",
                "time": "08:00 PM - 09:00 PM",
                "total_amount": 4500.00,
                "advance_paid": 1350.00,
                "due_at_venue": 3150.00,
                "payment_method": "JazzCash",
                "payment_policy": "partial_advance",
                "payment_status": "Deposit Paid",
                "booking_type": "Online",
                "customer_name": "Hamza Chaudhry",
                "customer_phone": "0300-5551234",
                "split_count": 4,
                "per_person_amount": 1125.00
            },
            {
                "booking_id": "AS-74102",
                "facility_id": "2",
                "facility_name": "Islamabad Velocity Indoor Cricket Nets",
                "location": "F-8 Markaz, Islamabad",
                "sport": "Cricket",
                "date": "2026-08-17",
                "time": "09:00 PM - 10:00 PM",
                "total_amount": 3000.00,
                "advance_paid": 3000.00,
                "due_at_venue": 0.00,
                "payment_method": "Card",
                "payment_policy": "full_advance",
                "payment_status": "Fully Paid",
                "booking_type": "Online",
                "customer_name": "Ali Raza",
                "customer_phone": "0321-9876543",
                "split_count": 6,
                "per_person_amount": 500.00
            }
        ]

        for book_data in bookings_data:
            Booking.objects.create(**book_data)

        # Seed Reviews
        reviews_data = [
            {
                "facility_id": "1",
                "customer_name": "Shahzaib Ahmed",
                "rating": 5,
                "date": "Aug 14, 2026",
                "comment": "Best glass padel court in Rawalpindi! Superb LED lights and very cooperative host.",
                "sport": "Padel",
                "owner_reply": "Thank you Shahzaib! Glad you enjoyed the match lights. Looking forward to hosting your team again!",
                "reply_date": "Aug 14, 2026"
            },
            {
                "facility_id": "2",
                "customer_name": "Omer Farooq",
                "rating": 5,
                "date": "Aug 12, 2026",
                "comment": "The 145 km/h bowling machine speed in F-8 Markaz is insane practice for hard-ball batsmen.",
                "sport": "Cricket"
            }
        ]

        for rev_data in reviews_data:
            Review.objects.create(**rev_data)

        return Response({"status": "database seeded successfully"}, status=status.HTTP_201_CREATED)
