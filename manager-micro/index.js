// Dependencies
const got = require('got');
const express = require('express');
const bodyParser = require('body-parser');

// Init webserver
const app = express();
// Init body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Init environments
require('dotenv').config();
// Get environments
const PORT = process.env.MANAGER_PORT || 4000;

// Define the function to call the news microservice
async function get_news(params) {
  // Get news-micro address
  const host = process.env.NEWS_HOST || 'http://localhost';
  const port = process.env.NEWS_PORT || '3000';
  // Call the news-micro
  const {data} = await got.post(host + ':' + port + '/search', {
    json: {
      keywords: params.keywords || '',
      lang: params.lang || '',
      country: params.country || ''
    }
  }).json();
  // Return the data
  return data;  
}

// Define the function to manage the received request
async function manage_request(req, res) {
  // Manage the request
  try {

    // Check the request
    if (!req || (!req.body && !req.query)) {
      res.status(404).json({ code: 404, text: 'No request data found', data: {} });
      return;
    }

    // Get the request data
    const api_key = req.body.api_key || req.query.api_key;
    const keywords = req.body.q || req.query.q || '';
    const lang = req.body.lang || req.query.lang || 'en'; // default: en
    const country = req.body.country || req.query.country || 'US'; // default: US

    // Check the api_key
    if (!api_key) {
      res.status(404).json({ code: 404, text: 'API KEY (param "api_key") is required', data: {} });
      return;
    }

    // Check the plan
    // @TODO: Check if api_key is valid and if it is possible to make other requests

    // Retrieve the data
    const news = await get_news({
      keywords: keywords,
      lang: lang,
      country: country      
    });

    // Count the request
    // @TODO: Save the request done
    // @MEMO: Count only if it's 200 OK.

    // Check the result
    if (news.code != 200) {
      // Error in the response
      res.status(news.code).json({
        code: news.code || 500,
        text: news.text || 'Something went wrong',
        data: {}
      });
    }
    else if (!news.data) {
      // Response is OK but no data downloaded
      res.status(news.code).json({
        code: 404,
        text: 'No news found',
        data: {}
      });
    }
    else {
      // Reply with the result
      res.status(200).json({
        code: 200,
        text: 'News data successfully downloaded',
        data: news.data
      });
    }

  } catch (error) {
    // Log the error
    console.log('Something went wrong. Error: ', error); 
    // Reply 
    res.status(500).json({
      code: 500,
      text: 'Internal Server Error',
      data: {}
    });
  }
}

// Routing
app.get('/', manage_request);
app.post('/', manage_request);

// Listener
app.listen(PORT, () => {
  console.log(`Manager microservice listening at http://localhost:${PORT}`);
});
