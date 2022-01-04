const axiosUtility = require('./../../config/axiosUtility')
const {NEWS_HOST, NEWS_PORT} = require('./../../config/constants')
const newsApi = {
    getNews:(keywords, lang, country)=>{
        return axios.post(NEWS_HOST + ':' + NEWS_PORT + '/search', {
            keywords: keywords || '',
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