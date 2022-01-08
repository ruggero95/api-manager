<template>
    <v-card flat class="mt-5">
        <!-- divider -->

        <div class="pa-3">
            <v-card-title class="flex-nowrap">
                <span class="text-break">Documentation</span>
            </v-card-title>
            <v-card-text class="flex-nowrap">
                <span class="font-weight-semibold">Example Request</span>
            </v-card-text>
            <v-card-text class="flex-nowrap">
                <div class="pa-4 rounded-lg doc">
                    <span class="get">GET</span>
                    {{ env.api_manager_backend }}/news?q=car
                    <span class="d-block">
                        <span class="header-name">Content-type:</span>
                        <span class="header-value">&NonBreakingSpace;application/json</span>
                    </span>
                    <span class="d-block">
                        <span class="header-name">Authorization:</span>
                        <span class="header-value">&NonBreakingSpace;Bearer {{ getPlanKey }}</span>
                    </span>
                </div>
            </v-card-text>
            <v-card-text class="flex-nowrap">
                <span class="font-weight-semibold">Example Success Response</span>
            </v-card-text>
            <v-card-text class="flex-nowrap">
                <div class="pa-4 rounded-lg doc">
                    <span class="d-block">{</span>
                    <span class="d-block">"error": false,</span>
                    <span class="d-block">"message": "News",</span>
                    <span class="d-block">"data": [</span>
                    <span class="d-block ps-5">{</span>
                    <span class="d-block ps-10">"id": "f48ab012-869a-4d4e-9499-2435c90e916b",</span>
                    <span
                        class="d-block ps-10"
                    >"title": "Internet and banks suspended in protest-roiled Kazakhstan, with Russia-aligned peacekeepers set to enter",</span>
                    <span
                        class="d-block ps-10"
                    >"description": "The demonstrations began over the weekend in Kazakhstan’s oil-rich western region over high energy prices and then spread elsewhere, including Almaty, the country’s largest city. Protesters on Wednesd...",</span>
                    <span
                        class="d-block ps-10"
                    >"url": "https://www.washingtonpost.com/world/2022/01/06/kazakhstan-protests-russia-csto-tokayev/",</span>
                    <span class="d-block ps-10">"author":[</span>
                    <span class="d-block ps-15">{</span>
                    <span class="d-block ps-15 ms-5">"@type":"Person"</span>
                    <span class="d-block ps-15 ms-5">"name":"Krista Torres"</span>
                    <span class="d-block ps-15 ms-5">"url":"https://www.buzzfeed.com/kristatorres"</span>
                    <span class="d-block ps-15 ms-5">"jobTitle":"BuzzFeed Staff"</span>
                    <span class="d-block ps-15">}</span>
                    <span class="d-block ps-10">],</span>
                    <span class="d-block ps-10">"language": "en",</span>
                    <span class="d-block ps-10">"category": [</span>
                    <span class="d-block ps-15">"world"</span>
                    <span class="d-block ps-10">],</span>
                    <span class="d-block ps-10">"published": "2022-01-06 17:36:07 +0000"</span>
                    <span class="d-block ps-5">},</span>
                    <span class="d-block ps-5">{</span>
                    <span class="d-block ps-10">"id": "f48ab012-869a-4d4e-9499-2435c90e916b",</span>
                    <span
                        class="d-block ps-10"
                    >"title": "Internet and banks suspended in protest-roiled Kazakhstan, with Russia-aligned peacekeepers set to enter",</span>
                    <span
                        class="d-block ps-10"
                    >"description": "The demonstrations began over the weekend in Kazakhstan’s oil-rich western region over high energy prices and then spread elsewhere, including Almaty, the country’s largest city. Protesters on Wednesd...",</span>
                    <span
                        class="d-block ps-10"
                    >"url": "https://www.washingtonpost.com/world/2022/01/06/kazakhstan-protests-russia-csto-tokayev/",</span>
                    <span class="d-block ps-10">"author": "Isabelle Khurshudyan,Amy Cheng",</span>
                    <span class="d-block ps-10">"language": "en",</span>
                    <span class="d-block ps-10">"category": [</span>
                    <span class="d-block ps-15">"world"</span>
                    <span class="d-block ps-10">],</span>
                    <span class="d-block ps-10">"published": "2022-01-06 17:36:07 +0000"</span>
                    <span class="d-block ps-5">}</span>
                    <span class="d-block ps-5">......</span>
                    <span class="d-block">],</span>

                    <span class="d-block">"status": 200</span>

                    <span class="d-block">}</span>
                </div>
            </v-card-text>
            <v-card-text class="flex-nowrap">
                <span class="font-weight-semibold">Example Error Response</span>
            </v-card-text>
            <v-card-text class="flex-nowrap">
                <div class="pa-4 rounded-lg doc">
<pre>{
    "error": true,
    "message": "Unhautorized",
    "data": null,
    "status": 401
}</pre>
                </div>
            </v-card-text>
        </div>
    </v-card>
</template>


<script>
import { store } from "@/app/mystore"
import { env } from "@/app/config/const"

export default {
    data() {
        return {
            localStore: store,
            env: env
        }
    },
    computed: {
        getPlanKey() {
            const plan = this.localStore.state.plans.filter((e) => e.id == this.$route.params.id)
            return plan[0] ? plan[0].api_key : ''
        }
    },
    setup() {

    },
}
</script>

<style >
.get {
    color: #d455fd !important;
    font-weight: 800;
}

.header-name {
    color: var(--v-info-base);
    font-weight: 800;
}
.header-value {
    color: #d86f19;
}
.doc {
    background: var(--v-bg-base);
}
</style>