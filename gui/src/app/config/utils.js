
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
        if(error && error.response && error.response.data && error.response.data.message){
            console.log(error.response.data.message)
            throw(new Error(error.response.data.message))
        }
        console.log(error)
        throw('Something wrong append')
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
    },
    cutTextAtWord:(text,cutter )=>{
        let trimmedString = text.substr(0, cutter);
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
        return trimmedString != text ? `${trimmedString}...` : text
    }

}