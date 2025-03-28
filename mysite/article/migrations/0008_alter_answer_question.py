# Generated by Django 5.1.2 on 2024-10-31 02:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0007_answer_voter_question_voter_alter_question_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='author_answer', to='article.question'),
        ),
    ]
