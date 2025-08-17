import time
from django.core.cache import cache
from django.http import JsonResponse


class RateLimitMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.rate_limit = 100
        self.time_window = 60

    def __call__(self, request):
        ip = self.get_client_ip(request)
        key = f"rate-limit:{ip}"
        data = cache.get(key, {"count": 0, "start": time.time()})

        now = time.time()
        elapsed = now - data["start"]

        if elapsed > self.time_window:
            # reset window
            data = {"count": 1, "start": now}
        else:
            data["count"] += 1

        cache.set(key, data, timeout=self.time_window)

        if data["count"] > self.rate_limit:
            return JsonResponse({"error": "Too many requests"}, status=429)

        return self.get_response(request)

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            return x_forwarded_for.split(",")[0]
        return request.META.get("REMOTE_ADDR")
