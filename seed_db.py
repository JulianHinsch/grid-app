from app import db
from models import Resource

def seed():
    db.drop_all()
    db.create_all()

    example_resource = Resource(
        nickname='Example Resource',
        type = 'SOLAR',
        online = True,
        max_output = 10,
        percent_output = 100
        )

    db.session.add(example_resource)
    db.session.commit()
