import django_filters
from .models import Task


class TaskFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(lookup_expr="icontains", required=False)
    description = django_filters.CharFilter(lookup_expr="icontains", required=False)
    status = django_filters.CharFilter(required=False)  # Example extra field
    created_at = django_filters.DateFromToRangeFilter(required=False)

    class Meta:
        model = Task
        fields = ["title", "description", "status", "created_at"]
