const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/location-info-more', async (req, res) => {
    const { lat, lon } = req.body;
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
            params: {
                format: 'json', // Specify the response format
                lat: lat,
                lon: lon
            }
        });

        // Check if response data contains any results
        if (response.data && response.data.hasOwnProperty('error')) {
            // If the response contains an error property, return it as an error response
            res.status(400).json({ message: response.data.error });
        } else {
            // If the response contains results, return the data to the client
            res.json(response.data);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error when getting service data', error: error.message });
    }
});



// All routes export
module.exports = router
