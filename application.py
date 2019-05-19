from flask import Flask, render_template, flash, redirect, url_for, session, request, logging
import json
import os
import sys
import logging
import boto3
import boto
from os import environ
from botocore.client import Config
from boto.s3.connection import S3Connection
from boto3.dynamodb.conditions import Key, Attr
from wtforms import Form, StringField, TextAreaField, PasswordField, validators
from passlib.hash import sha256_crypt
from functools import wraps
from flask_mail import Mail, Message

application = app = Flask(__name__, static_folder='static')
app.secret_key='secret123'

# app.logger.addHandler(logging.StreamHandler(sys.stdout))
# app.logger.setLevel(logging.ERROR)

##AWS CONFIG
class Envstate:
	KEY_ID = None,
	SECRET_KEY = None,
	REGION = None,
	BUCKET = None,
	MASTER = None,
	MAIL_SERVER = None,
	MAIL_PORT = None,
	MAIL_USERNAME = None,
	MAIL_PASSWORD = None,
	MAIL_USE_TLS = None,
	MAIL_USE_SSL = None

if 'ACCESS_KEY_ID' in os.environ:
	Envstate.KEY_ID = os.environ['ACCESS_KEY_ID']
	Envstate.SECRET_KEY = os.environ['ACCESS_SECRET_KEY']
	Envstate.REGION = os.environ['REGION_NAME']
	Envstate.BUCKET = os.environ['BUCKET_NAME']
	Envstate.MASTER = os.environ['EXPECTED_MASTER']
	Envstate.MAIL_SERVER = os.environ['MAIL_SERVER']
	Envstate.MAIL_PORT = os.environ['MAIL_PORT']
	Envstate.MAIL_USERNAME = os.environ['MAIL_USERNAME']
	Envstate.MAIL_PASSWORD = os.environ['MAIL_PASSWORD']
	Envstate.MAIL_USE_TLS = os.environ['MAIL_USE_TLS']
	Envstate.MAIL_USE_SSL = os.environ['MAIL_USE_SSL']
else:
	from config import all
	Envstate.KEY_ID = all.keys().ACCESS_KEY_ID
	Envstate.SECRET_KEY = all.keys().ACCESS_SECRET_KEY
	Envstate.REGION = all.keys().REGION_NAME
	Envstate.BUCKET = all.keys().BUCKET_NAME
	Envstate.MASTER = all.keys().EXPECTED_MASTER
	Envstate.MAIL_SERVER = all.keys().MAIL_SERVER
	Envstate.MAIL_PORT = all.keys().MAIL_PORT
	Envstate.MAIL_USERNAME = all.keys().MAIL_USERNAME
	Envstate.MAIL_PASSWORD = all.keys().MAIL_PASSWORD
	Envstate.MAIL_USE_TLS = all.keys().MAIL_USE_TLS
	Envstate.MAIL_USE_SSL = all.keys().MAIL_USE_SSL
# AWS_CONFIG = all.keys()

##INIT DYNAMO
dynamodb = boto3.resource(
	'dynamodb',
	aws_access_key_id=Envstate.KEY_ID, 
	aws_secret_access_key=Envstate.SECRET_KEY,
	region_name=Envstate.REGION
)
dynamoClient = boto3.client(
	'dynamodb', 
	aws_access_key_id=Envstate.KEY_ID, 
	aws_secret_access_key=Envstate.SECRET_KEY,
	region_name=Envstate.REGION
)


##INIT BUCKET
s3 = boto3.resource(
    's3',
    aws_access_key_id=Envstate.KEY_ID,
    aws_secret_access_key=Envstate.SECRET_KEY,
    config=Config(signature_version='s3v4')
)
baseAWSURL = "https://s3."+Envstate.REGION+".amazonaws.com/port-bucket/"


