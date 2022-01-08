import axios from "axios"
import { env } from "../config/const"
import { utils } from "../config/utils"
export const managerApi = {
    getPlansByUserID:()=>{        
        return axios.get(`${env.api_manager_backend}/plans/user`,utils.getFullHeader(localStorage.getItem('token'))).then((response)=>{
            return utils.hanldeAxiosResponse(response, (payload)=>{
               return payload.data ? payload.data : []
            })
        }).catch(utils.handleAxiosError)
    },
    getRequests:()=>{
        return axios.get(`${env.api_manager_backend}/plans/requests`,utils.getFullHeader(localStorage.getItem('token'))).then((response)=>{
            return utils.hanldeAxiosResponse(response, (payload)=>{
               return payload.data ? payload.data : []
            })
        }).catch(utils.handleAxiosError)
    },
    addPlan:(plan_name)=>{
        return axios.post(`${env.api_manager_backend}/plans/add`,{name:plan_name},utils.getFullHeader(localStorage.getItem('token'))).then((response)=>{
            return utils.hanldeAxiosResponse(response, (payload)=>{
                if(payload.error){
                    throw(new Error(payload.message))
                }
               return true
            })
        }).catch(utils.handleAxiosError)
    },
    deletePlan:(plan_id)=>{
        return axios.post(`${env.api_manager_backend}/plans/delete`,{plan_id:plan_id},utils.getFullHeader(localStorage.getItem('token'))).then((response)=>{
            return utils.hanldeAxiosResponse(response, (payload)=>{
                if(payload.error){
                    throw(new Error(payload.message))
                }
               return true
            })
        }).catch(utils.handleAxiosError)
    },
    getWeeklyRequestSum:(start_date, end_date)=>{
        return axios.get(`${env.api_manager_backend}/plans/requests/byDateSum?start_date=${start_date}&end_date=${end_date}`,utils.getFullHeader(localStorage.getItem('token'))).then((response)=>{
            return utils.hanldeAxiosResponse(response, (payload)=>{
               return payload.data ? payload.data : []
            })
        }).catch(utils.handleAxiosError)
    }

}