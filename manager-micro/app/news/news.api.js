const axiosUtility = require('./../../config/axiosUtility')
const axios = require('axios')
const {NEWS_HOST, NEWS_PORT} = require('./../../config/constants')
const newsApi = {
    getNews:(keywords, lang, country)=>{
        return axios.post(NEWS_HOST + ':' + NEWS_PORT + '/search', {
            q: keywords || '',
            lang: lang || '',
            country: country || ''
        }).then((resAxios)=>{
            return axiosUtility.hanldeAxiosResponse(resAxios, (payload)=>{
                return payload
            }) 
        }).catch(axiosUtility.handleAxiosError);
    }
}

module.exports = newsApi