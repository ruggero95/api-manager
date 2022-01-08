import axios from "axios"
import { utils } from "../config/utils"
import {env} from "@/app/config/const"
export const newsApi = {
    getNews: (query, api_key) => {
        return axios.get(`${env.api_manager_backend}/news?q=${query}`,utils.getFullHeader(api_key)
        ).then((response) => {
            return utils.hanldeAxiosResponse(response, (payload) => {
                return payload.data ? payload.data : []
            })
        }).catch(utils.handleAxiosError)
    }
}

