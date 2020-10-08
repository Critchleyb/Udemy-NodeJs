const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {
    // res.status(200).json({
    //     status: 'success',
    //     requestTime: req.requestTime,
    //     results: tours.length,
    //     data: {
    //         tours,
    //     },
    // });
};

exports.getTour = (req, res) => {
    // return res.status(200).json({
    //     status: 'success',
    //     data: {
    //         tour: tours[req.tourIndex],
    //     },
    // });
};

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid Data Sent', //TODO meaningful error
        });
    }
};

exports.patchTour = (req, res) => {
    // const updatedTour = {
    //     // ...tours[req.tourIndex],
    //     ...req.body,
    // };
    // tours[req.tourIndex] = updatedTour;
    // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    //     if (err) {
    //         res.status(500).json({
    //             status: 'error',
    //             message: 'Error writing file',
    //         });
    //     }
    //     res.status(201).json({
    //         status: 'success',
    //         data: {
    //             updatedTour,
    //         },
    //     });
    // });
};

exports.deleteTour = (req, res) => {
    //TODO  DELETE LOGIC WOULD GO HERE
    res.status(204).json({
        status: 'success',
        data: null,
    });
};
