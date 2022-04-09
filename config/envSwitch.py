from flask import Flask
import os

class keys:
	def __init__(self):
		from dotenv import load_dotenv
		load_dotenv()

		if os.getenv("IS_LOCAL") == "True":
			print('in local', os.getenv("IS_LOCAL"))
			self.SECRET_KEY = os.getenv("SECRET_KEY")
			self.ACCESS_SECRET_KEY = os.getenv("ACCESS_SECRET_KEY")
			self.ACCESS_KEY_ID = os.getenv("ACCESS_KEY_ID")
			self.BUCKET_NAME = os.getenv("BUCKET_NAME")
			self.BUCKET_ROOT = os.getenv("BUCKET_ROOT")

			self.MAIL_SERVER = os.getenv("MAIL_SERVER")
			self.MAIL_PORT = os.getenv("MAIL_PORT")
			self.MAIL_USERNAME = os.getenv("MAIL_USERNAME")
			self.MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
			self.MAIL_USE_TLS = os.getenv("MAIL_USE_TLS")
			self.MAIL_USE_SSL = os.getenv("MAIL_USE_SSL")

			self.DATABASE_URL = os.getenv("HEROKU_POSTGRESQL_IVORY_URL")
			self.REDIS_TLS_URL = os.getenv("REDIS_TLS_URL")
			self.REDIS_URL = os.getenv("REDIS_URL")
			self.IS_LOCAL = os.getenv("IS_LOCAL") == "True"
		else:
			# HEROKU

			print('in heroku', os.environ['IS_LOCAL'])
			self.SECRET_KEY = os.environ['SECRET_KEY']
			self.ACCESS_SECRET_KEY = os.environ['ACCESS_SECRET_KEY']
			self.ACCESS_KEY_ID = os.environ['ACCESS_KEY_ID']
			self.BUCKET_NAME = os.environ['BUCKET_NAME']
			self.BUCKET_ROOT = os.environ['BUCKET_ROOT']

			self.MAIL_SERVER = os.environ['MAIL_SERVER']
			self.MAIL_PORT = os.environ['MAIL_PORT']
			self.MAIL_USERNAME = os.environ['MAIL_USERNAME']
			self.MAIL_PASSWORD = os.environ['MAIL_PASSWORD']
			self.MAIL_USE_TLS = os.environ['MAIL_USE_TLS']
			self.MAIL_USE_SSL = os.environ['MAIL_USE_SSL']

			self.DATABASE_URL = os.environ['HEROKU_POSTGRESQL_IVORY_URL'].replace("://", "ql://", 1)
			self.REDIS_TLS_URL = os.environ['REDIS_TLS_URL']
			self.REDIS_URL = os.environ['REDIS_URL']
			self.IS_LOCAL = os.environ['IS_LOCAL'] == "True"
