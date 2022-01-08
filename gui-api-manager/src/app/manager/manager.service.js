import { store } from "@/app/mystore"
import { managerApi } from "./manager.api"
import dayjs from "dayjs"
export const managerService = {
    retrievePlans: async () => {
        const plans = await managerApi.getPlansByUserID()
        store.state.plans = plans
        return
    },
    retrieveRequests: async () => {
        const requests = await managerApi.getRequests()
        store.state.requests = requests
        return
    },
    addPlan: async (name) => {
        try {
            await managerApi.addPlan(name)
            await managerService.retrievePlans()
        } catch (e) {
            console.log('add plan error')
            console.log(e)
            throw (e)
        }

    },
    deletePlan: async (plan_id) => {
        try {
            await managerApi.deletePlan(plan_id)
            await managerService.retrievePlans()
        } catch (e) {
            throw (e)
        }
    },
    getRandomInt() {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    getWeeklySum: async () => {
        const start = dayjs().startOf('week').add(1, 'day')
        const end = dayjs().endOf('week').add(1, 'day')
        let weeklySum = await managerApi.getWeeklyRequestSum(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
        for (let i = 0; i < 7; i++) {
            const day = (start.add(i, 'day').format('YYYY-MM-DD'))
            let d = weeklySum.filter((e) => {
                const data = dayjs(e.date).format('YYYY-MM-DD')
                if (data == day) {
                    e.date = e.date ? dayjs(e.date).format('YYYY-MM-DD') : ''
                    e.sum = parseInt(e.sum)
                    return e
                }
            })
            if (!d || d.length == 0) {
                weeklySum = [...weeklySum, {
                    date: day,
                    sum: 0
                }]
            } else {
                d.date = dayjs(d.date).format('YYYY-MM-DD')
                d.sum = parseInt(d.sum)
            }

        }
        weeklySum.sort(function (a, b) {
            const dateA = dayjs(a.date)
            const dateB = dayjs(b.date)
            if (dateA < dateB) {
                return -1
            } else if (dateA > dateB) {
                return 1
            }
            return 0
        })  
        store.state.chartData = weeklySum
        
        return
    }

}