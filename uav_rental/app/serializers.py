from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Product


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(CustomTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['admin'] = bool(user.is_staff)
        return token
