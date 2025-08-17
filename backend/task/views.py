from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions, status, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from backend.pagination import TaskPagination

from .models import Task
from .serializers import TaskSerializer
from .utils import TaskFilter


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = TaskPagination

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_class = TaskFilter
    search_fields = ["title", "description"]
    ordering_fields = ["created_at", "updated_on", "title"]
    ordering = ["-created_at"]

    def get_queryset(self):  # type: ignore
        """Only show tasks created by the logged-in user."""
        return Task.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        title = serializer.validated_data.get("title")

        # Check for duplicate task for the same user
        if Task.objects.filter(
            created_by=self.request.user, title__iexact=title
        ).exists():
            raise ValidationError({"title": "Task with this title already exists."})

        serializer.save(created_by=self.request.user, updated_by=self.request.user)

    def perform_update(self, serializer):
        title = serializer.validated_data.get("title")

        # Check for duplicate task on update (exclude current instance)
        if (
            Task.objects.filter(created_by=self.request.user, title__iexact=title)
            .exclude(pk=serializer.instance.pk)
            .exists()
        ):
            raise ValidationError({"title": "Task with this title already exists."})

        serializer.save(updated_by=self.request.user)

    def destroy(self, request, *args, **kwargs):
        task = self.get_object()
        if task.created_by != request.user:
            return Response(
                {"detail": "You can only delete tasks you created."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().destroy(request, *args, **kwargs)
