from flask import Flask, render_template, flash, redirect, url_for, session, request, logging, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy

import json
import os
import sys
import logging
from os import environ

# import boto3
# import boto
# from botocore.client import Config
# from boto.s3.connection import S3Connection
# from boto3.dynamodb.conditions import Key, Attr

# from wtforms import Form, StringField, TextAreaField, PasswordField, validators
# from passlib.hash import sha256_crypt
# from functools import wraps
# from flask_mail import Mail, Message


app = Flask(__name__)

ENV = 'dev'

if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://master:123456@localhost/api_dev'
else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = ''

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Feedback(db.Model):
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


# app.logger.addHandler(logging.StreamHandler(sys.stdout))
# app.logger.setLevel(logging.ERROR)

# from config import envSwitch
# keys = envSwitch.keys()

# class Envstate:
# 	KEY_ID = keys.KEY_ID,
# 	SECRET_KEY = keys.SECRET_KEY,
# 	REGION = keys.REGION,
# 	BUCKET = keys.BUCKET,
# 	MASTER = keys.MASTER,
# 	MAIL_SERVER = keys.MAIL_SERVER,
# 	MAIL_PORT = keys.MAIL_PORT,
# 	MAIL_USERNAME = keys.MAIL_USERNAME,
# 	MAIL_PASSWORD = keys.MAIL_PASSWORD,
# 	MAIL_USE_TLS = keys.MAIL_USE_TLS,
# 	MAIL_USE_SSL = keys.MAIL_USE_SSL




# ##INIT BUCKET
# s3 = boto3.resource(
#     's3',
#     aws_access_key_id=Envstate.KEY_ID,
#     aws_secret_access_key=Envstate.SECRET_KEY,
#     config=Config(signature_version='s3v4')
# )
# baseAWSURL = "https://s3."+str(Envstate.REGION)+".amazonaws.com/port-bucket/"


# ##MAIL CONFIG
# app.config.update(
# 	MAIL_SERVER = Envstate.MAIL_SERVER, 
# 	MAIL_PORT = Envstate.MAIL_PORT,
# 	MAIL_USE_SSL = Envstate.MAIL_USE_SSL,
# 	MAIL_USERNAME = Envstate.MAIL_USERNAME,
# 	MAIL_PASSWORD = Envstate.MAIL_PASSWORD
# )

# mail = Mail(app)

# @app.context_processor
# def override_url_for():
#     return dict(url_for=dated_url_for)

# def dated_url_for(endpoint, **values):
#     if endpoint == 'static':
#         filename = values.get('filename', None)
#         if filename:
#             file_path = os.path.join(app.root_path,
#                                  endpoint, filename)
#             values['q'] = int(os.stat(file_path).st_mtime)
#     return url_for(endpoint, **values)

# def is_logged_in(f):
# 	@wraps(f)
# 	def wrap(*args, **kwargs):
# 		if 'logged_in' in session:
# 			return f(*args, **kwargs)
# 		else:
# 			flash('Unauthorized, Please login', 'danger')
# 			return redirect(url_for('login'))
# 	return wrap

# ##ROUTES
@app.route('/', methods=['GET', 'POST'])
def about():
	return render_template('about.html')

# @app.route('/hobbies', methods=['GET', 'POST'])
# def hobbies():
# 	return render_template('hobbies.html')

# @app.route('/contact', methods=['GET', 'POST'])
# def contact():
# 	errors = []
# 	if request.method == 'POST':
# 		if not request.form['name']:
# 			errors.append('Please provide your name')
# 		if not request.form['email']:
# 			errors.append('Please provide your email')
# 		if not request.form['message']:
# 			errors.append('No hello? :(')
# 		if len(errors) == 1:
# 			print(errors)
# 			flash(errors[0], 'success')
# 		elif len(errors) > 1:
# 			print(errors)
# 			flash('Please fill in all fields', 'success')
# 		else:
# 			msg = Message('A hello from '+ request.form['name'], sender=Envstate.MAIL_USERNAME, recipients=[Envstate.MAIL_USERNAME])
# 			msg.html = '<p>'+request.form['message']+'</p>'+'<p>email: '+request.form['email']+'</p>'
# 			mail.send(msg)

# 			flash('Submitted! Thank you for reaching out, will get back to you shortly', 'success')
# 			return redirect(url_for('contact'))

# 	return render_template('contact.html')

