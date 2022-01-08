<template>
    <div>
        <EmptyPreview v-if="!hasPreview"></EmptyPreview>
        <div v-if="hasPreview" >
            <v-container>
                <v-row>
                    <v-col v-for="prev in 9" :key="prev" cols="4">
                        <PlanPreviewCard    :title="preview.response[prev].title" :image="preview.response[prev].image" :category="preview.response[prev].category" :url="preview.response[prev].url"  :description="preview.response[prev].description" :author="preview.response[prev].author" :date="preview.response[prev].published"></PlanPreviewCard>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
   
</template>

<script>
import EmptyPreview from "./EmptyPreview.vue"
import PlanPreviewCard from "./PlanPreviewCard.vue"
import {store} from "@/app/mystore"
export default {
    data(){
        return {
            localStore:store,
            preview:null
        }
    },
    components:{
        EmptyPreview,
        PlanPreviewCard
    },
    computed:{
        hasPreview(){           
            const preview = store.state.preview.filter((e)=>e.plan_id==this.$route.params.id)
            if(preview && preview.length>0){    
                this.preview = preview[0]            
                return true
            }
            return false
        }
    },
    mounted(){
    },
    setup() {
        
    },
}
</script>