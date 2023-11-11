import requests

data = requests.get("http://localhost:8080/companies/search", {
    "headers": {
        "Authorization": "Basic user:user"
    }
})

print(data)
