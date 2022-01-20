import { store } from "@/app/mystore"
import { newsApi } from "./news.api"
export const newsService = {
    getNews: async (query, plan) => {
        try {
           
            const news = await newsApi.getNews(query, plan.api_key)
            const preview = store.state.preview.filter((e) => e.plan_id == plan.id)
            if (preview && preview[0]) {
                //esiste una preview la sovrascrivo
                preview[0].response = news
            } else {
                store.state.preview = [...store.state.preview, {
                    plan_id: plan.id,
                    response: news
                }]
            }
        } catch (e) {
            console.log('errore get news')
            console.log(e)
            throw(e)
        }
    }
}