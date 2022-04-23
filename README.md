# portfolio2
react.js, rocket.rs

## Deploy to Heroku
git subtree push --prefix path/to/app-subdir heroku master

## Deploy using docker-compose
docker-compose up at root

## Environmental Variables
### Client
REACT_APP_CONTENT_API_URL= URL to /api/v1/projects

REACT_APP_BUCKET_ROOT= Base URL name pointing to AWS bucket root

REACT_APP_CONTACT_API_URL= URL to /api/v1/contact

### Server
MAIL_SERVER= Mailing server used for the rust lettre library

MAIL_USERNAME= Email used to receive contact payload

MAIL_PASSWORD= Create app password through service. For example: [Gmail](https://support.google.com/accounts/answer/185833?hl=en)

PORTFOLIO_URL= URL of client to be whitelisted into cors

HEROKU_POSTGRESQL_IVORY_URL= Cloud or local URL based connection parameter to init postgres into app

REDIS_URL= Cloud or local URL based connection parameter to init redis into app

BUCKET_ROOT= Base URL name pointing to AWS bucket root

ACCESS_SECRET_KEY= Generated AWS Secret Key required to connect to AWS client

ACCESS_KEY_ID= Generated AWS Access Key Id required to connect to AWS client

BUCKET_NAME= Name of bucket for portfolio projects

BUCKET_REGION= Region provided by your AWS bucket on creation, required to connect to AWS client


