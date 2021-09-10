from Inventory.models import *
from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

class ProductHistoryAdmin(SimpleHistoryAdmin):
    list_display = ['id', 'productCode']
    history_list_display = ['status']
    search_fields = ['productCode']

# Register your models here.
admin.site.register(Product, ProductHistoryAdmin)
admin.site.register(Colours)
admin.site.register(Supplier)
admin.site.register(Order)