import {store} from "@/app/mystore"
import { managerApi } from "./manager.api"
export const managerService = {
    retrievePlans: async ()=>{
        const plans = await managerApi.getPlansByUserID(store.state.user.id)
        store.state.plans = plans
        console.log(store)
        return
    }
}