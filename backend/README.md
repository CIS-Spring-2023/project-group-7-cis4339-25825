# Backend

This implementation is for NodeJS based on [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/) and uses [mongoose](https://mongoosejs.com/) as the ODM.

## Project setup

    npm install

### Before startup
You need a MongoDB database ready.

Make sure you have a collection named 'org' in your database that contains at least one organization with the orgid listed in your environment variable (see below).

Setup a .env file with the following variables: MONGO_URL, PORT, ORG, and JWT_SECRET

    MONGO_URL= that is the Mongo URL connection string
    PORT= e.g.3000
    ORG= that is the orgid (as a string)
    JWT_SECRET=this can be a randomly generated string. It is used to verify JWT tokens

### Compiles and hot-reloads for development

    npm start

## Postman Documentation

Can be found at <https://documenter.getpostman.com/view/19551705/2s93eU2EDv>


The JWT token contains information about the user's organization. Whenever an API call is made that requires a specific organization. It is taken from the JWT token.
