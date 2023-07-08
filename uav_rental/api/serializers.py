from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from app.models import Product, PRODUCT_STATUS, Category, CATEGORY_STATUS

class CategorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=200, min_length=3)
    status = serializers.ChoiceField(required=True, choices=CATEGORY_STATUS)
    class Meta:
        model = Category
        fields = ('__all__')

class ProductSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=200, min_length=3)
    weight = serializers.FloatField(required=True)
    status = serializers.ChoiceField(required=True, choices=PRODUCT_STATUS)
    name = serializers.CharField(required=True, max_length=100, min_length=1)
    brand = serializers.CharField(required=True, max_length=100, min_length=1)
    stocks = serializers.IntegerField(required=True, min_value=0)
    category = CategorySerializer(required=False, many=False)
    category_id = serializers.PrimaryKeyRelatedField(source='category', queryset=Category.objects.all())

    class Meta:
        model = Product
        fields = ('__all__')
