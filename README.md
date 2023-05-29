# CinemaBookingSystem
Cinema booking system that allows users to list movies and book seats from the comfort of their home.

Current Functions
-When opening home, site check if you are logged in. If you are not then it redirects to login page
-register works and login works, we only need to setup a way to go from login to setup ?!?!
-database is set up
-as far as I know all checks needed for the acc register are set up




### fast forward 30 hours of work - Daniel

1. Automated email sending as a confirmation by our company's email address to dynamic user email addresses via SMTP has been implemented.
2. Backend server improvements by adding server response codes, which were essential to fix the critical bugs and for logging purposes.
3. Issues regarding the change in Google's policy since May 2022 regarding "low securty" apps logging in have been solved. TFA security measures have been added.
4. Problems with some webpage resources not displaying as intended, or not displaying at all have been solved, path errors fixed in the back-end as well as the front-end.
5. Issues with some templates not loading due to bad route function parameters. After the cleanup the "improper index" page issue was finally able to be fixed.
6. New code added to __init__.py and views.py. New imports, new routes, configuration of email server parameters.
7. Refining of the code, as well as small changes being made for fixes in __init__.py, views.py, auth.py.
8. Small changes applied to some settings in booking, date, index and login html files needed for basic functioning of the whole website.
9. The calendar (date.html) problems have been fixed, but it got deprecated later on.
10. Two new additional html files, one css file and one javascript file for the new forms being used for the new reservation system.
11. Improper and confusing text being displayed to the user has been tweaked, new text added where it was missing to improve the user experience.
12. Added notifications of unsuccessful and successful actions performed by the end user as well as the server (only for internal usage).

Possible additions and/or improvements recommended in the future in these areas:
- Tuples and their attributes, immutable multi dictionaries and their attributes, encoding and decoding, bytestreams, fetch method for whole forms javascript. More customizable emails.
- Movie database + CRUD operations.
- Improvement to some design and front-end templates.
 
