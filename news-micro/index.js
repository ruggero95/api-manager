// Dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Init environments
require('dotenv').config();
// Get environments
const PORT = process.env.PORT || 3000;

// Init webserver
const app = express();
// Init body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Define the function to manage search requests
async function search_request(req, res) {

    // Manage the request
    try {

        // Check the request
        if (!req || (!req.body && !req.query)) {
            res.status(404).json({ code: 404, text: 'No request data found', data: {} });
            return;
        }

        // Get the request data
        const query = req.body.q || req.query.q;
        const lang = req.body.lang || req.query.lang || 'en'; // default: en
        const country = req.body.country || req.query.country || 'US'; // default: US

        // Check the data 
        if (!query) {
            res.status(404).json({ code: 404, text: 'No query found', data: {} });
            return;
        }

        // Reply with the result
        res.status(200).json({
            code: 200,
            text: 'News successfully downloaded',
            data: {}
        });

    } catch (error) {
        // Log the error
        console.log('Something went wrong. Error: ', error); 
        // Reply 
        res.status(505).json({
            code: 505,
            text: 'Internal Server Error',
            data: null
        });
    }
}

// Routing 
app.get('/search', search_request);
app.post('/search', search_request);

// Listener
app.listen(PORT, () => {
    console.log(`News microservice listening at http://localhost:${PORT}`);
});
