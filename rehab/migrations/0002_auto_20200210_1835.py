# Generated by Django 3.0.3 on 2020-02-10 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rehab', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='animal',
            name='exit_at',
            field=models.DateTimeField(null=True),
        ),
    ]
