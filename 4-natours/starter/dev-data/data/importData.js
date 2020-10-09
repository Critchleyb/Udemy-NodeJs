const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/tourModel');

dotenv.config({ path: `${__dirname}/../../config.env` });

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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data Successfully loaded!');
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit();
    }
};

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data Successfully deleted!');
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit();
    }
};

if (process.argv[2] === '--import') {
    importData();
}
if (process.argv[2] === '--delete') {
    deleteData();
}

// console.log(process.argv);
