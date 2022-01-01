// Dependencies
const express = require('express');

// Init environments
require('dotenv').config();
// Get environments
const PORT = process.env.PORT || 3000;

// Init webserver
const app = express();

// Define the function to manage search requests
async function search_request(req, res) {

    // Manage the request
    try {

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
app.get('/search', search_request);

// Listener
app.listen(PORT, () => {
    console.log(`News microservice listening at http://localhost:${PORT}`);
});
