import json
from flask import request
from app import app, db
from models import Resource

@app.get("/api/resources")
def list_resources():
    resources = Resource.query.all()
    return json.dumps([ row.to_dict() for row in resources])

@app.post("/api/resources")
def create_resource():
    request_data = request.get_json()
    resource = Resource(
        nickname = request_data["nickname"],
        type = request_data["type"],
        max_output = request_data["max_output"],
        online = True,
        percent_output = 100)
    db.session.add(resource)
    db.session.commit()
    return "", 201

@app.patch("/api/resources/<int:id>")
def update_resource():
    resource = Resource.query.get_or_404(id)
    request_data = request.get_json()

    # these are the only fields that can be updated in the UI
    if request_data["online"]:
        resource["online"] = request_data["online"]

    if request_data["percent_output"]:
        resource["percent_output"] = request_data["percent_output"]

    db.session.add(resource)
    db.session.commit()
    return "", 200


@app.delete("/api/resource/<int:id>")
def delete_resource():
    resource = Resource.query.get_or_404(id)
    db.session.delete(resource)
    db.session.commit()
    return "", 200