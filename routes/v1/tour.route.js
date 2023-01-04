const express = require('express');
const app = express.Router();
const tourControllers = require('../../controllers/tour.controller')

app.get('/', tourControllers.allTour)
app.get('/trending', tourControllers.trendingTour)
app.get('/cheapest', tourControllers.cheapestTour)
app.post('/', tourControllers.createTour)
app.patch('/:id', tourControllers.updateTour)
app.get('/:id', tourControllers.detailsTour)

module.exports = app;