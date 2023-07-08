from django.db import models

PRODUCT_STATUS = (
    (0, "Active"),
    (1, "Passive")
)
# Create your models here.


class Category(models.Model):
    status = models.IntegerField(choices=PRODUCT_STATUS, default=0)
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
        Category, on_delete=models.PROTECT, default=1)  # many-to-one

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name
