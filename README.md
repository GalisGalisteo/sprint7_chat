# Dice-game

![github repo size](https://img.shields.io/github/repo-size/GalisGalisteo/sprint7_chat)


## BACK END

To start the server side navigate to the client folder and create a .env file with the following content:

```env
DATABASE="Chat"
PORT="8000"
FRONT_PORT="5174"

# MongoDB connection
MONGO_URI='mongodb://localhost:27017/dice-game?retryWrites=true&w=majority'
NODE_ENV="development"

# JWT
JWT_SECRET="10"

# GOOGLE AUTH
GOOGLE_CLIENT_ID="206573613197-qv13t9rnt329j3cg241h56jjej2qeoih.apps.googleusercontent.com"
GOOGLE_SECRET="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"
GOOGLE_REDIRECT_URL="/api/auth/google/callback"

# EXPRESS-SESSION
EXPRESS_SESSION_SECRET='vengaqueconsigoponergoogleauth'
```

Then run the following commands:

```bash
npm install
```

To run the app server, run:

```bash
npm run dev
```


### API DOCUMENTATION

if you .env is set with port 800 if not just adjust the port. You can access the api documentation with the following end points:

```bash
http://localhost:8012/api/user
```

Register with an email, mail and password.


```bash
http://localhost:8012/api/login
```

Login with the email and password you registered with.


```bash
http://localhost:8012/api//message/:user_id
```

Write a message to de chat from the user logged in.


```bash
http://localhost:8012/api//messages
```

Retrieve all the messages from all users.


## FRONT END

To start the server side navigate to the client folder and run the following command:

```bash
npm install
```

Then navigate to _./src/config/config.ts_ and set the same PORT you are using in the server (for example, 8000).

To run the app client, run:

```bash
npm run dev
```

## Want to use Google Authentification?

Check the branch _google-auth_ and read the _README.md_ file.