import uuid
from django.db.models import Sum
from django.db import models
from versatileimagefield.fields import VersatileImageField
from django.utils.translation import gettext_lazy as _
from django.utils import timezone


# Create your models here.


class Products(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)    
    ProductID = models.BigIntegerField(unique=True)    
    ProductCode = models.CharField(max_length=255, unique=True)
    ProductName = models.CharField(max_length=255)    
    ProductImage = VersatileImageField(upload_to="uploads/", blank=True, null=True)    
    CreatedDate = models.DateTimeField(auto_now_add=True)
    UpdatedDate = models.DateTimeField(blank=True, null=True)
    # CreatedUser = models.ForeignKey("auth.User", related_name="user%(class)s_objects", on_delete=models.CASCADE)    
    IsFavourite = models.BooleanField(default=False)
    Active = models.BooleanField(default=True)    
    HSNCode = models.CharField(max_length=255, blank=True, null=True)    
    TotalStock = models.DecimalField(default=0.00, max_digits=20, decimal_places=8, blank=True, null=True)
    
    class Meta:
        db_table = "products_product"
        verbose_name = _("product")
        verbose_name_plural = _("products")
        unique_together = (("ProductCode", "ProductID"),)
        ordering = ("-CreatedDate", "ProductID")
    
    def save(self, *args, **kwargs):
        self.UpdatedDate = timezone.now()  
        super().save(*args, **kwargs)

    def update_total_stock(self):
        total_stock = self.product_variants.aggregate(total=Sum('Stock'))['total'] or 0
        self.TotalStock = total_stock
        if total_stock == 0:
            self.Active = False
        else:
            self.Active = True
        self.save(update_fields=['TotalStock','Active'])


class ProductVariant(models.Model): 
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(Products, related_name="product_variants", on_delete=models.CASCADE)
    size = models.SmallIntegerField(null=False) 
    color = models.CharField(max_length=20) 
    Stock = models.PositiveIntegerField()

    class Meta:
        db_table = "products_productvariant"
        verbose_name = _("product variant")
        verbose_name_plural = _("product variants")

    def __str__(self):
        return f"{self.product.ProductName} - {self.size} - {self.color}"
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.product.update_total_stock()

    def delete(self, *args, **kwargs):
        product = self.product
        super().delete(*args, **kwargs)
        product.update_total_stock()
    
