# Generated by Django 4.1.5 on 2023-02-09 09:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myusers', '0002_newuser_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newuser',
            name='profile_pic',
            field=models.ImageField(default='posts/avatar.jpg', upload_to='', verbose_name='Image'),
        ),
    ]
