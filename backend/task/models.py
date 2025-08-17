from django.db import models
from django.contrib.auth import get_user_model
from .choices import Status

User = get_user_model()


class Task(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.CharField(
        max_length=12,
        choices=Status.choices,
        default=Status.TO_DO,
    )
    created_by = models.ForeignKey(
        User,
        related_name="tasks_created",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_by = models.ForeignKey(
        User,
        related_name="tasks_updated",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "tasks"
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["title"]),
        ]
        constraints = [
            models.UniqueConstraint(
                fields=["title", "created_by"],  # title per user must be unique
                name="unique_task_per_user",
            )
        ]

    def __str__(self):
        return self.title
