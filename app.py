import os
from dotenv import load_dotenv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

def get_env_variable(name):
    try:
        return os.getenv(name)
    except KeyError:
        message = "Expected environment variable '{}' not set.".format(name)
        raise Exception(message)

app = Flask(__name__, static_folder='./client/build', static_url_path='/')

DB_URL = get_env_variable("DB_URL")

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # silence the deprecation warning

db = SQLAlchemy(app)

with app.app_context():
    if get_env_variable("ENV") == "development":
        import seed_db
        seed_db.seed()

@app.route('/')
def index():
    return app.send_static_file('index.html')

import routes.resource_routes

if __name__ == "__main__":
   app.run(host='0.0.0.0', port=5000)