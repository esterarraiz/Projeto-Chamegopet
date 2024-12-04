from django.contrib import admin
from django.urls import path, include
from sistema.views import Home, Login, Logout, CadastroView
from .views import LoginView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', Home.as_view(), name='home'),
    path('login/', Login.as_view(), name='login'), 
    path('logout/', Logout.as_view(), name='logout'),
    path('cadastro/', CadastroView.as_view(), name='cadastro'),
    path('pets/', include('pets.urls')),
    path('api/login/', LoginView.as_view(), name='api_login'),
]

# Serve arquivos de mídia durante o desenvolvimento
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
