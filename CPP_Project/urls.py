from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('main/', views.MainView.as_view(), name='main-view'),
    path('main/upload/', views.upload_document, name='upload-document'),
    path('signup/', views.SignView.as_view(), name='signup'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('', views.HomeView.as_view(), name='home'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)