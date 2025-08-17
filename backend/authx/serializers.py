from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken
import re


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)
    username = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "confirm_password"]

    def validate(self, data):
        """
        Validate that password and confirm_password match and enforce password strength.
        """
        password = data.get("password")
        confirm_password = data.get("confirm_password")

        # Check if passwords match
        if password != confirm_password:
            raise serializers.ValidationError(
                {"confirm_password": "Passwords do not match."}
            )

        # Basic password strength validation
        if not re.match(
            r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",
            password,
        ):
            raise serializers.ValidationError(
                {
                    "password": "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
                }
            )

        # Check if email is already in use
        if User.objects.filter(email=data.get("email")).exists():
            raise serializers.ValidationError(
                {"email": "This email is already registered."}
            )

        # Check if username (if provided) is already in use
        username = data.get("username") or data["email"].split("@")[0]
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError(
                {"username": "This username is already taken."}
            )

        return data

    def create(self, validated_data):
        """
        Create a new user with the validated data.
        """
        # Remove confirm_password from validated_data as it's not needed for user creation
        validated_data.pop("confirm_password")

        # If username is not provided, set it as the email's local part
        username = (
            validated_data.get("username") or validated_data["email"].split("@")[0]
        )

        # Create user
        user = User(username=username, email=validated_data["email"])
        user.set_password(validated_data["password"])
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["email", "password"]
        extra_kwargs = {
            "email": {"read_only": True}  # avoid creation validation
        }

    def validate(self, attrs):
        email = self.initial_data.get("email")  # type: ignore
        password = self.initial_data.get("password")  # type: ignore

        user = authenticate(email=email, password=password)
        if not user or not user.is_active:
            raise serializers.ValidationError("Invalid credentials")

        attrs["user"] = user
        return attrs

    def update_last_login(self, user):
        user.last_login = timezone.now()
        user.save(update_fields=["last_login"])

    def create_tokens(self, user):
        self.update_last_login(user)
        refresh = RefreshToken.for_user(user)
        return {"refresh": str(refresh), "access": str(refresh.access_token)}
