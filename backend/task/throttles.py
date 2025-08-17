# tasks/throttles.py
from rest_framework.throttling import UserRateThrottle


class TaskRateThrottle(UserRateThrottle):
    rate = "10/min"  # allow 10 requests per minute per user
