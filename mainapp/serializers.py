from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Room, Table, DishCategory, Dish, Order, OrderDish,Employee, Position
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ["id","_id",'username','first_name','email','name',"isAdmin"]
    
    def get__id(self, obj):
        return obj.id
    
    def get_isAdmin(self,obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ["id","_id",'username','first_name','email','name',"isAdmin","token"]
    
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model= Employee
        fields='__all__'

class DishCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DishCategory
        fields = ['id','title','colour']


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish 
        fields = ['id','category','title', 'price','countInStock']


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
        'id', 
        'user',
        "table", 
        "paymentMethod",
        'shipping', 
        "isPaid", 
        "createdAt", 
        "isDone", 
        "isBrought",
        "tip",
        "totalPrice",
        "roomName"]

class OrderDishSerializer(serializers.ModelSerializer):
    class Meta:
        model= OrderDish
        fields= ['id','order', 'dish', 'qty']


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model= Position
        fields = ["title"]