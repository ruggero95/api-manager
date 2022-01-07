<template>
    <v-card flat class="mt-5">
        <!-- divider -->

        <div class="pa-3">
            <v-card-title class="flex-nowrap">
                <span class="text-break">Try Api</span>
            </v-card-title>
            <v-card-text class="flex-nowrap">
                <span class="font-weight-semibold">Input some query for news</span>
            </v-card-text>
            <v-card-text class="flex-nowrap">
                <v-form>
                    <v-text-field v-model="query" label="Query News" dense outlined></v-text-field>
                    <v-btn color="primary" :loading="this.loading" class="me-3 mb-4" @click="searchApi">Search</v-btn>
                </v-form>
            </v-card-text>

            <v-card-text class="flex-nowrap">
                <span class="font-weight-semibold">Response</span>
            </v-card-text>
            <v-card-text class="flex-nowrap">
                <pre class="pa-4 try-response rounded-lg doc">
                    {{this.response}}
                </pre>
            </v-card-text>
        </div>
    </v-card>
</template>

<style>
.try-response {
    height: 250px;
    overflow-y:scroll;
}
</style>

<script>
import { store } from "@/app/mystore"
import { newsService } from "@/app/news/news.service"
import { managerService } from "@/app/manager/manager.service"

export default {
    data() {
        return {
            localStore: store,
            query: '',
            response:'',
            loading:false
        }
    },
    computed:{
        setResponse() {
            const preview = this.localStore.state.preview.filter((e)=>e.plan_id==this.$route.params.id)
            if(preview && preview[0]){
                this.response = preview[0].response
            }
        }
    },
    methods: {
        async searchApi() {
            this.loading = true
            if (this.query != '') {
                const plan = this.localStore.state.plans.filter((e) => e.id == this.$route.params.id)
                if (plan[0]) {
                    await newsService.getNews(this.query, plan[0])
                    await managerService.retrieveRequests()
                    this.setResponse
                }

            }
            this.loading = false
        },
        
    },
    setup() {

    },
}
</script>