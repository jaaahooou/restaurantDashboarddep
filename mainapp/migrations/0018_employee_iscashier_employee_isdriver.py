# Generated by Django 4.1.5 on 2023-07-08 20:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0017_rename_color_dishcategory_colour'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='isCashier',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='employee',
            name='isDriver',
            field=models.BooleanField(default=False),
        ),
    ]