# The Tutorial Changelog

This changelog is ordered in reverse chronological order, meaning that the last changes made will always be on top of the file, so that readers will not have to scroll all the way down with each change.

## Stage 9 - Deployment

[Yeahhh we managed to deploy our app and it works!!!!!](https://i.giphy.com/media/4xpB3eE00FfBm/giphy.webp)

Let's list out what we did in the last stage:

    - We created a cofiguration file that handles our secrets.
    - We set up a database in our mLab account and connected it to our app.
    - We set up our now.json file and deployed our application using now.

## Stage 8: Authentication

In this step we worked on authentication and we updated a lot of stuff. Let's go step by step.

    -  We added a JWT whenever a user was created and we return the token in a header.
    -  We set up a temp /me path for setting up an authenticator function what will let
       requests pass only if the right token is send as a header.
    -  We then moved the whole logic to a seperate middleware function and we used it
       for all the endpoints we would like to be authenticated.
    -  We added password hashing so our passwords our now safely stored.
    -  We added a login endpoint for the users to log in.
    -  We added user roles and an authenticator for the paths that
       should only be accessible from an Admin user.

## Stage 7: Relations

Here we introduces realtions between our data

    - We created a new schema for address
    - We embeded the address schema in our user schema
    - We created a 1-to-many relation between orders and records.
    - We populated the above relation
    - We cleaned out our data by returning only what we needed using select.
    - We played around with our queries using filter, sort and limit.

## Stage 6: Mongoose && Controllers

In this stage we added validation and sanitization on our user model using `express-validator`.

    - We installed express-validator.
    - Based on the express-validator documentation we created some simple rules
      for data validation and sanitization.
    - Once everythings worked as intented, we simplified our code by creating
      a validator middleware method.
    - Then we made our code even more beautiful and dynamic and so 2019 by splitting
      the validation rules into a seperate directory.

## Stage 5: Mongoose && Controllers

In this branch we connected our controllers with our database.  
No more Lowdb.  
Mongoose is the [`future`](https://media.giphy.com/media/R0ulJyO72iuXe/giphy.gif).

    - We updated all endpoints of each model using Mongoose.
    - We deleted lowdb from our package.json
    - Got rid of data folder with lowdb's data file.

## Stage 4: Mongoose && Models && Seeding

In this branch we introduced Mongoose and we created our first models. We then created our first models.

    - We established our database connection in app.js
    - We create our models for our records, users and orders.
    - We set up a virtual for our user model.
    - We wrote a script that will seed the database with some fake users if run.
    - We wrote a script that will purge users if run.

## Stage 3: Routing error and handling

In this branch we expanded our records endpoints and we create new ones for users and orders

    - We created DELETE and PUT for the records model
    - We created GET, POST,`PUT and DELETE for our users model
    - We created GET, POST,`PUT and DELETE for our orders model
    - We wrote a middleware function that performs basis error handling.

## Stage 2: Middleware and CORS

In this branch we created our own middleware functions

    - We created a middleware directory
    - We set up a middleware function that will add headers to each request
    - We incorporated it in our app.

## Stage 1: Mock database and controllers

In this branch we have set up our initial structure for our API

    - We created two simple routes GET and POST for our records data
    - We set up `lowdb` in order to store our data in a file
    - We then updated our routes in order to use `lowdb`
    - We created controllers for our routes in a different directory

## Stage 0: Boilerplate

This branch contains a boilerplate for almost every express server you are going to create.  
This boilerplate consists of:

- Files create by [`npx express-generator`](https://expressjs.com/en/starter/generator.html), using the `--no-view` and `--git` flags, slightly modified and modernised.

### Changes made to `express-generator` files:

- `routes/index.js` and `routes/users.js` have been updated to use `const`
- `app.js` was also updated to use `const`. In addition, comments were added to seperate the file to smaller more easily readable chunks.
