from bs4 import BeautifulSoup
import requests

url = 'https://www.nytimes.com/2020/02/20/us/roger-stone-40-months-sentencing-verdict.html'
response = requests.get(url, timeout=10);
content = BeautifulSoup(response.content, "html.parser")
title = content.find('title')
image = content.find('img').attrs['src']

print(image)