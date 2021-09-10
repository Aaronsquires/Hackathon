from django.test import TestCase
from Inventory.models import Colours, Order, Product, Supplier
import uuid



class TestAppModels(TestCase):
    def test_model_product(self):
        productCode = Product.objects.create(productCode="TestCode") 
        self.assertEqual(str(productCode), "TestCode")

    def test_model_colours(self):
        colourcode = Colours.objects.create(colourcode="TestCode") 
        self.assertEqual(str(colourcode), "TestCode")

    def test_model_supplier(self):
        supplier = Supplier.objects.create(supplier="TestCode") 
        self.assertEqual(str(supplier), "TestCode")

    def test_model_order(self):
        orderID = Order.objects.create(orderID="1111") 
        self.assertEqual(str(orderID), "1111")


