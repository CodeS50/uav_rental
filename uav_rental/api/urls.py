from .views import ProductListCreate, ProductRetrieveUpdateDestroy
#from rest_framework.routers import DefaultRouter
from django.urls import path

app_name = "api"

# router = DefaultRouter()
# router.register('', PostList, basename='product')
# urlpatterns = router.urls

urlpatterns = [
    path('products/<str:pk>', ProductRetrieveUpdateDestroy.as_view(), name='detailproduct'),
    path('products', ProductListCreate.as_view(), name='productlist'),
]
