from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 

from .models import Product
from .serializers import *

from rest_framework import viewsets, filters, generics, permissions
from rest_framework.views import APIView

from django.db.models import F

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


@api_view(['GET'])
def Product_history(request):
    if request.method == 'GET':
        data = Product.objects.all()
        serializer = HistoricalProductSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

        


@api_view(['GET'])
def Product_history_Id(request, pk):
    data = Product.history.filter(pk)
    if request.method == 'GET': 
        serializer = HistoricalProductSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data) 




@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def Inventory_list(request):
    if request.method == 'GET':
        data = Product.objects.all()

        serializer = ProductSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def Inventory_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST', 'DELETE'])
# @permission_classes([IsAuthenticated])
def product_list(request):
    # GET list of tutorials, POST a new tutorial, DELETE all tutorials
    if request.method == 'GET':
        data = Product.objects.all()

        serializer = ProductSerializer(data, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

 
@api_view(['GET', 'POST', 'DELETE'])
# @permission_classes([IsAuthenticated])
def product_list_lowstock(request):
    # GET list of tutorials, POST a new tutorial, DELETE all tutorials
    if request.method == 'GET':
        data = Product.objects.filter(quantity__lte=F('minquantity'), quantity__gte='1')
        serializer = ProductSerializer(data, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST', 'DELETE'])
def product_list_nostock(request):
    # GET list of tutorials, POST a new tutorial, DELETE all tutorials
    if request.method == 'GET':
        data = Product.objects.filter(quantity="0")
        serializer = ProductSerializer(data, many=True)
        return Response(serializer.data)




@api_view(['GET', 'PUT', 'DELETE'])
def product_detail(request, pk):
    dataIndex = Product.objects.get(pk=pk)

    if request.method == 'GET': 
        product_serializer = ProductSerializer(dataIndex) 
        return JsonResponse(product_serializer.data) 

    elif request.method == 'PUT': 
        product_data = JSONParser().parse(request) 
        product_serializer = ProductSerializer(dataIndex, data=product_data, partial=True)
        if product_serializer.is_valid(): 
            product_serializer.save() 
            return JsonResponse(product_serializer.data) 
        return JsonResponse(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    
    elif request.method == 'DELETE':
        dataIndex.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def colour_list(request):
    # GET list of tutorials, POST a new tutorial, DELETE all tutorials
    if request.method == 'GET':
        data = Colours.objects.all()

        serializer = ColourSerializer(data, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ColourSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def supplier_list(request):
    # GET list of tutorials, POST a new tutorial, DELETE all tutorials
    if request.method == 'GET':
        data = Supplier.objects.all()

        serializer = SupplierSerializer(data, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SupplierSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer