import { reactive } from "@vue/composition-api"
//user token payload
//plans all plans
//requests all rqeuests of all plan, the query already contains all plan details (unecessary)
/*preview saving try of the api like:
response replaced at each try of that plan
    {
        plan_id:
        response:[]
    }
*/
export const store = {

    state:reactive({
        user:null,
        plans:[],
        requests:[],
        preview:[],
        chartData:{},
        NeworkErrorMessage:'Network Error',
        NeworkError:false
    })
}