from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def updateUser(sender, instance, **kwargs):
    print("Signal triggered")
    user = instance
    if user.email != '':
        user.username = user.email
        print(user.username)
 


pre_save.connect(updateUser,sender=User)
