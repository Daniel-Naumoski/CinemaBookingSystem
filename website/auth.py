from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_login import login_user, login_required, logout_user, current_user
from .models import User
from . import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager


auth = Blueprint('auth', __name__)
login_manager = LoginManager()
login_manager.init_app(auth)


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))


@auth.route('/login.html', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
               
                login_user(user, remember=True)
                return redirect(url_for('views.home'))
            else:
                flash('Incorrect Password', category='error')
        else:
            flash('Email does not exist', category='error')

    return render_template("login.html", user=current_user)


@auth.route('/', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        email1 = request.form.get('email')
        username = request.form.get('username')
        password1 = request.form.get('password')
        confirmpass1 = request.form.get('confirmpass')
        user = User.query.filter_by(email=email1).first()
        user1 = User.query.filter_by(username=username).first()
        if user:
            flash('This Email Already Exists', category='error')
        elif user1:
            flash('This username has already been used', category='error')
        elif username.isnumeric():
            flash('Pleace enter some characters', category='error')
        elif password1 != confirmpass1:
            flash('The Password Is Not The Same', category='Error')
        else:
            new_user = User(username=username, email=email1, password=generate_password_hash(
                password1, method='scrypt'))
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            return redirect(url_for('views.home'))

    return render_template("signup.html", user=current_user)
