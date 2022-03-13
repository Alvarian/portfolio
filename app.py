from flask import Flask, render_template, flash, redirect, url_for, session, request, logging, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy

import json
import os
import sys
import logging
from os import environ

from flask_mail import Mail, Message
from config import envSwitch

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

keys = envSwitch.keys()

class Envstate:
	# KEY_ID = keys.KEY_ID,
	SECRET_KEY = keys.SECRET_KEY,
	# REGION = keys.REGION,
	# BUCKET = keys.BUCKET,
	# MASTER = keys.MASTER,
	MAIL_SERVER = keys.MAIL_SERVER,
	MAIL_PORT = keys.MAIL_PORT,
	MAIL_USERNAME = keys.MAIL_USERNAME,
	MAIL_PASSWORD = keys.MAIL_PASSWORD,
	MAIL_USE_TLS = keys.MAIL_USE_TLS,
	MAIL_USE_SSL = keys.MAIL_USE_SSL,
	DATABASE_URL = keys.DATABASE_URL,
	IS_LOCAL = keys.IS_LOCAL

##INIT FLASK
app = Flask(__name__)
app.secret_key=''.join(Envstate.SECRET_KEY)

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# app.debug = Envstate.IS_LOCAL
app.debug = False

##INIT DB
app.config['SQLALCHEMY_DATABASE_URI'] = ''.join(Envstate.DATABASE_URL)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Projects(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    app_type = db.Column(db.String(50))
    deployed_url = db.Column(db.String(255))
    description = db.Column(db.Text())
    game_file = db.Column(db.String(255))
    git_url = db.Column(db.String(255))
    icon_file = db.Column(db.String(255))
    style_file = db.Column(db.String(255))
    title = db.Column(db.String(50))

    def __init__(
    	self, 
    	app_type, 
    	deployed_url, 
    	description, 
    	game_file, 
    	git_url, 
    	icon_file,
    	style_file,
    	title
    ):
        self.app_type = app_type
        self.deployed_url = deployed_url
        self.description = description
        self.game_file = game_file
        self.git_url = git_url
        self.icon_file = icon_file
        self.style_file = style_file
        self.title = title

##INIT MAIL
app.config.update(
	MAIL_SERVER = ''.join(Envstate.MAIL_SERVER), 
	MAIL_PORT = ''.join(Envstate.MAIL_PORT),
	MAIL_USE_SSL = Envstate.MAIL_USE_SSL,
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

@app.route('/projects', methods=['GET', 'POST'])
def gallery():
	def fetchIntoArray():
		SQL = "SELECT * FROM projects;"
		result = db.session.execute(SQL).fetchall()

		return result

	if(len(fetchIntoArray()) > 0):
		content = {}
		payload = []
		for result in fetchIntoArray():
			content = {
				'id': result[0],
				'app_type': result[1],
				'deployed_url': result[2],
				'description': result[3],
				'game_file': result[4],
				'git_url': result[5],
				'icon_file': result[6],
				'style_file': result[7],
				'title': result[8]
			}
			payload.append(content)
			content = {}

		return render_template('index.html', files = payload)
	
	return render_template('index.html')


if __name__ == '__main__':
	app.run()
