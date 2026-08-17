from django.db import models

class Facility(models.Model):
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    address = models.TextField()
    sports = models.JSONField(default=list)  # e.g., ["Padel", "Badminton"]
    rating = models.FloatField(default=4.5)
    total_reviews = models.IntegerField(default=0)
    starting_price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField(max_length=500)
    gallery_images = models.JSONField(default=list)  # list of URLs
    description = models.TextField()
    amenities = models.JSONField(default=list)  # list of strings
    payment_policy = models.CharField(max_length=50, default='partial_advance')
    partial_advance_percentage = models.IntegerField(default=30)
    host_name = models.CharField(max_length=255)
    is_superhost = models.BooleanField(default=False)
    cancellation_policy = models.TextField()
    status = models.CharField(max_length=50, default='published')
    distance_km = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.name


class Booking(models.Model):
    booking_id = models.CharField(max_length=50, unique=True)
    facility_id = models.CharField(max_length=50)
    facility_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    sport = models.CharField(max_length=100)
    date = models.DateField()
    time = models.CharField(max_length=100)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    advance_paid = models.DecimalField(max_digits=10, decimal_places=2)
    due_at_venue = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=100)
    payment_policy = models.CharField(max_length=50)
    payment_status = models.CharField(max_length=100)
    booking_type = models.CharField(max_length=50)
    customer_name = models.CharField(max_length=255)
    customer_phone = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    split_count = models.IntegerField(default=1)
    per_person_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.booking_id} - {self.customer_name}"


class Review(models.Model):
    facility_id = models.CharField(max_length=50)
    customer_name = models.CharField(max_length=255)
    rating = models.IntegerField()
    date = models.CharField(max_length=100)
    comment = models.TextField()
    sport = models.CharField(max_length=100)
    owner_reply = models.TextField(null=True, blank=True)
    reply_date = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"{self.customer_name} ({self.rating}/5)"
