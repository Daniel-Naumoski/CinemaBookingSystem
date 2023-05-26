from flask_login import UserMixin
from . import db
from sqlalchemy.sql import func


class Movies(db.Model):
    username = db.Column(db.String(150), primary_key=True)
    data = db.Column(db.DateTime(timezone=True), default=func.now)
    fav_movie = db.Column(db.String(150))
    user_id = db.Column(db.String(150), db.ForeignKey('user.username'))


class User(db.Model, UserMixin):
    def get_id(self):
        return str(self.username)
    username = db.Column(db.String(159), primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    movies = db.relationship('Movies')
