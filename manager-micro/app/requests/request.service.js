const dayjs = require('dayjs')
const { request } = require('express')
const newsApi = require('../news/news.api')
const planRepository = require('./../plan/plan.repository')
const requestRepository = require('./request.repository')
const requestService = {
    processRequest: async (api_key,  keywords, lang, country)=>{
        const plans = await planRepository.getByApiKey(api_key)
        //controllo esistenza piano
        if(!plans[0]){
            throw('error response: missing plan')
        }        
        //controllo se superato max request
        const requests = await requestRepository.getByRequestsByPlanID(plans[0].id)
        let numRequestToday = 0
        requests.map((e)=>{
            if(e.date){
                if(dayjs(e.date).format('YYYY-MM-DD')==dayjs().format('YYYY-MM-DD')){
                    numRequestToday +=1
                }
            }
        })
        if((numRequestToday) > plans[0].max_requests){
            throw('error response: max request reached')
        }
        await requestRepository.create(plans[0].id)
        const news = await newsApi.getNews(keywords, lang, country)        
        if(!news){
            throw('Error retriving news')
        }
        return news.data ? news.data : null
    },
    getByDate: async (user_id, start_date, end_date)=>{
        const plans = await planRepository.getByUserID(user_id)
        if(!plans || plans.length==0){
            return []
        }
       
        const requests = await requestRepository.getRequestsByIntervalDate(start_date,end_date, plans)
        if(!request){
            throw('Error retriving requests')
        }
        return requests
    },
    getByDateSum: async (user_id, start_date, end_date)=>{
        const plans = await planRepository.getByUserID(user_id)
        if(!plans || plans.length==0){
            return []
        }
        const requests = await requestRepository.getRequestsSumByDate(start_date,end_date, plans)
        if(!requests){
            throw('Error retriving requests')
        }
        return requests
    }
}

module.exports = requestService