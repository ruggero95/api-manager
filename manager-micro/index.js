const app = require('./app')
const {MANAGER_PORT} = require('./config/constants')
app.listen(MANAGER_PORT, () => {
    console.log(`Manager microservice listening at http://localhost:${MANAGER_PORT}`);
});
  