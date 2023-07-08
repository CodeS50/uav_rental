from .views import ProductListCreate, ProductRetrieveUpdateDestroy, CategoryListCreate, CategoryRetrieveUpdateDestroy, RentalListCreate, RentalRetrieveUpdateDestroy, UserRentalListCreate, UserRentalRetrieve
#from rest_framework.routers import DefaultRouter
from django.urls import path

app_name = "api"

# router = DefaultRouter()
# router.register('', PostList, basename='product')
# urlpatterns = router.urls

urlpatterns = [
    path('products/<int:pk>', ProductRetrieveUpdateDestroy.as_view(),
         name='productdetail'),
    path('products', ProductListCreate.as_view(), name='productlistcreate'),
    path('categories/<int:pk>',
         CategoryRetrieveUpdateDestroy.as_view(), name='categorydetail'),
    path('categories', CategoryListCreate.as_view(), name='categorylistcreate'),
    path('rentals/<int:pk>', RentalRetrieveUpdateDestroy.as_view(),
         name='rentaldetail'),
    path('rentals', RentalListCreate.as_view(), name='rentallist'),

    path('user/rentals', UserRentalListCreate.as_view(), name='userrentallistcreate'),
    path('user/rentals/<int:pk>', UserRentalRetrieve.as_view(),
         name='userrentaldetail'),
]

# products = read all, update&create&delete=admin
# categories = read all, update&create&delete=admin
# rentals = read&update&create&delete=admin

# user/rentals = read&create(status=0) on user