@app.route('/projects', methods=['GET', 'POST'])
def gallery():
	# def fetchIntoArray():
	# 	sql = "SELECT * FROM projects;"

	# 	stmt = ibm_db.prepare(db2conn,sql)
	# 	ibm_db.execute(stmt)

	# 	rows = []
	# 	result = ibm_db.fetch_assoc(stmt)
	# 	while result != False:
	# 		rows.append(result.copy())
	# 		result = ibm_db.fetch_assoc(stmt)

	# 	return rows
	
	# if(len(fetchIntoArray()) > 0):
	# 	content = {}
	# 	payload = []
	# 	for result in fetchIntoArray():
	# 		print(result)
	# 		content = {
	# 			'id': result['ID'],
	# 			'app_type': result['APP_TYPE'],
	# 			'deployed_url': result['DEPLOYED_URL'],
	# 			'description': result['DESCRIPTION'],
	# 			'game_file': result['GAME_FILE'],
	# 			'git_url': result['GIT_URL'],
	# 			'icon_file': result['ICON_FILE'],
	# 			'style_file': result['STYLE_FILE'],
	# 			'title': result['TITLE']
	# 		}
	# 		payload.append(content)
	# 		content = {}

	# 	# ibm_db.close(db2conn)
	# 	return render_template('index.html', files = payload)
	
	return render_template('index.html')

# class RegisterForm(Form):
# 	username = StringField('Username', [validators.Length(min=4, max=25)])
# 	password = PasswordField('Password', [
# 		validators.DataRequired(),
# 		validators.EqualTo('confirm', message='Passwords do not match')
# 	])
# 	confirm = PasswordField('Confirm Password')
# @app.route('/register', methods=['GET', 'POST'])
# def register():
# 	form = RegisterForm(request.form)
# 	if request.method == 'POST' and form.validate():

# 		username = form.username.data
# 		password = sha256_crypt.encrypt(str(form.password.data))

# 		def returnOne(sql):	
# 			stmt = ibm_db.prepare(db2conn,sql)
# 			ibm_db.execute(stmt)
			
# 			return ibm_db.fetch_assoc(stmt)

# 		if not returnOne('SELECT * FROM master'):
# 			if username != ''.join(Envstate.MASTER):
# 				# ibm_db.close(db2conn)

# 				flash('That is not the expected master', 'success')
# 				return redirect(url_for('register'))
# 			else:
# 				sql = 'INSERT INTO master (username, password) VALUES (?, ?)', 

# 				stmt = ibm_db.prepare(db2conn,''.join(sql))
# 				ibm_db.bind_param(stmt, 1, username)
# 				ibm_db.bind_param(stmt, 2, password)
# 				ibm_db.execute(stmt)

# 				# ibm_db.close(db2conn)

# 				flash('You are now registered and can log in', 'success')
# 				return redirect(url_for('login'))
# 		else:
# 			sql = 'SELECT user FROM master LIMIT 1'
# 			dbmaster = returnOne(sql)
# 			if dbmaster == username:
# 				# ibm_db.close(db2conn)

# 				flash('Expected master is already registered', 'success')				
# 				return redirect(url_for('register'))
			
# 			# ibm_db.close(db2conn)

# 	else:
# 		return render_template('register.html', form=form)

# @app.route('/login', methods=['GET', 'POST'])
# def login():
# 	def returnOne(sql):	
# 		stmt = ibm_db.prepare(db2conn,sql)
# 		ibm_db.execute(stmt)
		
# 		return ibm_db.fetch_assoc(stmt)

# 	if request.method == 'POST':
# 		username = request.form['username']
# 		password_condidate = request.form['password']

# 		dbmaster = returnOne('SELECT username FROM master LIMIT 1')

# 		result = returnOne('SELECT password FROM master LIMIT 1')
# 		if username != dbmaster['USERNAME']:
# 			# ibm_db.close(db2conn)

# 			flash('Invalid username', 'success')
# 			return redirect(url_for('login'))	
# 		else: 
# 			if sha256_crypt.verify(password_condidate, result['PASSWORD']):
# 				app.logger.info('PASSWORD MATCHED')
# 				session['logged_in'] = True
# 				session['username'] = username
# 				# ibm_db.close(db2conn)

# 				flash('You are now logged in', 'success')
# 				return redirect(url_for('post'))
# 			else:
# 				app.logger.info('PASSWORD NOT MATCHED')
# 				# ibm_db.close(db2conn)

# 				flash('Invalid login', 'success')
# 				return redirect(url_for('login'))

# 	return render_template('login.html')

# @app.route('/logout')
# def logout():
# 	session.clear()
# 	flash('You are now logged out', 'success')
# 	return redirect(url_for('login'))

# @app.route('/portal', methods=['GET', 'POST'])
# @is_logged_in
# def post():
# 	if request.method == 'POST':
# 		class State:
# 			FORM_TITLE = request.form['title'],
# 			FORM_DESCRIPTION = request.form['description'],
# 			FORM_GIT = request.form['git'],
# 			FORM_TYPE = '',
# 			FORM_ICON = 'None',
# 			FORM_GAME = 'None',
# 			FORM_STYLE = 'None',
# 			FORM_DEPLOYED = 'None',
# 			reqs = 'None'

