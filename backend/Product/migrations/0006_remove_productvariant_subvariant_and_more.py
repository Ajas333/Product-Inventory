# Generated by Django 5.0.7 on 2024-07-13 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Product', '0005_remove_productvariant_variantid_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productvariant',
            name='subvariant',
        ),
        migrations.AddField(
            model_name='productvariant',
            name='color',
            field=models.CharField(default=0, max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='productvariant',
            name='size',
            field=models.SmallIntegerField(default=5),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='SubVariant',
        ),
    ]
