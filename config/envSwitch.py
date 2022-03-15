from flask import Flask
from distutils.util import strtobool
import os

class keys:
	def __init__(self):
		from dotenv import load_dotenv
		load_dotenv()

		if os.getenv("IS_LOCAL") == "True":
			print('in local', os.getenv("IS_LOCAL"))
			# self.KEY_ID = os.getenv("ACCESS_KEY_ID")
			self.SECRET_KEY = os.getenv("ACCESS_SECRET_KEY")
			# self.REGION = os.getenv("REGION_NAME")
			# self.BUCKET = os.getenv("BUCKET_NAME")

			# self.MASTER = os.getenv("EXPECTED_MASTER")

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
			# self.KEY_ID = os.environ['ACCESS_KEY_ID']
			self.SECRET_KEY = os.environ['ACCESS_SECRET_KEY']
			# self.REGION = os.environ['REGION_NAME']
			# self.BUCKET = os.environ['BUCKET_NAME']

			# self.MASTER = os.environ['EXPECTED_MASTER']

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
