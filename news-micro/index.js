// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
var tiny = require('tiny-json-http');

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
            res.status(400).json({ code: 400, text: 'Bad request: no request data found', data: [] });
            return;
        }

        // Get the request data
        const keywords = req.body.q || req.query.q || '';
        const lang = req.body.lang || req.query.lang || 'en'; // default: en
        const country = req.body.country || req.query.country || 'US'; // default: US

        // Retrieve the data
        var url = 'https://api.currentsapi.services/v1/search'
                + '?keywords=' + keywords 
                + '&language=' + lang 
                + '&country=' + country
                + '&apiKey=' + process.env.CURRENTS_API_KEY;
        const response = await tiny.get({url});

        // Check the result
        if (!response || !response.body || !response.body.news) {
            // Something went wrong
            res.status(response.body.status || 404).json({
                code: response.body.status || 404,
                text: 'No news found',
                data: []
            });
        }
        else {
            // Reply with the result
            res.status(200).json({
                code: 200,
                text: 'News successfully downloaded',
                data: response.body.news
            });
        }

    } catch (error) {
        // Log the error
        console.log('Something went wrong. Error: ', error); 
        // Reply 
        res.status(500).json({
            code: 500,
            text: 'Internal Server Error',
            data: []
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
