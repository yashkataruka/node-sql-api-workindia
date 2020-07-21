# node-sql-api-workindia

The repository contains the code for the API, that contains 4 endpoints as specified in the questions statement.

TASK:
Notes App

ENDPOINTS:

1) /app/user/ that requires the user to send username and password as the body and in return gives us a status of the response. 
              The password is encrypted using nodeJS package 'bcrypt' and stored in the MySQL database. the username is the PRIMARY KEY which needs to be unique.

2) /app/user/auth that requires the user to send username and password as the body and in return gives us the status of login.
                  the password is compared using the bcrypt.verify function that verifies the password sent as a body with the password stored in the MySQL database.
                  If the login is successful, it gives us a status of 200 along with status: success.
                  
3) /app/site that requires the user to send the userId generated after login as a header and a particular note as a body. The note of that particular user is stored in an                      Encrypted form, along with the userId of the user.

4) /app/site/list requires the user to send the userId in the x-www-form-urlencoded format (no raw body is send). The response gives us the notes of that particular user with the                    userId sent.

MySQL Database:

The database contains 2 table.

1) users: It contains 3 columns (userId, which is auto-generated INTEGER, username, provided by the user PRIMARY KEY, and password, provided by the user but stored in an encrypted format.) 

2) notes: It also contains 3 columns (serial no., auto-increment INTEGER PRIMARY KEY , userId of the user logged in, note of the user which is encrypted using cipher package provided in nodeJS.)

The screenshots of the database and the POSTMAN results are present in the scnreenshot folder.
