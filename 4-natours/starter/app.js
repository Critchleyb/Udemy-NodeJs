const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours,
        },
    });
};

const getTour = (req, res) => {
    const tour = tours.find((el) => {
        return el.id === +req.params.id;
    });
    if (tour != null) {
        return res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } else {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
};

const createTour = (req, res) => {
    //   console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    });
};

const patchTour = (req, res) => {
    const tourIndex = tours.findIndex((el) => {
        return el.id === +req.params.id;
    });
    if (tourIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
    const updatedTour = {
        ...tours[tourIndex],
        ...req.body,
    };
    tours[tourIndex] = updatedTour;
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        res.status(201).json({
            status: 'success',
            data: {
                updatedTour,
            },
        });
    });
};

const deleteTour = (req, res) => {
    const tourIndex = tours.findIndex((el) => {
        return el.id === +req.params.id;
    });
    if (tourIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
    // DELETE LOGIC WOULD GO HERE
    res.status(204).json({
        status: 'success',
        data: null,
    });
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', patchTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(patchTour).delete(deleteTour);

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
