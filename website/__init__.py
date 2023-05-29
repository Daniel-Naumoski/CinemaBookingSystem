from flask import Flask, request, make_response
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager

from codecs import encode, decode

from flask_mail import Mail, Message

from werkzeug.datastructures import ImmutableMultiDict
######

# (A) INIT
# (A1) LOAD REQUIRED PACKAGES
# from flask import Flask, render_template, request, make_response
# from werkzeug.datastructures import ImmutableMultiDict
# import smtplib
# from email.mime.multipart import MIMEMultipart
# from email.mime.text import MIMEText

# # (B) SETTINGS
# HOST_NAME = "localhost"
# HOST_PORT = 80
# MAIL_FROM = "sys@site.com"
# MAIL_TO = "admin@site.com"
# MAIL_SUBJECT = "Booking Request"


db = SQLAlchemy()
DB_NAME = 'database.db'


def create_app():
    app = Flask(__name__)

    #
    mail=Mail(app)
    #

    app.config['SECRET_KEY'] = 'teoenajkul'
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_NAME}"
    db.init_app(app)
  
        
    from .views import views
    from .auth import auth
    app.config['LOGIN_VIEW'] = 'auth.login'

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    from .models import User, Movies
    with app.app_context():
         create_database()
         
    login_manager= LoginManager()
    login_manager.login_view='auth.login'
    login_manager.init_app(app)
    


    app.config['MAIL_SERVER']='smtp.gmail.com'
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USERNAME'] = 'project.cinemabooking@gmail.com'
    app.config['MAIL_PASSWORD'] = 'evwfezlxwwpjcwhk'
    app.config['MAIL_USE_TLS'] = False
    app.config['MAIL_USE_SSL'] = True

    #
    mail=Mail(app)
    #

    @app.route("/book", methods=["POST"])
    def foo():
    # (C3-1) EMAIL HEADERS
        #customer_name = request.form.get("Name")
        msg = Message('Cinema Booking', sender = 'project.cinemabooking@gmail.com', recipients = [request.form.get("Email")])
        msg.body = "Dear customer, your booking has been successfully processed, see you at the cinema !"
        #msg.html =
        mail.send(msg)
        res = make_response("OK", 200)
        return res


    @login_manager.user_loader
    def load_user(username):
        return User.query.get(username)
    return app


def create_database():
    if not path.exists('website/' + DB_NAME):
        db.create_all()
        print('Created Database!')
