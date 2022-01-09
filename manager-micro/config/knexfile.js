const knexConfig = {
    client: 'pg',
    connection: { 
        host: process.env.PGHOST,
        port:process.env.PGPORT,
        user: process.env.POSTGRES_USER, 
        database: process.env.POSTGRES_DB,
        password:process.env.POSTGRES_PASSWORD,
    }
};


module.exports = knexConfig