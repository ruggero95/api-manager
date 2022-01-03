import { authApi } from "./auth.api"
export const authService = {
    checkLoginVue: async () => {
        try{
            const token = localStorage.getItem('token')
            if (!token || token == '') {
                return false
            }
            const checkUser = await authApi.checkUser()
            if (checkUser.error == "true") {
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
    }

}