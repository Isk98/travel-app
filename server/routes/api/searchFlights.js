const express = require('express')
const router = express.Router()
const searchFlightsController = require('../../../searchFlightsController')


router.get('/', (req, res) => {
    (new searchFlightsController(req, res)).getFlights()
})

router.get('/cheap', (req, res) => {
    (new searchFlightsController(req, res)).getCheapestFlight()
})


module.exports = router