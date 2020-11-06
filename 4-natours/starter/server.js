const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! Shutting down ...');
    console.error(err.name, err.message);
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! Shutting down ...');
    console.error(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

let DB = null;
if (process.env.DATABASE_HOST === 'cloud') {
    DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
} else {
    DB = process.env.DATABASE_LOCAL;
}

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB Connection Successful'));

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(
        `App running on port ${port} in ${process.env.NODE_ENV} mode using ${process.env.DATABASE_HOST} database...`
    );
});
