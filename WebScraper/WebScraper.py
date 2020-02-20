from bs4 import BeautifulSoup
import requests

url = 'https://globalnews.ca/news/6571964/democratic-debate-election-nevada/'
response = requests.get(url, timeout=10);
content = BeautifulSoup(response.content, "html.parser")

print(content)