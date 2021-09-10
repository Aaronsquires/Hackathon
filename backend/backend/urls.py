"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


from django import urls
from django.contrib import admin
from django.urls import path, re_path
from Inventory import views
from django.conf.urls import include, url

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),

    # Authentication
    path('api/user/', include('users.urls', namespace='users')),
    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Dashboard
    re_path(r'^api/Inventory/$', views.Inventory_list),
    re_path(r'^api/Inventory/<[0-9]>$', views.Inventory_detail),

    # Inventory
    url(r'^api/products/$', views.product_list),
    url(r'^api/products/lowstock/$', views.product_list_lowstock),
    url(r'^api/products/nostock/$', views.product_list_nostock),

    url(r'^api/products/(?P<pk>[0-9]+)$', views.product_detail),
    url(r'^api/products/create$', views.product_list),

    # Colours
    url(r'^api/colours/$', views.colour_list),
    url(r'^api/colours/create$', views.colour_list),
    url(r'^api/suppliers/$', views.supplier_list),  
    url(r'^api/suppliers/create$', views.supplier_list), 
    

    url(r'^api/products/history/$', views.Product_history),
    url(r'^api/products/history/(?P<pk>[0-9]+)$', views.Product_history),






]