##MAIL CONFIG
app.config.update(
	MAIL_SERVER = Envstate.MAIL_SERVER, 
	MAIL_PORT = Envstate.MAIL_PORT,
	MAIL_USE_SSL = Envstate.MAIL_USE_SSL,
	MAIL_USERNAME = Envstate.MAIL_USERNAME,
	MAIL_PASSWORD = Envstate.MAIL_PASSWORD
)

mail = Mail(app)


##AWS CONTENT STATE
class TableData:
	def __init__(self):
		self.masterTable = dynamodb.Table('master')
		self.contentTable = dynamodb.Table('content')

	def master_data(self):
		data = self.masterTable.scan()['Items']	
		return data

	def content_data(self):
		data = self.contentTable.scan()['Items']
		return data

	def contentIndex(self):
		response = dynamoClient.describe_table(TableName='content')
		index = response['Table']['ItemCount']
		return index

print('length',len(TableData().content_data()))
print('id',TableData().content_data()[0]['id'])


@app.context_processor
def override_url_for():
    return dict(url_for=dated_url_for)

def dated_url_for(endpoint, **values):
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            file_path = os.path.join(app.root_path,
                                 endpoint, filename)
            values['q'] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)

def is_logged_in(f):
	@wraps(f)
	def wrap(*args, **kwargs):
		if 'logged_in' in session:
			return f(*args, **kwargs)
		else:
			flash('Unauthorized, Please login', 'danger')
			return redirect(url_for('login'))
	return wrap

##ROUTES
@app.route('/', methods=['GET', 'POST'])
def about():
	return render_template('about.html')

@app.route('/hobbies', methods=['GET', 'POST'])
def hobbies():
	return render_template('hobbies.html')

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
			msg = Message('A hello from '+ request.form['name'], sender=Envstate.MAIL_USERNAME, recipients=[Envstate.MAIL_USERNAME])
			msg.html = '<p>'+request.form['message']+'</p>'+'<p>email: '+request.form['email']+'</p>'
			mail.send(msg)

			flash('Submitted! Thank you for reaching out, will get back to you shortly', 'success')
			return redirect(url_for('contact'))

	return render_template('contact.html')

@app.route('/projects', methods=['GET', 'POST'])
def gallery():
	print(TableData().content_data())
	return render_template('index.html', files = TableData().content_data())

class RegisterForm(Form):
	username = StringField('Username', [validators.Length(min=4, max=25)])
	password = PasswordField('Password', [
		validators.DataRequired(),
		validators.EqualTo('confirm', message='Passwords do not match')
	])
	confirm = PasswordField('Confirm Password')
@app.route('/register', methods=['GET', 'POST'])
def register():
	form = RegisterForm(request.form)
	if request.method == 'POST' and form.validate():

		username = form.username.data
		password = sha256_crypt.encrypt(str(form.password.data))
		# response = TableData().masterTable.query(
		# 	KeyConditionExpression=Key('username').eq(username)
		# )
		if dynamoClient.describe_table(TableName='master')['Table']['ItemCount'] == 0: 
			if username != Envstate.MASTER:
				flash('That is not the expected master', 'success')
				return redirect(url_for('register'))
			else:		
				TableData().masterTable.put_item(
					Item={
						'username': username,
						'password': password
					}
				)
				flash('You are now registered and can log in', 'success')
				return redirect(url_for('login'))
		elif TableData().master_data()[0]['username'] == Envstate.MASTER:
			flash('Expected master is already registered', 'success')
			return redirect(url_for('register'))
	else:
		return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
	if request.method == 'POST':
		username = request.form['username']
		password_condidate = request.form['password']

		result = TableData().master_data()[0]['password'] 
		userquery = TableData().master_data()[0]['username'] 

		if username != userquery:
			flash('Invalid username', 'success')
			return redirect(url_for('login'))	
		else: 
			if sha256_crypt.verify(password_condidate, result):
				app.logger.info('PASSWORD MATCHED')
				session['logged_in'] = True
				session['username'] = username
				flash('You are now logged in', 'success')
				return redirect(url_for('post'))
			else:
				app.logger.info('PASSWORD NOT MATCHED')
				flash('Invalid login', 'success')
				return redirect(url_for('login'))

	return render_template('login.html')

