from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import SAFE_METHODS, AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions
from app.models import Product, Category, Rental
from .serializers import ProductSerializer, CategorySerializer, RentalSerializer, UserRentalSerializer
from django.db.models import Q
from .permissions import PostIsAdminUser, PutIsAdminUser, PatchIsAdminUser, DeleteIsAdminUser

# API Views

"""
class ProductList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter()


class ProductDetail(generics.RetrieveAPIView):
    serializer_class = ProductSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Product, id=item)
"""


class ProductListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly, PostIsAdminUser]
    serializer_class = ProductSerializer

    def has_permission(self, request, view):
        if request.method != "POST":
            return True

        return False

    def get_queryset(self):
        return Product.objects.filter()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ProductRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly, PutIsAdminUser, PatchIsAdminUser, DeleteIsAdminUser]
    serializer_class = ProductSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Product, id=item)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class CategoryListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly, PostIsAdminUser]
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class CategoryRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly, PutIsAdminUser, PatchIsAdminUser, DeleteIsAdminUser]
    serializer_class = CategorySerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Category, id=item)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class RentalListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = RentalSerializer

    def get_queryset(self):
        return Rental.objects.filter()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, partial=True)
        if serializer.is_valid():
            if serializer.validated_data["product"].status == 1:
                used_count_query = Rental.objects.filter(
                    Q(
                        started_at__lte=serializer.validated_data["started_at"],
                        expired_at__gte=serializer.validated_data["started_at"]
                    ) | Q(
                        started_at__lte=serializer.validated_data["expired_at"],
                        expired_at__gte=serializer.validated_data["expired_at"]
                    )
                ).filter(
                    product=serializer.validated_data["product"]
                ).filter(
                    status__in=(0, 1)
                )
                used_count = used_count_query.count()
                # print(used_count_query.query)
                # print(used_count)
                # print(serializer.validated_data["product"].stocks)
                if used_count < serializer.validated_data["product"].stocks:
                    #serializer.validated_data["status"] = 0
                    serializer.save()
                    return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
                else:
                    return Response({"status": "error", "message": "product stock is insufficient"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"status": "error", "message": "product is not available for purchase"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class RentalRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = RentalSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Rental, id=item)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        if serializer.is_valid():
            if serializer.validated_data["product"].status == 1:
                on_used_count_query = Rental.objects.filter(
                    Q(
                        started_at__lte=serializer.validated_data["started_at"],
                        expired_at__gte=serializer.validated_data["started_at"]
                    ) | Q(
                        started_at__lte=serializer.validated_data["expired_at"],
                        expired_at__gte=serializer.validated_data["expired_at"]
                    )
                ).filter(
                    product=serializer.validated_data["product"]
                ).filter(
                    status__in=(0, 1)
                ).filter(
                    id=self.kwargs.get('pk')
                )

                used_count_query = Rental.objects.filter(
                    Q(
                        started_at__lte=serializer.validated_data["started_at"],
                        expired_at__gte=serializer.validated_data["started_at"]
                    ) | Q(
                        started_at__lte=serializer.validated_data["expired_at"],
                        expired_at__gte=serializer.validated_data["expired_at"]
                    )
                ).filter(
                    product=serializer.validated_data["product"]
                ).filter(
                    status__in=(0, 1)
                )
                used_count = used_count_query.count() - on_used_count_query.count()
                # print(used_count_query.query)
                # print(used_count)
                # print(serializer.validated_data["product"].stocks)
                if used_count < serializer.validated_data["product"].stocks:
                    serializer.save()
                    return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
                else:
                    return Response({"status": "error", "message": "product stock is insufficient"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"status": "error", "message": "product is not available for purchase"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class UserRentalListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserRentalSerializer

    def get_queryset(self):
        return Rental.objects.filter(user=self.request.user)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, partial=True)
        if serializer.is_valid():
            if serializer.validated_data["product"].status == 1:
                used_count_query = Rental.objects.filter(
                    Q(
                        started_at__lte=serializer.validated_data["started_at"],
                        expired_at__gte=serializer.validated_data["started_at"]
                    ) | Q(
                        started_at__lte=serializer.validated_data["expired_at"],
                        expired_at__gte=serializer.validated_data["expired_at"]
                    )
                ).filter(
                    product=serializer.validated_data["product"]
                ).filter(
                    status__in=(0, 1)
                )
                used_count = used_count_query.count()
                # print(used_count_query.query)
                # print(used_count)
                # print(serializer.validated_data["product"].stocks)
                if used_count < serializer.validated_data["product"].stocks:
                    serializer.validated_data["status"] = 0
                    serializer.validated_data["user"] = self.request.user
                    serializer.save()
                    return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
                else:
                    return Response({"status": "error", "message": "product stock is insufficient"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"status": "error", "message": "product is not available for purchase"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class UserRentalRetrieve(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserRentalSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Rental, id=item, user=self.request.user)
