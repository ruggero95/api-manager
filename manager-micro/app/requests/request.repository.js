const db = require('./../../config/db')
const constants = require('./../../config/constants')
const dayjs = require('dayjs')
const requestRepository = {
    create:(planID)=>{
        return db.query(`INSERT INTO ${constants.TABLE_REQUESTS}(plan_id,date) VALUES ($1,$2)`,[planID,dayjs().format('YYYY-MM-DD HH:mm:ss')])
    },
    getByRequestsByPlanID:(planID)=>{
        return db.query(`SELECT * FROM ${constants.TABLE_REQUESTS} WHERE plan_id=$1`,[planID])
    },
    getRequestsByIntervalDate:(startDate, endDate, plansID=null)=>{
        let query = `SELECT * FROM ${cost.TABLE_REQUESTS} where DATE(date)>$1 AND DATE(date)<$2`
        let values = [startDate, endDate]
        if(plansID){
            query += ' AND plan_id IN $3'
            values = [...values, plansID]
        }
        return db.query(query, values)
    }    
}

module.exports = requestRepository