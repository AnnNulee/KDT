from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.


def get_data(request) : 
    data = {
        "message" : "JSON response",
        "status" : "success",
        "data" : {
            "id" : 1,
            "name" : "nulee",
            "email" : "tlssnfl0406@gmail.com"
        }
    }
    return JsonResponse(data, status=200)