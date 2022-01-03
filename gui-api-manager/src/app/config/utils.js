
export const utils = {
    getTokenHeader: (token) => {
        return { Authorization: `Bearer ${token}` }
    },
    getFullHeader: (token) => {
        return {
            headers: {
                'Content-Type': 'application/json',
                ...utils.getTokenHeader(token)
            }
        }
    },
    handleAxiosError: (error) => {
        console.log('axios error')
        console.log(error)
        throw(error)
    },
    getResponsePayload: (response) => {
        return response.data ? response.data : null
    },
    hanldeAxiosResponse: (response, customHandler) => {
        const payload = utils.getResponsePayload(response)
        if (!payload) {
            console.log('axios error, missing payload')
            throw('missing payload')
        }
        return customHandler(payload)
    }

}