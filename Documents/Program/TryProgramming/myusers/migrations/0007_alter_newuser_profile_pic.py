# Generated by Django 4.1.5 on 2023-02-10 05:37

from django.db import migrations, models
import myusers.models


class Migration(migrations.Migration):

    dependencies = [
        ('myusers', '0006_alter_newuser_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newuser',
            name='profile_pic',
            field=models.ImageField(blank=True, default='posts/avatar.jpg', null=True, upload_to=myusers.models.upload_to, verbose_name='Image'),
        ),
    ]
