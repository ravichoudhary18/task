from django.db import models


class Status(models.TextChoices):
    TO_DO = "TO_DO", "To Do"
    IN_PROGRESS = "IN_PROGRESS", "In Progress"
    DONE = "DONE", "Done"
