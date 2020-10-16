const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

const app = express();

/////////////////////////////////////////////////
//////////// MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

/////////////////////////////////////////////////
//////////// ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`URL: ${req.originalUrl} not found`, 404)); //If a param is used inside next(), it will always be considered an error.
});

app.use(globalErrorHandler); //If the function passed in to app.use has 4 params it is auto used as the global error handler middleware.

module.exports = app;
