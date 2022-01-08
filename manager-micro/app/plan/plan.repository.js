const {connection} = require('./../../config/db')
const constants = require('./../../config/constants')
const planRepository = {
    create: (userID, name, maxRequests, apiKey)=>{
        return connection().query(`INSERT INTO ${constants.TABLE_PLANS}(user_id,name,max_requests,api_key) VALUES ($1,$2,$3,$4)`,[userID, name, maxRequests, apiKey])
    },
    getByApiKey:(apiKey)=>{
        return connection().query(`SELECT * FROM ${constants.TABLE_PLANS} WHERE api_key=$1`,[apiKey])
    },
    getByUserID:(userID)=>{
        return connection().query(`SELECT * FROM ${constants.TABLE_PLANS} WHERE user_id=$1`,[userID])
    },
    delete:(planID)=>{
        return connection().query(`DELETE FROM ${constants.TABLE_PLANS} WHERE id=$1`,[planID])
    }    

}

module.exports = planRepository