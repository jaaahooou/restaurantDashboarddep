from django.urls import path 
from rest_framework_simplejwt.views import (
     TokenObtainPairView,
   
)
from mainapp.views import user_views as views



urlpatterns=[
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/', views.getUsers, name='users'),
    path('create/', views.createUser, name='create'),
    path('employees/', views.get_employees, name="employees"),
    path('positions/', views.getPositions, name="positions"),
    path('create-employee/', views.createEmployee, name="create-employee"),
    path('edit-employee/<str:pk>', views.editEmployee, name="edit-employee"),
    

    path('users/<str:pk>/', views.getUserById, name='user'),
    path('remove/<str:pk>/', views.deleteUser, name='delete-user'),
    path('employees/<str:pk>', views.getEmployeeById, name="employee")
    
]