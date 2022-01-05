import axios from "axios"
import { env } from "../config/const"
import { utils } from "../config/utils"
export const managerApi = {
    getPlansByUserID:(user_id)=>{        
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
    }
}