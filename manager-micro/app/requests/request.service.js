const newsApi = require('../news/news.api')
const planRepository = require('./../plan/plan.repository')
const requestRepository = require('./request.repository')
const requestService = {
    processRequest: async (api_key,  keywords, lang, country)=>{
        const {rows: plans, rowCount: rowCountPlans} = await planRepository.getByApiKey(api_key)
        //controllo esistenza piano
        if(!plans[0]){
            throw('error response: missing plan')
        }        
        //controllo se superato max request
        const {rows: request, rowCount:rowCountRequests} = await requestRepository.getByRequestsByPlanID(plans[0].id)
        if((rowCountRequests + 1) > plans[0].max_requests){
            throw('error response: max request reached')
        }
        await requestRepository.create(plans[0].id)
        const news = await newsApi.getNews(keywords, lang, country)        
        if(!news){
            throw('Error retriving news')
        }
        return news.data ? news.data : null
    }
}

module.exports = requestService