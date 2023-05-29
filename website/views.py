from flask import Blueprint, render_template, request, make_response
from flask_login import  login_required, current_user
views = Blueprint('views', __name__)

from flask_mail import Mail, Message

#######

#(A) INIT
#(A1) LOAD REQUIRED PACKAGES
# from flask import Flask, render_template, request, make_response
# from werkzeug.datastructures import ImmutableMultiDict
# import smtplib
# from email.mime.multipart import MIMEMultipart
# from email.mime.text import MIMEText

# from .__init__ import MAIL_FROM, MAIL_TO, MAIL_SUBJECT


@views.route('/index.html')
@login_required
def home():
    return render_template("index.html", user=current_user)


@views.route('/date.html')
@login_required
def date():
    return render_template("date.html", user=current_user)

@views.route('/booking.html')
@login_required
def booking():
    return render_template("booking.html", user=current_user)
######

# (C) ROUTES
# (C1) BOOKING PAGE
@views.route('/S1_booking.html')
@login_required
def S1_booking():
    return render_template("S1_booking.html", user=current_user)

# (C2) THANK YOU PAGE
@views.route("/thank")
@login_required
def S2_thank():
  return render_template("S2_thank.html", user=current_user)


# (C3) BOOKING ENDPOINT
# @views.route("/book", methods=["POST"])
# def foo():
#   # (C3-1) EMAIL HEADERS
#   msg = Message('Test message 1', sender = 'project.cinemabooking@gmail.com', recipients = ['daniel.naumoski@gmail.com'])
#   msg.body = "(test) Hello Flask message sent from Flask-Mail"
#   mail.send(msg)
#   res = make_response("OK", 200)
#   return res
  
#------------------------------------------------------------------
# # (C3) BOOKING ENDPOINT
# @views.route("/book", methods=["POST"])
# def foo():
#   # (C3-1) EMAIL HEADERS
#   mail = MIMEMultipart("alternative")
#   mail["Subject"] = MAIL_SUBJECT
#   mail["From"] = MAIL_FROM
#   mail["To"] = MAIL_TO

#   # (C3-2) EMAIL BODY (BOOKING DATA)
#   data = dict(request.form)
#   msg = "<html><head></head><body>"
#   for key, value in data.items():
#     msg += key + " : " + value + "<br>"
#   msg += "</body></html>"
#   mail.attach(MIMEText(msg, "html"))

#   # (C3-3) SEND MAIL
#   mailer = smtplib.SMTP("localhost")
#   mailer.sendmail(MAIL_FROM, MAIL_TO, mail.as_string())
#   mailer.quit()

#   # (C3-4) HTTP RESPONSE
#   res = make_response("OK", 200)
#   return res



