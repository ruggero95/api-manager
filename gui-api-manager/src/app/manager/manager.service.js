import { store } from "@/app/mystore"
import { managerApi } from "./manager.api"
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
    }

}