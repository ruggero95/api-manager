import { authApi } from "./auth.api"
export const authService = {
    checkLoginVue: async () => {
        const token = localStorage.getItem('token')
        if (!token || token == '') {
            return false
        }
        const checkUser = await authApi.checkUser()
        if (checkUser.error == "true") {
            return false
        }
        return true
    }
}