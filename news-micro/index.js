// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const CurrentsAPI = require('currentsapi');

// Init environments
require('dotenv').config();
// Get environments
const PORT = process.env.PORT || 3000;

// Init webserver
const app = express();
// Init body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Init the NEWS
const currentsapi = new CurrentsAPI(process.env.CURRENTS_API_KEY);

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
        const keywords = req.body.q || req.query.q || '';
        const lang = req.body.lang || req.query.lang || 'en'; // default: en
        const country = req.body.country || req.query.country || 'US'; // default: US

        // Retrieve the data
        const response = await currentsapi.search({
            // more info: https://currentsapi.services/en/docs/search
            keywords: keywords,
            language: lang,
            country: country
        });

        // Check the result
        if (!response.news) {
            // Something went wrong
            res.status(response.status || 404).json({
                code: response.status || 404,
                text: 'Something went wrong with the News API',
                data: {}
            });
        }
        else {
            // Reply with the result
            res.status(200).json({
                code: 200,
                text: 'News successfully downloaded',
                data: response
            });
        }

    } catch (error) {
        // Log the error
        console.log('Something went wrong. Error: ', error); 
        // Reply 
        res.status(505).json({
            code: 505,
            text: 'Internal Server Error',
            data: {}
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
