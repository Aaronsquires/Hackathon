from django.test import TestCase
import json

from django.test import TestCase
from django.contrib.auth import User

from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
# Create your tests here.


class TestCaseBase(TestCase):
    @property
    def bearer_token(self):
        # assuming there is a user in User model
        user = User.objects.get(id=1)
        client = APIClient()
        refresh = RefreshToken.for_user(user)
        return {"HTTP_AUTHORIZATION":f'Bearer {refresh.access_token}'}

class SomeTestClass(TestCaseBase):
    url = "TestBaseURL"

    def test_get_something(self):
        self.client.get(self.url, **bearer_token)

    def test_post_something(self):
        self.client.post(self.url, data={"key":"value"}, **self.bearer_token)