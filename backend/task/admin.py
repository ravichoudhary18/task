from django.contrib import admin
from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "status",
        "created_by",
        "updated_by",
        "created_at",
        "updated_at",
    )
    list_filter = ("status", "created_by", "updated_by", "created_at", "updated_at")
    search_fields = (
        "title",
        "description",
        "created_by__username",
        "updated_by__username",
    )
    ordering = ("-created_at",)
    readonly_fields = ("created_at", "updated_at")
    autocomplete_fields = ("created_by", "updated_by")
