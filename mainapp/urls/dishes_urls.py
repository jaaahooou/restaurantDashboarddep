from django.urls import path 
from mainapp.views import dishes_views as views


urlpatterns = [
    path('get-categories', views.getDishCategories, name='get-categories'),
    path('create-category', views.createDishCategory, name='create-category'),
    path('add-dish', views.addDishToMenu, name='add-dish'),
    path('get-dishes', views.getAllDishes, name='get-dishes'),
    path('get-order-dishes', views.getOrderDish, name='get-order-dishes'),
    path('get-active-ordered-dishes', views.getActiveOrderedDishes, name='get-active-ordered-dishes'),

    path('delete-dish/<str:pk>', views.deleteDishFromMenu,  name='delete-dish'),
    path('set-active-dish-as-inactive/<str:pk>', views.setAciveDishAsInactive, name="set-active-dis-as-inactive"),
    path('delete-category/<str:pk>', views.deleteDishCategory, name='delete-category'),
    path('get-order-dish/<str:pk>', views.getOrderedDishById, name='get-order-dish'),
    path('edit-dish/<str:pk>', views.editDish, name='edit-dish'),

]