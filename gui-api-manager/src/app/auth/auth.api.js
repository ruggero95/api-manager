import axios from "axios"
import { env } from "../config/const"
import { utils } from "../config/utils"
export const authApi = {
    login(username, password){
        return axios.post(`${env.auth_backend}/auth/login`,{username:username,password:password}).then((response)=>{
            return utils.hanldeAxiosResponse(response, (payload)=>{
                console.log(payload)
                localStorage.setItem('token',payload.data.token)
                return payload.token
            })
        }).catch(utils.handleAxiosError)
    },
    checkUser(){
        return axios.post(`${env.auth_backend}/auth/check-user`,{},utils.getFullHeader(localStorage.getItem('token'))).then((response)=>{
            return utils.hanldeAxiosResponse(response, (payload)=>{
                return payload
            })
        }).catch(utils.handleAxiosError)
    },
    logout(){
        return axios.post(`${env.auth_backend}/auth/logout`,{},utils.getFullHeader(localStorage.getItem('token'))).then((response)=>{
            return utils.hanldeAxiosResponse(response, (payload)=>{
                return payload
            })
        }).catch(utils.handleAxiosError)
    },    
}