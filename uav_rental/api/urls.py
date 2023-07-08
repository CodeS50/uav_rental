from .views import ProductListCreate, ProductRetrieveUpdateDestroy, CategoryListCreate, CategoryRetrieveUpdateDestroy, RentalListCreate, RentalRetrieveUpdateDestroy
#from rest_framework.routers import DefaultRouter
from django.urls import path

app_name = "api"

# router = DefaultRouter()
# router.register('', PostList, basename='product')
# urlpatterns = router.urls

urlpatterns = [
    path('products/<int:pk>', ProductRetrieveUpdateDestroy.as_view(),
         name='detailproduct'),
    path('products', ProductListCreate.as_view(), name='productlist'),
    path('categories/<int:pk>',
         CategoryRetrieveUpdateDestroy.as_view(), name='detailproduct'),
    path('categories', CategoryListCreate.as_view(), name='productlist'),
    path('rentals/<int:pk>', RentalRetrieveUpdateDestroy.as_view(),
         name='detailproduct'),
    path('rentals', RentalListCreate.as_view(), name='productlist'),
]
