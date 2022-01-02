// Dependencies
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

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
async function get_news(keywords, lang, country) {
  // Get news-micro address
  const host = process.env.NEWS_HOST || 'http://localhost';
  const port = process.env.NEWS_PORT || '3000';
  // Call the news-micro
  let response = null;
  try {
    response = await axios.post(host + ':' + port + '/search', {
      keywords: keywords || '',
      lang: lang || '',
      country: country || ''
    });
  } catch (error) {
    console.log('Manager fails to get the news. Error: ', error);
  }
  // Return the data
  return (response && response.data) ? response.data : null;
}

// Define a function to return data of an API KEY
async function get_plan(api_key) {

  // Init database
  const client = new Client();
  // Connect to database
  client.connect();

  // Get plan data
  let res = null;
  try {
    res = await client.query('SELECT user_id AS user, user_name AS name, max_requests AS maxr FROM plans WHERE api_key = $1', [api_key]);
  } catch (error) {
    console.log('Failed to get plan data. Error: ', error);
  }

  // Close the connectio
  client.end();

  // Return the plan data
  return {
    user_id: res.rows[0].user,
    user_name: res.rows[0].name,
    max_requests: res.rows[0].maxr,
  }
}

// Define the function to manage the received request
async function manage_request(req, res) {
  // Manage the request
  try {

    // Check the request
    if (!req || (!req.body && !req.query)) {
      res.status(404).json({ code: 404, text: 'No request data found', news: [] });
      return;
    }

    // Get the request data
    const api_key = req.body.api_key || req.query.api_key;
    const keywords = req.body.q || req.query.q || '';
    const lang = req.body.lang || req.query.lang || 'en'; // default: en
    const country = req.body.country || req.query.country || 'US'; // default: US

    // Check the api_key
    if (!api_key) {
      res.status(401).json({ code: 401, text: 'Unauthorized: api_key is required', news: [] });
      return;
    }

    // Check the plan
    const plan = await get_plan(api_key);
    console.log('Plan: ', plan);
    // @TODO: Check if api_key is valid and if it is possible to make other requests

    // Retrieve the data
    const news = await get_news(keywords, lang, country);

    // Count the request
    // @TODO: Save the request done
    // @MEMO: Count only if it's 200 OK.
    const username = plan.user_name;
    const max_requests = plan.max_requests;
    const remaining_requests = 0;

    // Generate auth for response
    const auth = {
      user: username,
      api_key: api_key, 
      requests: {
        limit: max_requests,
        remaining: remaining_requests
      }
    }

    // Check the result
    if (!news || news.code != 200) {
      // Error in the response
      res.status(news.code).json({
        code: news.code || 500,
        text: news.text || 'Something went wrong',
        auth: auth,
        news: []
      });
    }
    else if (!news.data) {
      // Response is OK but no data downloaded
      res.status(news.code).json({
        code: 404,
        text: 'No news found',
        auth: auth,
        news: []
      });
    }
    else {
      // Reply with the result
      res.status(200).json({
        code: 200,
        text: 'News data successfully downloaded',
        auth: auth,
        news: news.data
      });
    }

  } catch (error) {
    // Log the error
    console.log('Something went wrong. Error: ', error); 
    // Reply 
    res.status(500).json({
      code: 500,
      text: 'Internal Server Error',
      auth: {},
      news: []
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
