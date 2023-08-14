from django.db import models
from django.contrib.auth.models import User


class Position(models.Model):
    title = models.CharField(max_length= 30, null=True, blank=True)
    def __str__(self):
        return str(self.title)

class Employee(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,null=True, blank=True)
    name = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(max_length=200, blank=True, null=True)
    phone = models.IntegerField(null=True, blank=True)
    position = models.CharField(max_length=20, default="BARTENDER")
    isCashier = models.BooleanField(default=False)
    isDriver = models.BooleanField(default=False)


    def __str__(self):
        return str(self.position)



class Room(models.Model):
    name = models.CharField(max_length = 20, null=True, blank=True)
    

    def __str__(self):
        return str(self.name)


class Table(models.Model):
    
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    tableNumber = models.IntegerField(null=True, blank=False)
    numberOfPersons = models.IntegerField(null=False, blank=False, default =2)
    isOccupied = models.BooleanField(null=False, blank=False, default=False)
    

    def __str__(self):
        return str(self.room)

class DishCategory(models.Model):
    title = models.CharField(max_length=200, blank=False, null=False)
    colour = models.CharField(max_length=200, blank=False, null=False, default = "white")
    def __str__(self):
        return str(self.title)

class Dish(models.Model):
    category = models.ForeignKey(DishCategory, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    price = models.FloatField(default=0.00, blank=True)
    countInStock = models.IntegerField(null=False, blank=False, default=100)
    

    def __str__(self):
        return str(self.title)


class Order(models.Model):
    BLIK = "BLIK"
    CARD = "CARD"
    CASH = "CASH"
    PAYMENT_CHOICES = [
        (BLIK, "Blik"),
        (CARD, "Card"),
        (CASH, "Cash")
    ]
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    table = models.OneToOneField(Table,on_delete=models.CASCADE, null=True, blank = True)
    paymentMethod = models.CharField(max_length=10, choices=PAYMENT_CHOICES, default=CASH)
    shipping = models.BooleanField(default= False)
    isPaid = models.BooleanField(default= False)
    createdAt = models.DateTimeField(auto_now_add=True)
    isDone = models.BooleanField(null=False, blank=False, default=False)
    isBrought = models.BooleanField(null=False, blank=False, default=False)
    isActive = models.BooleanField(null=False, blank=False, default = True)
    tip = models.FloatField(default=0.00, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places =2, null=True, blank=True,default=0)
    roomName = models.CharField(max_length=200,default="")

    def __str__(self):
        return str(self.id)


class OrderDish(models.Model):
    dish = models.ForeignKey(Dish, on_delete=models.SET_NULL, null=True, blank = True, related_name='logs')
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank = True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    isActive = models.BooleanField(null=False, blank=False, default = False)
    isDone = models.BooleanField(null=False, blank=False, default=False)
    
    

    def __str__(self):
        return str(self.dish)
    
   


    


    
