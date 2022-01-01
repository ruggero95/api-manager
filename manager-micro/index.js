// Dependencies
const express = require('express');

// Init webserver
const app = express();

// Init environments
require('dotenv').config();
// Get environments
const PORT = process.env.PORT || 4000;

// Routing
app.get('/', (req, res) => {
  res.send('Manager is UP!');
})

// Listener
app.listen(PORT, () => {
  console.log(`Manager microservice listening at http://localhost:${PORT}`);
});
