# Generated by Django 5.0.4 on 2024-04-16 06:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userdetail',
            old_name='userField',
            new_name='user',
        ),
    ]
