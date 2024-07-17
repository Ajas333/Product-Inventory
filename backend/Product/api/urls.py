from django.urls import path
from .import views

urlpatterns = [
    path('add_product/',views.AddProductView.as_view(),name='add-product'),
    path('list_product/',views.ListProductView.as_view(),name='list-product'),
    path('product_view/<int:ProductID>/',views.ProductView.as_view(),name='product-view'),
    path('delete_variant/<uuid:pk>/',views.DeleteVariantView.as_view(),name='delete-variant'),
    path('edit_variant/<uuid:variantid>/',views.UpdateVariantAPIView.as_view(),name='edit-variant'),
    path('add_variant/',views.AddVariantView.as_view(),name='delete-variant'),
    
    
]
