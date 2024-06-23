from django.urls import path,include
from .views import NoteViewSet
from rest_framework import routers

router = routers.DefaultRouter(trailing_slash = False)
router.register('notes',NoteViewSet, basename='notes')
urlpatterns = [
    path('',include(router.urls) ),
]
