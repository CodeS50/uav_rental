from django.db import models

STATUS = (
    (0,"avtive"),
    (1,"passive")
)
# Create your models here.
class Products(models.Model):
    status = models.IntegerField(choices=STATUS, default=0)
    name = models.CharField(max_length=200)
    model = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    weight = models.FloatField()
    updated_at = models.DateTimeField(auto_now= True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name