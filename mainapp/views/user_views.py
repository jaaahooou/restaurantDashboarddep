from rest_framework import permissions
from mainapp.models import Room, Table, DishCategory, Dish, Order, OrderDish,Employee, Position
from mainapp.serializers import User,UserSerializer,PositionSerializer, UserSerializerWithToken,EmployeeSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        
        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v
        
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
 
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAdminUser])
def createEmployee(request):
    data = request.data 
    data['isCashier'] = bool(data['isCashier'] == "Yes")
    data['isDriver'] = bool(data['isDriver'] == "Yes")  
    newEmployee = Employee.objects.create(
       
            name = data['fullName'],
            email = data['email'],
            phone=data['phoneNumber'],
            position = data['position'],
            isCashier = data['isCashier'],
            isDriver = data['isDriver'],
        )
    return Response("New Employee added")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_employees(request):

    employees = Employee.objects.all()
    serializer = EmployeeSerializer(employees, many=True)
 
    return Response(serializer.data)


@api_view(['GET'])
def getEmployeeById(request,pk):
    employee = Employee.objects.get(id=pk)
    serializer = EmployeeSerializer(employee, many=False)

    return Response(serializer.data)



@api_view(['PUT'])
@permission_classes([IsAdminUser])
def editEmployee(request,pk):
    
    data = request.data 

    employee = Employee.objects.get(id=pk)
   
    for key, value in data.items():
            
        if len(value) > 0:
              
            setattr(employee, key, value)

    employee.save()
  
    return Response ("ok")




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPositions(request):
    
    titles = Position.objects.all()
    serializer = PositionSerializer(titles, many=True)
    return Response(serializer.data)





@api_view(['POST'])
@permission_classes([IsAdminUser])
def createUser(request):


    try:
        data = request.data 
   
        user = User.objects.create(
            first_name = data['body']['name'],
            username = data['body']['email'],
            email=data['body']['email'],
            password = make_password(data['body']['password']),
        )


        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except:
        message= {"Error": "User with this email already exist"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getUserById(request,pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)




@api_view(['DELETE'])
def deleteUser(request,pk):
    userToDelete = User.objects.get(id=pk)
    if userToDelete.is_superuser:
        return Response("Cannot remove Admin user")
    userToDelete.delete()
    return Response('User removed from system')
