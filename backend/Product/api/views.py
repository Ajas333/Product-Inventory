import json
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,generics
from rest_framework.permissions import AllowAny 
from .serializer import *
from Product.models import ProductVariant, Products


class AddProductView(generics.CreateAPIView):
   queryset = Products.objects.all()
   serializer_class = ProductsSerializer
   permission_classes = [AllowAny]

   def create(self, request, *args, **kwargs):
        print("Received data:", request.data)

        product_variants_file = request.FILES.get('product_variants')
        if product_variants_file:
            product_variants_data = json.load(product_variants_file)
       
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.save()
        
     
        for variant_data in product_variants_data:
            ProductVariant.objects.create(product=product, **variant_data)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ListProductView(generics.ListAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

class ProductView(APIView):
    permission_classes=[AllowAny]
    def get(self,request,ProductID):
         product = Products.objects.get(ProductID=ProductID)
         if product:
            serializer = ProductViewSerializer(product)
            return Response(serializer.data,status=status.HTTP_200_OK)
         return Response(status=status.HTTP_400_BAD_REQUEST)

class DeleteVariantView(generics.RetrieveUpdateDestroyAPIView):
        queryset = ProductVariant.objects.all()
        serializer_class = ProductVariantSerializer
        permission_classes = [AllowAny]

class AddVariantView(generics.CreateAPIView):
    queryset = ProductVariant.objects.all()
    serializer_class=ProductVariantSerializer
    permission_classes=[AllowAny]

class UpdateVariantAPIView(generics.UpdateAPIView):
    queryset = ProductVariant.objects.all()
    serializer_class = EditStockSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        try:
            return ProductVariant.objects.get(id=self.kwargs['variantid'])
        except ProductVariant.DoesNotExist:
            raise Http404

    def perform_update(self, serializer):
        serializer.save()
    
    


        