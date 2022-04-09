from flask import Flask, render_template, flash, redirect, url_for, session, request, logging, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_redis import FlaskRedis
import redis

import json
import os
import sys
import logging
from os import environ

from flask_mail import Mail, Message
from config import envSwitch

import redis
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address


keys = envSwitch.keys()
class Envstate:
	SECRET_KEY = keys.SECRET_KEY,
	MAIL_SERVER = keys.MAIL_SERVER,
	MAIL_PORT = keys.MAIL_PORT,
	MAIL_USERNAME = keys.MAIL_USERNAME,
	MAIL_PASSWORD = keys.MAIL_PASSWORD,
	MAIL_USE_TLS = keys.MAIL_USE_TLS,
	MAIL_USE_SSL = keys.MAIL_USE_SSL,
	DATABASE_URL = keys.DATABASE_URL,
	REDIS_URL = keys.REDIS_URL,
	IS_LOCAL = keys.IS_LOCAL

##INIT FLASK
app = Flask(__name__)
app.secret_key = ''.join(Envstate.SECRET_KEY)
app.debug = True
# app.debug = (Envstate.IS_LOCAL)[0]

##INIT REDIS
r = redis.from_url(''.join(Envstate.REDIS_URL))

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

##INIT DB
app.config['SQLALCHEMY_DATABASE_URI'] = ''.join(Envstate.DATABASE_URL)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

##INIT MAIL
app.config.update(
	MAIL_SERVER = ''.join(Envstate.MAIL_SERVER), 
	MAIL_PORT = ''.join(Envstate.MAIL_PORT),
	MAIL_USE_SSL = ''.join(Envstate.MAIL_USE_SSL),
	MAIL_USERNAME = ''.join(Envstate.MAIL_USERNAME),
	MAIL_PASSWORD = ''.join(Envstate.MAIL_PASSWORD)
)
mail = Mail(app)


## ROUTES
@app.route('/', methods=['GET', 'POST'])
def about():
	return render_template('about.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
	errors = []
	if request.method == 'POST':
		if not request.form['name']:
			errors.append('Please provide your name')
		if not request.form['email']:
			errors.append('Please provide your email')
		if not request.form['message']:
			errors.append('No hello? :(')
		if len(errors) == 1:
			print(errors)
			flash(errors[0], 'success')
		elif len(errors) > 1:
			print(errors)
			flash('Please fill in all fields', 'success')
		else:
			# import inspect
			print(''.join(Envstate.MAIL_USERNAME))
			msg = Message(
				subject="Message from "+request.form['name'],
				sender=''.join(Envstate.MAIL_USERNAME), 
				recipients=[''.join(Envstate.MAIL_USERNAME)]
			)
			msg.html = '<p>'+request.form['message']+'</p>'+'<p>email: '+request.form['email']+'</p>'
			# python.send(msg)

			flash('Submitted! Thank you for reaching out, will get back to you shortly', 'success')
			return redirect(url_for('contact'))

	return render_template('contact.html')
	
from modules.main import get_one_and_unzip, get_all_from_key
@app.route('/projects/get-slides', methods=['GET', 'POST'])
def fetch_and_cache_buffers():
	title = request.args.get('title')
	if r and r.exists(title):
		slides = json.loads(r.get(title))
		print("cache found for slides")
		return slides
	
	slideBuffers = get_all_from_key(title)
	r.setex(title, 60*30, json.dumps(slideBuffers))
	
	return slideBuffers

@app.route('/projects/get-cache', methods=['GET', 'POST'])
def register_cache():
	if r and r.exists(request.args.get('title')):
		print("cache found for project")
		return r.get(request.args.get('title'))

	encryption = get_one_and_unzip(request.args.get('title'), request.args.get('version'), request.args.get('projectType'))

	r.setex(request.args.get('title'), 60*30, encryption['project'])
	
	return encryption['project']

@app.route('/projects', methods=['GET', 'POST'])
def gallery():
	if r and r.exists('projects'):
		payload = json.loads(r.get('projects'))
		print("cache found for gallery")
		return render_template('index.html', files = payload, len = len(payload))

	def fetchIntoArray():
		SQL = "SELECT * FROM projects;"
		result = db.session.execute(SQL).fetchall()

		return result

	if (len(fetchIntoArray()) > 0):
		content = {}
		payload = []
		for result in fetchIntoArray():
			content = {
				'id': result[0],
				'projectType': result[1],
				'website': result[2],
				'description': result[3],
				'repository': result[5],
				'icon': result[6],
				'secretKey': result[7],
				# 'createdAt': result[8],
				# 'updatedAt': result[9],
				'title': result[10],
				'version': result[11]
			}
			
			payload.append(content)
			content = {}

		r.setex("projects", 60*10, json.dumps(payload))
		return render_template('index.html', files = payload, len = len(payload))
	
	return render_template('index.html')


if __name__ == '__main__':
	app.run()