@app.route('/logout')
def logout():
	session.clear()
	flash('You are now logged out', 'success')
	return redirect(url_for('login'))

@app.route('/portal', methods=['GET', 'POST'])
@is_logged_in
def post():
	if request.method == 'POST':
		class State:
			FORM_TITLE = request.form['title'],
			FORM_DESCRIPTION = request.form['description'],
			FORM_GIT = request.form['git'],
			FORM_TYPE = '',
			FORM_ICON = 'None',
			FORM_GAME = 'None',
			FORM_STYLE = 'None',
			FORM_DEPLOYED = 'None',
			reqs = 'None'

		if request.form['web']:
			State.reqs = request.files['icon']
			State.FORM_ICON = baseAWSURL+''.join(State.FORM_TITLE)+'/'+State.reqs.content_type.replace('/','-')
			State.FORM_DEPLOYED = ''.join(request.form['web'])
			State.FORM_TYPE = 'Deployed Website'
		else:
			State.reqs = [
				request.files['game'],
				request.files['icon'],
				request.files['style']
			]
			State.FORM_GAME = baseAWSURL+''.join(State.FORM_TITLE)+'/'+State.reqs[0].content_type.replace('/','-')
			State.FORM_ICON = baseAWSURL+''.join(State.FORM_TITLE)+'/'+State.reqs[1].content_type.replace('/','-')
			State.FORM_STYLE = baseAWSURL+''.join(State.FORM_TITLE)+'/'+State.reqs[2].content_type.replace('/','-')
			State.FORM_TYPE = 'Sample App'

		## CREATES ID USING INDEX
		def index():
			dynaIndex = len(TableData().content_data())
			if dynaIndex == 0:
				return 1
			else:
				index = TableData().content_data()[0]['id']
				print('old index',index)
				print('new index',index+1)
				return index+1


		## UPLOAD CONTENT
		TableData().contentTable.put_item(
			Item={
				'id': index(),
				'title': ''.join(State.FORM_TITLE),
				'description': ''.join(State.FORM_DESCRIPTION),
				'git_url': ''.join(State.FORM_GIT),
				'game_file': ''.join(State.FORM_GAME),
				'style_file': ''.join(State.FORM_STYLE),
				'icon_file': ''.join(State.FORM_ICON),				
				'deployed_url': ''.join(State.FORM_DEPLOYED),
				'app_type': ''.join(State.FORM_TYPE)
			}
		) 
		if isinstance(State.reqs, list):
			for file in State.reqs:
				BUFF = file.read()
				# print(BUFF)
				MIME = file.content_type
				# print(MIME)
				s3.Bucket(Envstate.BUCKET).put_object(
					Key=''.join(State.FORM_TITLE)+'/'+MIME.replace('/','-'), 
					Body=BUFF, 
					ContentType=MIME, 
					ACL='public-read'
				)
		else:
			BUFF = State.reqs.read()
			# print(BUFF)
			MIME = State.reqs.content_type
			# print(MIME)
			s3.Bucket(Envstate.BUCKET).put_object(
				Key=''.join(State.FORM_TITLE)+'/'+MIME.replace('/','-'), 
				Body=BUFF, 
				ContentType=MIME, 
				ACL='public-read'
			)
			print('not a list')

		print ('content uploaded')
		# flash('You successfully uploaded', 'success')
		return redirect(url_for('post'))
	return render_template('portal.html', files = TableData().content_data())

@app.route('/portal/<ID>/', methods=['POST'])
def delete(ID):
	if request.method == 'POST':
		name = request.form['name']
		bucket = s3.Bucket(Envstate.BUCKET)
		bucket.objects.filter(Prefix=name).delete()

		# print(int(ID))
		TableData().contentTable.delete_item(
	        Key={
				'id': int(ID)
			}
		)
		return redirect(url_for('post'))



if __name__ == '__main__':
	app.run(debug=True)