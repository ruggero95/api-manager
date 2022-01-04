const db = require('./../../config/db')
const constants = require('./../../config/constants')
const dayjs = require('dayjs')
const requestRepository = {
    create:(planID)=>{
        return db.query(`INSERT INTO ${constants.TABLE_REQUESTS}(plan_id,date) VALUES ($1,$2)`,[planID,dayjs().format('YYYY-MM-DD HH:mm:ss')])
    },
    getByRequestsByPlanID:(planID)=>{
        return db.query(`SELECT * FROM ${constants.TABLE_REQUESTS} WHERE plan_id=$1`,[planID])
    }    
}

module.exports = requestRepository