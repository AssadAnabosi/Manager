# Implementing React.js to this branch

# Manager
Manager App Quick walk-through:
* Worker (normal user) can only view their own logs.
* Admin can access bills, payees, cheaques and add workers.
* Super can set passwords, delete workers and change permissions.
* All users including admin and super are considered workers.

# Currently known issues:

* Paginign is now supported in the backend (kinda)
* still no quries implementation to anything yet

# Important notes:

* Make sure you set the ENV Vars for the admin when you run the app for the first time see [INIT VARS](https://github.com/AssadAnabosi/Manager#init-vars) below for more info
* Worker to Logs is One to many relationship.
* Payee to Cheques is One to many relationship.
* Admins and Supers can be set via the edit worker page

# Env Var
* DB_PORT: Mongod port (default: 27017)
* DB_URL : Your Mongo Database URL (default: mongodb://localhost: + DB_PORT / managerDB)
* SECRET: Secret for cookies/sessions (default: ""whatawonderfullsecret!")
* SECURE_COOKIES: Secure property for cookies (default: false) to make true set Key Value === "true"
* PORT: The port the app will be listening at (auto default: 80)

# INIT VARS
* ADMIN_EMAIL: default: ""
* ADMIN_USERNAME: default "admin"
* ADMIN_PASSWORD: default "admin"
* ADMIN_PHONE_NUMBER: default ""
