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
    },
    addPlan: async (name)=>{
        try{
            await managerApi.addPlan(name)            
            await managerService.retrievePlans()
        }catch(e){
            console.log('add plan error')
            console.log(e)
            throw(e)
        }      
        
    },
    deletePlan: async (plan_id)=>{
        try{    
            await managerApi.deletePlan(plan_id)
            await managerService.retrievePlans()
        }catch(e){
            throw(e)
        }
    }

}