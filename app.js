// External Dependencies
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Internal Dependencies
const indexRouter = require('./routes/index');
const recordsRouter = require('./routes/records');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const setCORS = require('./middleware/setCORS');
const { throw400, handleErrors } = require('./middleware/errors');
const env = require('./config/environment');

// Initialization
const app = express();
// Initialize Mongoose

mongoose
    // .connect('mongodb://127.0.0.1:27017/record-shop', {
    .connect(env.db, {
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .catch(err => console.error(err));
mongoose.connection.on('open', () => console.log('MongoDB running'));
mongoose.connection.on('error', (err) => console.error(err));

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(setCORS);

// Routes
app.use('/', indexRouter);
app.use('/api/records', recordsRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);

// Throw a 400 if no route is matched
app.use(throw400);

// Error Handling
app.use(handleErrors);

module.exports = app;
