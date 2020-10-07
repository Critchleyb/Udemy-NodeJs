const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkID = (req, res, next, val) => {
    const tourIndex = tours.findIndex((el) => {
        return el.id === +val;
    });
    if (tourIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
    req.tourIndex = tourIndex;
    next();
};

exports.checkBody = (req, res, next) => {
    if (req.body.name && req.body.price) {
        next();
    } else {
        return res.status(400).json({
            status: 'fail',
            message: 'Body is missing name or price key',
        });
    }
};

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestTime: req.requestTime,
        results: tours.length,
        data: {
            tours,
        },
    });
};

exports.getTour = (req, res) => {
    return res.status(200).json({
        status: 'success',
        data: {
            tour: tours[req.tourIndex],
        },
    });
};

exports.createTour = (req, res) => {
    //   console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = {
        id: newId,
        ...req.body,
    };

    // Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        if (err) {
            res.status(500).json({
                status: 'error',
                message: 'Error writing file',
            });
        }
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    });
};

exports.patchTour = (req, res) => {
    const updatedTour = {
        ...tours[req.tourIndex],
        ...req.body,
    };
    tours[req.tourIndex] = updatedTour;
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        if (err) {
            res.status(500).json({
                status: 'error',
                message: 'Error writing file',
            });
        }
        res.status(201).json({
            status: 'success',
            data: {
                updatedTour,
            },
        });
    });
};

exports.deleteTour = (req, res) => {
    //TODO  DELETE LOGIC WOULD GO HERE
    res.status(204).json({
        status: 'success',
        data: null,
    });
};
