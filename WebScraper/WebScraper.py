from bs4 import BeautifulSoup
from PIL import Image
from flask import Flask, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def emptyReturn():
	return jsonify({"Title": "none"}, {"Image": "none"}, {"Description": "none"})

@app.route('/urlInfo/<path:link>', methods=['GET'])
def urlAnalysis(link):
	url = link
	response = requests.get(url, timeout=10);
	content = BeautifulSoup(response.content, "html.parser")
	title = content.find('title').text
	for imageURL in content.findAll('img'):
	    if '.jpg' not in imageURL.attrs['src']:
	        continue
	    imageGet = requests.get(imageURL.attrs['src'], stream=True)
	    imageGet.raw.decode_content = True
	    img = Image.open(imageGet.raw)
	    width, height = img.size
	    if width > 250 or height > 250:
	        break
	for description in content.findAll('p'): 
	    if len(description.text) > 80:
	        break
	return jsonify({"Title": title}, {"Image": imageURL.attrs['src']}, {"Description": description.text})

def printTest():
	print(title.text)
	print('============================================')
	print(imageURL.attrs['src'])
	print('============================================')
	print(description.text)

if __name__ == '__main__':
	app.run(debug=True)