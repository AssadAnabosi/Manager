# Manager-App

Manager App Quick walk-through:
* MERN Stack Application
* Worker (normal user) can only view their own logs.
* Supervisor can access bills, payees, cheaques and add workers.
* Administrator can delete workers, set passwords, change permissions and delete Multiple bills in range at a time.
* All users are considered to be workers as well.
* Worker to Logs is One to many relationship.
* Payee to Cheques is One to many relationship.
* Permissions (Access Level) can be set by Administrator after iniaitng a user via user edit page.
* When a worker gets deleted all of his logs gets deleted
* When a payee gets deleted, all cheqeues related to this payee gets set as "Deleted Payee cheques" (cheque.isDelted = true)

# Currently known issues:

* If not redirecting via "Link" then entering from an "href" or typing the url yourself won't get you to the destination (Problem with the behaviour of the protected route)
* Issue with secure cookies

# Important notes:

* Some configuration needed, so take a look at [ENV VARS](https://github.com/AssadAnabosi/Manager#env-vars) below for more info
* Make sure you set the ENV Vars for the admin when you run the app for the first time see [INIT VARS](https://github.com/AssadAnabosi/Manager#init-vars) below for more info

# ENV VARS
* DB_PORT: Mongod port (default: 27017)
* DB_URL : Your Mongo Database URL (default: mongodb://localhost: + DB_PORT / managerDB)
* SECRET: Secret for cookies/sessions (default: ""whatawonderfullsecret!")
* SECURE_COOKIES: Secure property for cookies (default: false) to make it true set SECURE_COOKIES === "true" [DISABLED]
* PORT: Express Server Listening port (auto default: 5000, if changed then proxy must be changed in "/client/package.json" while in dev mode)

# INIT VARS
* ADMIN_EMAIL: default: ""
* ADMIN_USERNAME: default "admin"
* ADMIN_PASSWORD: default "admin"
* ADMIN_PHONE_NUMBER: default ""

# Deploy command
npm install --prefix client && npm run build --prefix client

# API Routes
### Bills

| Method |                               |
|--------|-------------------------------|
| get    | /api/bills?since=&till=       |
| post   | /api/bills                    |
| delete | /api/bills/delete?since=&till |
| get    | /api/bills/:id                |
| put    | /api/bills/:id                |
| delete | /api/bills/:id                |

### Workers

| Method |                      |
|--------|----------------------|
| get    | /api/workers?search= |
| get    | /api/workers/:id     |
| put    | /api/workers/:id     |
| delete | /api/workers/:id     |

### Logs

| Method |                                |
|--------|--------------------------------|
| get    | /api/logs?since=&till=&search= |
| post   | /api/logs                      |
| get    | /api/logs/:id                  |
| put    | /api/logs/:id                  |
| delete | /api/logs/:id                  |
### Payees

| Method |                     |
|--------|---------------------|
| get    | /api/payees?search= |
| post   | /api/payees         |
| get    | /api/payees/:id     |
| put    | /api/payees/:id     |
| delete | /api/payees/:id     |
### Cheques

| Method |                                   |
|--------|-----------------------------------|
| get    | /api/cheques?since=&till=&search= |
| post   | /api/cheques                      |
| get    | /api/cheques/:id                  |
| put    | /api/cheques/:id                  |
| delete | /api/cheques/:id                  |

### General Routes

| Method |                            |
|--------|----------------------------|
| post   | /api/login                 |
| post   | /api/register              |
| post   | /api/checkUsername         |
| get    | /api/logout                |
| patch  | /api/changePassword        |
| patch  | /api/changePassword/:id    |
| patch  | /api/updatePermissions/:id |

P.S: Take a look at the routes and controllers files.

