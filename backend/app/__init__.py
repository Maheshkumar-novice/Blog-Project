from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

app = Flask(__name__)
app.config.from_object(Config)
app.secret_key='AjfD3F4Vr9dsvie2'
db = SQLAlchemy(app)
migrate = Migrate(app, db)
login = LoginManager(app)

from app.routes import *
from app.models import * 
from app.response import Response

@login.unauthorized_handler
def unauthorized():
    return Response.error(401, 'Unauthorized access')

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

@app.before_request
def before_request():
    if current_user.is_authenticated:
        current_user.last_seen = datetime.utcnow()
        db.session.commit()

@app.after_request
def after_request(res):
    res.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    res.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    res.headers['Access-Control-Allow-Credentials'] = 'true'
    res.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return res