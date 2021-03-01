#!C:\Python27\python.exe
# Import modules for CGI handling
import cgi, cgitb
# Create instance of FieldStorage
form = cgi.FieldStorage()
# Get data from fields
rawImage = form.getvalue('rawImage')
print("Content-type:text/html")
print
print("")
print("")
print("Hello - Second CGI Program")
print("")
print("")
print("
   Hello %s
   " % (rawImage))
print("")
print("")