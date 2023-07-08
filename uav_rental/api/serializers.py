from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from app.models import Product


class ProductSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=200)

    class Meta:
        model = Product
        fields = ('__all__')
