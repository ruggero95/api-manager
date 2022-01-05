import axios from "axios"
import { env } from "../config/const"
import { utils } from "../config/utils"
export const managerApi = {
    getPlansByUserID:(user_id)=>{
        console.log(localStorage.getItem('token'))
        console.log(utils.getFullHeader(localStorage.getItem('token')))
        return axios.get(`${env.api_manager_backend}/plans/user`,utils.getFullHeader(localStorage.getItem('token'))).then((response)=>{
            return utils.hanldeAxiosResponse(response, (payload)=>{
               return payload.data ? payload.data : []
            })
        }).catch(utils.handleAxiosError)
    },
    getWeeklyRequests:()=>{
        
    }
}