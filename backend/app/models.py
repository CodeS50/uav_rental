from django.db import models
from django.contrib.auth.models import User

PRODUCT_STATUS = (
    (0, "Passive"),
    (1, "Active")
)

CATEGORY_STATUS = (
    (0, "Passive"),
    (1, "Active")
)

RENTAL_STATUS = (
    (0, "Pending"),
    (1, "Active"),
    (2, "Cancel")
)
# Create your models here.


class Category(models.Model):
    status = models.IntegerField(choices=CATEGORY_STATUS, default=0)
    name = models.CharField(max_length=200)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-name']

    def __str__(self):
        return self.name


class Product(models.Model):
    status = models.IntegerField(choices=PRODUCT_STATUS, default=0)
    name = models.CharField(max_length=200)
    model = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    weight = models.FloatField()
    stocks = models.PositiveIntegerField(default=0)  # all stock of the same model
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(
        Category, on_delete=models.DO_NOTHING, blank=True, null=True)  # many-to-one

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class Rental(models.Model):
    status = models.IntegerField(choices=RENTAL_STATUS, default=0)
    product = models.ForeignKey(
        Product, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    started_at = models.DateTimeField(auto_now=False)
    expired_at = models.DateTimeField(auto_now=False)

    class Meta:
        ordering = ['-created_at']