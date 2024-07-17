from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,generics
from rest_framework.permissions import AllowAny 
from django.contrib.auth import authenticate, login

class LoginView(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        username = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            # login(request, user)
            
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
      