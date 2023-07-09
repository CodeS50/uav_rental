from rest_framework import permissions

class PostIsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == "POST":
            return bool(request.user and request.user.is_staff)
        else:
            return True

class PutIsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == "PUT":
            return bool(request.user and request.user.is_staff)
        else:
            return True

class PatchIsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == "PATCH":
            return bool(request.user and request.user.is_staff)
        else:
            return True

class DeleteIsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == "DELETE":
            return bool(request.user and request.user.is_staff)
        else:
            return True