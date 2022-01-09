const knex = require('./../../config/db')
const constants = require('./../../config/constants')
const planRepository = {
    create: (userID, name, maxRequests, apiKey)=>{
        return knex(constants.TABLE_PLANS).insert({user_id:userID, name:name,max_requests:maxRequests,api_key:apiKey})
        //return connection().query(`INSERT INTO ${constants.TABLE_PLANS}(user_id,name,max_requests,api_key) VALUES ($1,$2,$3,$4)`,[userID, name, maxRequests, apiKey])
    },
    getByApiKey:(apiKey)=>{
        return knex.select().from(constants.TABLE_PLANS).where({api_key:apiKey})
        //return connection().query(`SELECT * FROM ${constants.TABLE_PLANS} WHERE api_key=$1`,[apiKey])
    },
    getByUserID:(userID)=>{
        return knex.select().from(constants.TABLE_PLANS).where({user_id:userID})

        //return connection().query(`SELECT * FROM ${constants.TABLE_PLANS} WHERE user_id=$1`,[userID])
    },
    delete:(planID)=>{
        return knex(constants.TABLE_PLANS).where({ id: planID }).del()
        //return connection().query(`DELETE FROM ${constants.TABLE_PLANS} WHERE id=$1`,[planID])
    }    

}

module.exports = planRepository