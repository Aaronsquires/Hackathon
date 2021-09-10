from django.db import models
import uuid
from simple_history.models import HistoricalRecords
from django.contrib.postgres.fields import ArrayField


# Create your models here.
# Colours of Products Model
class Colours(models.Model):
    colour = models.CharField(max_length=20)
    colourcode = models.CharField(max_length=10, default='RAL')

    def __str__(self):
        return self.colourcode


# Supplier of Products Model
class Supplier(models.Model):
    supplier = models.CharField(max_length=20)
    supplierCode = models.UUIDField(editable=False, default=uuid.uuid4)

    def __str__(self):
        return self.supplier


# Main Product Model
class Product(models.Model):
    # max_length required for CharField
    uuid = models.UUIDField(editable=False, default=uuid.uuid4)
    productCode = models.CharField(max_length=120)
    description = models.TextField(blank=True, null=True)
    colourCode = models.CharField(max_length=20)
    supplier = models.CharField(max_length=30)
    # colourCode = models.ForeignKey(Colours, on_delete=models.SET_NULL, null=True, blank=True)
    # supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    stockStatus = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    minquantity = models.IntegerField(default='50')
    quantity = models.IntegerField(default='50')
    history = HistoricalRecords()

    def __str__(self):
        # return "{} - {}".format(self.productCode, self.colourCode )
        return self.productCode



class Order(models.Model):
    orderID = models.IntegerField(default='0')
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True, default='0')
    order_address = models.CharField(max_length=200, default='0')
    order_items = ArrayField(models.CharField(max_length=200), blank=True, default=list)
    order_end_Date = models.DateField(default="2021-10-01", auto_now=False, auto_now_add=False)

    def __str__(self):
        return str(self.orderID)