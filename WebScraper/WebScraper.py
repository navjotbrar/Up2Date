from bs4 import BeautifulSoup
from PIL import Image
from flask import Flask, jsonify, request
import requests
import urllib.parse

#Creating an instance of the Flask Class
app = Flask(__name__)

#This default route sends back a JSON containing Title, Image, and Excerpt variables with values of 0
@app.route('/')
def emptyReturn():
	return jsonify({"Title": 0, "Image": 0, "Excerpt": 0})

#TODO: Handle '?' and '#' within the path variable
#This route is called for API users to get information about the Title, main Image, Excerpt of a News website
@app.route('/urlInfo/<path:link>', methods=['GET'])
def urlAnalysis(link):
	#Temporary solution to query parameter issue
	stockImage = 'https://cdn.onlinewebfonts.com/svg/img_148071.png'
	if len(request.query_string) > 0:
		return jsonify({"Title": "Could not decode website", "Image": stockImage, "Excerpt": "Click on the link to view the article"})
	#Parse the HTML of the given URL
	url = urllib.parse.unquote(link)
	try:
		response = requests.get(url, timeout=10)
		content = BeautifulSoup(response.content, "html.parser")
		#Get the article title
		title = content.find('title').text
	#Find the main image (.jpg only) by disregarding all images below a certain size
	except:
		return jsonify({"Title": "Could not decode website", "Image": stockImage, "Excerpt": "Click on the link to view the article"})
	#Find a paragraph that can be used as a short excerpt from the article by disregarding paragraphs shorter than a certain size
	for excerpt in content.findAll('p'): 
		if len(excerpt.text) > 80:
			break
	for imageURL in content.findAll('img'):
		if '.jpg' not in imageURL.attrs['src']:
			continue
		try:
			imageGet = requests.get(imageURL.attrs['src'], stream=True)
			imageGet.raw.decode_content = True
			img = Image.open(imageGet.raw)
		except:
			return jsonify({"Title": title, "Image": stockImage, "Excerpt": excerpt.text})
		width, height = img.size
		if width > 250 or height > 250:
			break
	#Return a JSON containing Title, Image, and Excerpt variables with values scraped from the HTML of the website
	return jsonify({"Title": title, "Image": imageURL.attrs['src'], "Excerpt": excerpt.text})

#TODO: Remove this fuction when application is fully tested
#Test function that prints out variable information
def printTest():
	print(title.text)
	print('============================================')
	print(imageURL.attrs['src'])
	print('============================================')
	print(excerpt.text)

#When script is executed, Python assigns the name '__main__' to the script
if __name__ == '__main__':
	#TODO: Change debug to 'False' after application is tested 
	#Runs the App, debug allows us to trace errors
	app.run(debug=True)