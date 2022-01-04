const axios = require('axios')
const axiosUtility = require('./../../config/axiosUtility')
const { AUTH_HOST, AUTH_PORT } = require('./../../config/constants')
const authApi = {
    checkToken: (token) => {
        return axios.post(AUTH_HOST + ':' + AUTH_PORT + '/auth/check-user',
            {},
            axiosUtility.getFullHeader(token)
        ).then((resAxios) => { 
            return axiosUtility.hanldeAxiosResponse(resAxios, (payload)=>{
                return payload
            })
        }).catch(axiosUtility.handleAxiosError);
    }
}

module.exports = authApi