from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from app.models import Product, PRODUCT_STATUS, Category, CATEGORY_STATUS, Rental, RENTAL_STATUS
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name')

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
    model = serializers.CharField(required=True, max_length=100, min_length=1)
    brand = serializers.CharField(required=True, max_length=100, min_length=1)
    stocks = serializers.IntegerField(required=True, min_value=0)
    category = CategorySerializer(required=False, many=False)
    category_id = serializers.PrimaryKeyRelatedField(source='category', queryset=Category.objects.all(), allow_null=True)

    class Meta:
        model = Product
        fields = ('__all__')

class RentalSerializer(serializers.ModelSerializer):
    status = serializers.ChoiceField(required=True, choices=RENTAL_STATUS)
    product = ProductSerializer(required=False, many=False)
    product_id = serializers.PrimaryKeyRelatedField(source='product', queryset=Product.objects.all(), allow_null=False)
    user = UserSerializer(required=False, many=False)
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=User.objects.all(), allow_null=False)
    started_at = serializers.DateTimeField(required=True)
    expired_at = serializers.DateTimeField(required=True)

    class Meta:
        model = Rental
        fields = ('__all__')

class UserRentalSerializer(serializers.ModelSerializer):
    product = ProductSerializer(required=False, many=False)
    product_id = serializers.PrimaryKeyRelatedField(source='product', queryset=Product.objects.all(), allow_null=False)
    started_at = serializers.DateTimeField(required=True)
    expired_at = serializers.DateTimeField(required=True)

    class Meta:
        model = Rental
        fields = ('__all__')

class RegisterUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=6, write_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance