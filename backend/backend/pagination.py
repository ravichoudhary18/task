from rest_framework.pagination import PageNumberPagination


# Custom Pagination Class
class TaskPagination(PageNumberPagination):
    page_size = 12  # Default items per page
    page_size_query_param = "page_size"  # Allow client to control page size
    max_page_size = 100  # Maximum limit
