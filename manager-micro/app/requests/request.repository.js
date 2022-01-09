const knex = require('./../../config/db')
const constants = require('./../../config/constants')
const dayjs = require('dayjs')
const requestRepository = {
    create: (planID) => {
        return knex(constants.TABLE_REQUESTS).insert({
            plan_id: planID,
            date: dayjs().format('YYYY-MM-DD HH:mm:ss')
        })
    },
    getByRequestsByPlanID: (planID) => {
        return knex.select().from(constants.TABLE_REQUESTS).where({ plan_id: planID })
    },
    getByUserId: (userID) => {
        return knex.select().from(`${constants.TABLE_REQUESTS} as R`).leftJoin(`${constants.TABLE_PLANS} AS P`, 'R.plan_id', 'P.id').where("P.user_id", userID)
    },
    getRequestsByIntervalDate: (startDate, endDate, plans) => {
        let plans_id = []
        if (plans) {
            for (let i = 0; i < plans.length; i++) {
                plans_id = [...plans_id, plans[i].id]
            }
        }

        return knex.select().from(constants.TABLE_REQUESTS)
            .whereRaw('DATE(date)>=?', [startDate])
            .whereRaw('DATE(date)<=?', [endDate])
            .whereIn('plan_id', plans_id)
    },
    getRequestsSumByDate: (startDate, endDate, plans) => {
        //SELECT sum(id/id),DATE(date) FROM requests group by DATE(date) ORDER BY DATE
        let plans_id = []
        if (plans) {
            for (let i = 0; i < plans.length; i++) {
                plans_id = [...plans_id, plans[i].id]
            }
        }

        return  knex.select(knex.raw('sum(id/id)'), knex.raw('DATE(date)')).from(constants.TABLE_REQUESTS)
            .whereRaw('DATE(date)>=?', [startDate])
            .whereRaw('DATE(date)<=?', [endDate])
            .whereIn('plan_id', plans_id)
            .groupByRaw('DATE(date)')
            .orderBy('date')
           },
    deleteByPlanId: (planID) => {
        return knex(constants.TABLE_REQUESTS).where({ plan_id: planID }).del()
    }
}

module.exports = requestRepository