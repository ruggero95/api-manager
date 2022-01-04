import { reactive } from "@vue/composition-api"
export const store = {
    state:reactive({
        user:null,
        plan:[],
    })
}