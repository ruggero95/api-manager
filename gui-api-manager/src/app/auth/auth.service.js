import { store } from "../mystore"
import { authApi } from "./auth.api"
export const authService = {
    checkLoginVue: async () => {
        try{
            const token = localStorage.getItem('token')
            if (!token || token == '') {
                return false
            }
            const checkUser = await authApi.checkUser()
            store.state.user = checkUser.data.payload
            if (checkUser.error == "true") {
                localStorage.removeItem('token')
                return false
            }
            return true
        }catch(e){
            return false
        }
       
    },
    logout: async ()=>{
        const result = await authApi.logout()
        if(result.error==false){
            localStorage.removeItem('token')
            return true;
        }
        return false;
    },
}