import json
from rest_framework import serializers
from Product.models import Products, ProductVariant

class ProductSerializer(serializers.ModelSerializer):
     class Meta:
        model = Products
        fields = ['id', 'ProductID', 'ProductCode', 'ProductName','HSNCode','ProductImage','TotalStock','Active']


class ProductsSerializer(serializers.ModelSerializer):
    # product_variants = ProductVariantSerializer(many=True)

    class Meta:
        model = Products
        fields = ['id', 'ProductID', 'ProductCode', 'ProductName','HSNCode','ProductImage','Active']

class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = '__all__'

class ProductViewSerializer(serializers.ModelSerializer):
    variants = serializers.SerializerMethodField()
    class Meta:
        model = Products
        fields = ['id','ProductID','ProductCode','ProductName','ProductImage','CreatedDate','UpdatedDate','IsFavourite','Active','HSNCode','TotalStock',
                  'variants']
    def get_variants(self,obj):
        variants = ProductVariant.objects.filter(product=obj)
        return ProductVariantSerializer(variants, many=True).data

class EditStockSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ProductVariant
        fields = ['Stock'] 
    