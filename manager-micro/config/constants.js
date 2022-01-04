const constants = Object.freeze({
    NEWS_HOST : process.env.NEWS_HOST || 'http://localhost',
    NEWS_PORT : process.env.NEWS_PORT || '3000',
    MANAGER_PORT : process.env.MANAGER_PORT || 4000,
    AUTH_HOST: process.env.AUTH_HOST || 'http://localhost',
    AUTH_PORT: process.env.AUTH_PORT || '5000',
    TABLE_PLANS:'plans',
    TABLE_REQUESTS:'requests'
})

module.exports = constants