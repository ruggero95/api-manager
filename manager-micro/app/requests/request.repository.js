const { connection } = require('./../../config/db')
const constants = require('./../../config/constants')
const dayjs = require('dayjs')
const requestRepository = {
    create: (planID) => {
        return connection().query(`INSERT INTO ${constants.TABLE_REQUESTS}(plan_id,date) VALUES ($1,$2)`, [planID, dayjs().format('YYYY-MM-DD HH:mm:ss')])
    },
    getByRequestsByPlanID: (planID) => {
        return connection().query(`SELECT * FROM ${constants.TABLE_REQUESTS} WHERE plan_id=$1`, [planID])
    },
    getByUserId: (userID) => {
        return connection().query(`SELECT * FROM ${constants.TABLE_REQUESTS} AS R LEFT JOIN ${constants.TABLE_PLANS} AS P ON R.plan_id=P.id WHERE P.user_id=$1`, [userID])
    },
    getRequestsByIntervalDate: (startDate, endDate, plans = null) => {
        let query = `SELECT * FROM ${constants.TABLE_REQUESTS} where DATE(date)>$1 AND DATE(date)<$2`
        let values = [startDate, endDate]
        if (plans) {
            let plans_id = []
            for (let i = 0; i < plans.length; i++) {
                plans_id = [...plans_id, plans[i].id]
            }
            values = [...values, ...plans_id]

            query += ` AND plan_id IN (${plans_id.join(',')})`

        }
        return connection().query(query, values)
    },
    getRequestsSumByDate: (startDate, endDate, plans) => {
        //SELECT sum(id/id),DATE(date) FROM requests group by DATE(date) ORDER BY DATE
        let query = `SELECT sum(id/id),DATE(date) FROM ${constants.TABLE_REQUESTS} where DATE(date)>=$1 AND DATE(date)<=$2`
        let values = [startDate, endDate]
        let startV = (values.length+1)
        let plans_id_n = []
        for (let i = 0; i < plans.length; i++) {
            values = [...values, plans[i].id]
            plans_id_n = [...plans_id_n, `$${(i+startV)}`]
        }
        query += ` AND plan_id IN (${plans_id_n.join(',')})`

        query += ' GROUP BY DATE(date) ORDER BY date'
        return connection().query(query, values)
    },
    deleteByPlanId: (planID) => {
        return connection().query(`DELETE FROM ${constants.TABLE_REQUESTS} WHERE plan_id=$1`, [planID])
    }
}

module.exports = requestRepository