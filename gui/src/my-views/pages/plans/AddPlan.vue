<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-col cols="6">
                        <v-card-title>Add Plan</v-card-title>
                        <v-card-text>
                            <ShowMessage
                                v-if="this.showMessage"
                                :type="this.type"
                                :message="this.message"
                            ></ShowMessage>
                            <v-form @submit.prevent="addPlan">
                                <v-text-field
                                    v-model="plan_name"
                                    label="PlanName"
                                    type="text"
                                    outlined
                                    dense
                                    placeholder="Plan name"
                                    width="50px"
                                ></v-text-field>
                                <v-btn color="primary" :loading="this.loading" @click="addPlan">Add</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-col>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" md="4" lg="4" v-for="plan in this.localStore.state.plans" :key="plan.id">
                <SinglePlanCard :plan_name="plan.name" :plan_id="plan.id"></SinglePlanCard>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import SinglePlanCard from "./SinglePlanCard.vue"
import ShowMessage from "@/my-components/showMessage.vue";
import { store } from "@/app/mystore"

import { managerService } from "@/app/manager/manager.service";
export default {
    data() {
        return {
            localStore: store,
            plan_name: "",
            showMessage: false,
            type: 'error',
            message: '',
            loading: false
        };
    },
    methods: {
        async addPlan() {
            this.loading = true
            try {
                this.showMessage = false
                await managerService.addPlan(this.plan_name)
                this.plan_name = ''
                this.loading = false

            } catch (e) {
                this.message = typeof e == 'string' ? e : e.message
                this.showMessage = true
            }
            this.loading = false

        }
    },
    async mounted() {
        try {
            await managerService.retrievePlans()

        } catch (e) {
            if (!this.localStore.state.NeworkError) {
                this.localStore.state.NeworkError = true
            }
        }
    },
    setup() {
    },
    components: { SinglePlanCard, ShowMessage }
}
</script>