# 		if request.form['web']:
# 			State.reqs = request.files['icon']
# 			State.FORM_ICON = baseAWSURL+''.join(State.FORM_TITLE)+'/'+State.reqs.content_type.replace('/','-')
# 			State.FORM_DEPLOYED = ''.join(request.form['web'])
# 			State.FORM_TYPE = 'Deployed Website'
# 		else:
# 			State.reqs = [
# 				request.files['game'],
# 				request.files['icon'],
# 				request.files['style']
# 			]
# 			State.FORM_GAME = baseAWSURL+''.join(State.FORM_TITLE)+'/'+State.reqs[0].content_type.replace('/','-')
# 			State.FORM_ICON = baseAWSURL+''.join(State.FORM_TITLE)+'/'+State.reqs[1].content_type.replace('/','-')
# 			State.FORM_STYLE = baseAWSURL+''.join(State.FORM_TITLE)+'/'+State.reqs[2].content_type.replace('/','-')
# 			State.FORM_TYPE = 'Sample App'

# 		sql = """INSERT INTO projects (
# 			app_type, 
# 			deployed_url, 
# 			description, 
# 			game_file, 
# 			git_url, 
# 			icon_file, 
# 			style_file, 
# 			title 
# 		) VALUES (?, ?, ?, ?, ?, ?, ?, ?)""", 

# 		stmt = ibm_db.prepare(db2conn,''.join(sql))
# 		ibm_db.bind_param(stmt, 1, ''.join(State.FORM_TYPE))
# 		ibm_db.bind_param(stmt, 2, ''.join(State.FORM_DEPLOYED))
# 		ibm_db.bind_param(stmt, 3, ''.join(State.FORM_DESCRIPTION))
# 		ibm_db.bind_param(stmt, 4, ''.join(State.FORM_GAME))
# 		ibm_db.bind_param(stmt, 5, ''.join(State.FORM_GIT))
# 		ibm_db.bind_param(stmt, 6, ''.join(State.FORM_ICON))
# 		ibm_db.bind_param(stmt, 7, ''.join(State.FORM_STYLE))
# 		ibm_db.bind_param(stmt, 8, ''.join(State.FORM_TITLE))
# 		ibm_db.execute(stmt)

# 		if isinstance(State.reqs, list):
# 			for file in State.reqs:
# 				BUFF = file.read()
# 				# print(BUFF)
# 				MIME = file.content_type
# 				# print(MIME)
# 				s3.Bucket(Envstate.BUCKET).put_object(
# 					Key=''.join(State.FORM_TITLE)+'/'+MIME.replace('/','-'), 
# 					Body=BUFF, 
# 					ContentType=MIME, 
# 					ACL='public-read'
# 				)
# 		else:
# 			BUFF = State.reqs.read()
# 			# print(BUFF)
# 			MIME = State.reqs.content_type
# 			# print(MIME)
# 			s3.Bucket(Envstate.BUCKET).put_object(
# 				Key=''.join(State.FORM_TITLE)+'/'+MIME.replace('/','-'), 
# 				Body=BUFF, 
# 				ContentType=MIME, 
# 				ACL='public-read'
# 			)
# 			print('not a list')

# 		print ('content uploaded')
# 		# flash('You successfully uploaded', 'success')
# 		return redirect(url_for('post'))		

# 	def fetchIntoArray():
# 		sql = "SELECT * FROM projects;"

# 		stmt = ibm_db.prepare(db2conn,sql)
# 		ibm_db.execute(stmt)

# 		rows = []
# 		result = ibm_db.fetch_assoc(stmt)
# 		while result != False:
# 			rows.append(result.copy())
# 			result = ibm_db.fetch_assoc(stmt)

# 		return rows

# 	if(len(fetchIntoArray()) > 0):
# 		content = {}
# 		payload = []
# 		for result in fetchIntoArray():
# 			content = {
# 				'id': result['ID'],
# 				'app_type': result['APP_TYPE'],
# 				'deployed_url': result['DEPLOYED_URL'],
# 				'description': result['DESCRIPTION'],
# 				'game_file': result['GAME_FILE'],
# 				'git_url': result['GIT_URL'],
# 				'icon_file': result['ICON_FILE'],
# 				'style_file': result['STYLE_FILE'],
# 				'title': result['TITLE']
# 			}
# 			payload.append(content)
# 			content = {}

# 		# ibm_db.close(db2conn)
# 		# print(payload[0]['title'])
# 		return render_template('portal.html', files = payload)

# 	return render_template('portal.html')
# 	# return render_template('portal.html', files = TableData().content_data())

# @app.route('/portal/<ID>/', methods=['POST'])
# def delete(ID):
# 	if request.method == 'POST':
# 		# db2 delete
# 		sql = 'DELETE FROM projects WHERE id = ?'
# 		stmt = ibm_db.prepare(db2conn, sql)
# 		ibm_db.bind_param(stmt, 1, ID)
# 		ibm_db.execute(stmt)

# 		# AWS bucket delete
# 		name = request.form['name']
# 		bucket = s3.Bucket(Envstate.BUCKET)
# 		bucket.objects.filter(Prefix=name).delete()

# 		return redirect(url_for('post'))



if __name__ == '__main__':
	app.run()


## REASOURCES ##
# http://www.phpmyadmin.co/