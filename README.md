# port
My portfolio. Technology stack is HTML, flask and AWS S3 bucket only to write in legacy version(currently disabled in this version). Hosted on heroku, using postgres add-on for database. This version is just representing the structure of what I want my final version to have, using different and more personally preferred web stacks.

# Testimony
Although I will not use this application to represent my portfolio in the long term, I thoroughly enjoyed, using the need to have a portfolio up and running, as an excuse to get to know python.

# To Use
## Have Python 3.7 Installed
Go to https://www.python.org/downloads/ and download the 64bit version pertaining to your operating system. 

Go to your system's environment variables and make sure the downloaded folder of python exposing the main python exe file, is included in the path.

## Create Your .env File
Use the following variables in this file
```
MAIL_SERVER=""
MAIL_PORT=""
MAIL_USERNAME=""
MAIL_PASSWORD=""
MAIL_USE_TLS=<bool>
MAIL_USE_SSL=<bool>

DATABASE_URL=""
IS_LOCAL=True
```

## Install Provided Packages
Firstly, go to the main folder directory in terminal/command prompt, and type
```
> pip install pipenv
```
Once downloaded type 
```
> pipenv shell
```

Once in the pip VM, use requirements.txt as a grocery list for pip to shop for needed to get this application going. 

Type 
```
> pipenv install
```

## Database Setup
This application uses postgres, make sure to have that installed from https://www.postgresql.org/download/ before continuing. Once again go to your system's environmental variables and make sure the downloaded folder of postres exposing the main postgres exe file, is included in the path.

Once installed and environment variables are set, open pgadmin as an administrator. Create a user in the Login/Group Roles menu and enable that username as superuser in the priviledges tab. Remember the user and password if you gave it one. In the same menu create a new database, name given does not matter.

Go to your .env file and set DATABASE_URL to "postgresql://<INPUT SUPERUSER>:<INPUT PASSWORD GIVEN>@localhost/<DATABASE NAME>"
  
Then in your pip VM, in the main directory, type 
```
> python
>>> from app import db
>>> db.create_all()
```

This will create our table 'projects' from our Projects model constructor at line 40 in app.py, into your local database.

### Lastly
Migrate provided seeds into the projects table. In the pip VM type
```
> psql -h hostname -d databasename -U username -f ./db/seeds/project_seed.sql
```

## Start Application
In the main directory, while in the pip VM, type
```
> python app.py
```
