# Generated by Django 4.1.5 on 2023-03-18 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0010_alter_order_totalprice_alter_orderdish_dish_employee'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='name',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
