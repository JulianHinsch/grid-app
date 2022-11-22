import os
import json
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

app = Flask(__name__)

DB_URL = get_env_variable("DB_URL")

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # silence the deprecation warning

db = SQLAlchemy(app)

with app.app_context():
    if get_env_variable("ENV") == "development":
        import seed_db
        seed_db.seed()

from models import Resource

@app.get("/api/resources")
def list_resources():
    resources = Resource.query.all()
    return json.dumps([ row.to_dict() for row in resources])

# @app.post("/api/resource")
# def create_resource():

# @app.patch("/api/resources/<id>")
# def update_resource():

# @app.delete("/api/resource/<id>")
# def delete_resource():
