from django.contrib.admindocs import views
from django.shortcuts import render
from django.http import JsonResponse
from django.views.generic import TemplateView
from .utils import count_words

class MainView(TemplateView):
    template_name = 'main.html'

class SignView(TemplateView):
    template_name = 'signup.html'

class LoginView(TemplateView):
    template_name = 'login.html'

class HomeView(TemplateView):
    template_name = 'home.html'


def upload_document(request):
    if request.method == "POST":
        file = request.FILES.get('file')
        words_dict, total_words_counter = count_words(file)

    return JsonResponse({'words_dict': words_dict, 'total_words_counter': total_words_counter})


# Displays signup page
def signup_page(request):
    return render(request, 'signup.html')


# Displays login page
def login_page(request):
    return render(request, 'login.html')

def signup_page(request):
    return render(request, 'signup.html')

def home_page(request):
    return render(request, 'home.html')
