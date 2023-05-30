from rest_framework import permissions
from mainapp.models import Room, Table, DishCategory, Dish, Order, OrderDish
from mainapp.serializers import User,UserSerializer, RoomSerializer, TableSerializer, OrderSerializer,OrderDishSerializer 
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, IsAdminUser



#create order 
@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def createOrder(request,pk):
    data = request.data
    user = request.user
    print("USER: ",data['body']["user"])

    user = User.objects.get(id=data['body']["user"])
    print(user)

    # get table for order, each order is assigned to table
    table = Table.objects.get(id=pk)
    if table.isOccupied == False:
                  
        order = Order.objects.create(
            user = user,
            table = table
        )
        print(order)
    else:
        print("dupa")
        return Response('Table is occupied')

    #swicth table.isOccupied to True, no one else can make an order assigned this table
    table.isOccupied = True
    table.save()
   
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)
    

#update order only for assigned user
@api_view(['GET'])
def getOrderById(request,pk):
    order = Order.objects.get(id=pk)
    serializer= OrderSerializer(order, many=False)
    return Response(serializer.data)



#update order only for assigned user
@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def updateOrder(request,pk):
    data= request.data
    order = Order.objects.get(id=pk)
    table = order.table
          
    table.isOccupied = False
    table.save()
    order.isPaid = data['body']['isPaid']
    order.table = None
    order.save()
    print( order.isPaid)
 
        
       

    return Response("Order updated")



# add dish to order

@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def addDishToOrder(request):
    data=request.data 
    user = request.user  
    print(data)

  
    
    order = Order.objects.get(id=data['order'])      
    dish = Dish.objects.get(id=data['dish'])
    qty = int(data['qty'])

    orderedDishes = OrderDish.objects.filter(order=order)
    print(orderedDishes)

    
    existOrderDish = orderedDishes.filter(dish=dish)
    print("ExisteOrderDis: ",len(existOrderDish))
    if len(existOrderDish)>0:
        print("Dish exist, try to increase qty")
        return Response("Dish exist, try to increase qty")
           
    dishToOrder = OrderDish.objects.create(
        dish=dish,
        order = order,
        qty=qty,

        )

    order.totalPrice = float(order.totalPrice) + float(data['price'])
    order.save()
      
    serializer = OrderDishSerializer(dishToOrder, many=False)
    return Response(serializer.data)





@api_view(['POST'])
@permission_classes([IsAuthenticated])
def changeDishQty(request,pk):
    
    data = request.data

    if request.method == "POST":
       
       #Get chenged dish qty
        dishToChange = OrderDish.objects.get(id=pk)
  
        orderedDishQtyBeforeChange = dishToChange.qty
       
        #new value of qty
        dishToChange.qty = data['qty']
       
       #get order contains dish to change
        order = Order.objects.get(id=dishToChange.order.id)

        #Change total proce of order afte qty was changed

        #Check if new aty value is different from zero
        if dishToChange.qty != 0:
              
            # if new qty value is greater than old 
            if orderedDishQtyBeforeChange < dishToChange.qty:
                #set difference in dish qty 
                qtyDifference =  data['qty']-orderedDishQtyBeforeChange 
                order.totalPrice = round((float(order.totalPrice) + float(dishToChange.dish.price *qtyDifference)),2)
        
             # if new qty value is less than old 
            if orderedDishQtyBeforeChange > dishToChange.qty:
                #set difference in dish qty 
                qtyDifference = orderedDishQtyBeforeChange - data['qty']
                order.totalPrice = round((float(order.totalPrice) - float(dishToChange.dish.price * qtyDifference)),2)
  
        #if new qty is equal to zero
        if dishToChange.qty == 0:
            order.totalPrice = round((float(order.totalPrice) - float(dishToChange.dish.price * orderedDishQtyBeforeChange)),2)
            dishToChange.delete()
            order.save()
                 
            return Response("Element deleted")
        
        dishToChange.save()
        order.save()
        return Response("Qty updated")
    return Response("Updated")




#remove dish from order

@api_view(['DELETE'])
#@permission_classes([IsAuthenticated])
def removeDishFromOrder(request,pk):
    dishToRemove = OrderDish.objects.get(id=pk)
    dishToRemove.delete()
    return Response("Dish removed from order")


# get All orders 

@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def getOrders(request):

    orders = Order.objects.all().filter(table__isnull = False)
    serializer= OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getOldOrders(request):
    oldORders = Order.objects.all().filter(table__isnull = True)
    serializer= OrderSerializer(oldORders, many=True)
    return Response(serializer.data)


#get all Rooms

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllRooms(request):
    rooms = Room.objects.all()
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllTables(request):
    user=request.user
    print("USER IN TABLES: ",user)
    tables = Table.objects.all()
    serializer = TableSerializer(tables, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createTable(request):
    user=request.user
    print(user)
    data = request.data 
    requestedRoom = Room.objects.filter(id=data['body']['tableData']['room']['id'])
    tableNumber = data['body']['tableData']['tableNumber']
    numberOfPersons = data['body']['tableData']['numberOfPersons']
    isOccupied = data['body']['tableData']['isOccupied']
    newTable = Table.objects.create(
        room=requestedRoom[0],
        tableNumber=tableNumber,
        numberOfPersons=numberOfPersons,
        isOccupied=isOccupied
    )

    return Response("Table created")




@api_view(['DELETE'])
def removeTable(request,pk):
    tableToRemove = Table.objects.get(id=pk)
    tableToRemove.delete()
    return Response("Table removed")