const axiosUtility = {
    getTokenHeader: (token) => {
        return { Authorization: `Bearer ${token}` }
    },
    getFullHeader: (token) => {
        return {
            headers: {
                'Content-Type': 'application/json',
                ...axiosUtility.getTokenHeader(token)
            }
        }
    },
    handleAxiosError: (error) => {
        console.log('axios error')
        if(error && error.response && error.response.data && error.response.data.message){
            console.log(error.response.data.message)
            throw(new Error(' unhautorized '+error.response.data.message))
        }
        console.log(error)
    },
    getResponsePayload: (response) => {
        return response.data ? response.data : null
    },
    hanldeAxiosResponse: (response, customHandler) => {
        const payload = axiosUtility.getResponsePayload(response)
        if (!payload) {
            console.log('axios error, missing payload')
            return
        }
        return customHandler(payload)
    }
}

module.exports = axiosUtility