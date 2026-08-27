from django.shortcuts import render

app_name = "students"

def home(request):
    return render(request, "students/index.html")


def about(request):
    return render(request, "students/about.html")
