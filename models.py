from app import db
from sqlalchemy_serializer import SerializerMixin

class Resource(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(100), nullable=False)
    online = db.Column(db.Boolean, nullable=False)
    max_output = db.Column(db.Integer, nullable=False)
    percent_output = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Resource {self.nickname}>'
