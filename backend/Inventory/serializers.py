from django.db.models import fields
from django.db.models.base import Model
from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import datetime


class HistoricalRecordField(serializers.ListField):
    child = serializers.DictField()

    def to_representation(self, data):
        return super().to_representation(data.values())


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ('supplier', 'supplierCode')

class ColourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colours
        fields = ('colour', 'colourcode')


class ProductSerializer(serializers.ModelSerializer):
        history = HistoricalRecordField(read_only=True)

        class Meta:
            model = Product
            # fields = ('uuid', 'productCode', 'description', 'colour', 'supplier')
            fields = ('__all__')





# Test
            
# class HistoricalProductSerializer(serializers.ModelSerializer):
#     history = HistoricalRecordField(read_only=True)

#     class Meta:
#         model = Product
#         fields = ('__all__')

class HistoricalProductSerializerTest(serializers.ModelSerializer):
    history = HistoricalRecordField(read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'uuid', 'history')


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Product.history.model
        fields = ('__all__')


class HistoricalProductSerializer(serializers.ModelSerializer):
        history = HistorySerializer(many=True)

        class Meta:
            model = Product
            # fields = ('uuid', 'productCode', 'description', 'colour', 'supplier')
            fields = ('history',)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['user'] = user.user_name
        token['isStaff'] = user.is_staff
        token['isActive'] = user.is_active
        token['date'] = str(datetime.date.today())

        return token