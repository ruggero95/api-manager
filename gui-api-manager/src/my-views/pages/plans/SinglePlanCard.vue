<template>
    <div>
        <v-row justify="center">
            <v-col cols="6">
                <v-dialog v-model="dialog" max-width="400px">
                    <v-card>
                        <v-card-title class="text-h5">Delete plan?</v-card-title>
                        <v-card-text>Are you sure you want to delete your plan? when deleting a plan also all your requests related to the plan are deleted.</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="dialog = false">Disagree</v-btn>
                            <v-btn color="error" text @click="deletePlan">Confirm</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
        <v-card>
            <v-card-title>Plan: {{ plan_name }}</v-card-title>
            <v-card-text>
                <router-link :to="'/plans/' + plan_id">
                    <v-btn color="primary me-4">Try Api</v-btn>
                </router-link>

                <v-btn color="error" @click="dialog = true">Delete</v-btn>
            </v-card-text>
        </v-card>
    </div>
</template>


<script>
import { managerService } from "@/app/manager/manager.service"
export default {
    props: ['plan_name', 'plan_id'],
    data() {
        return {
            dialog: false
        }
    },
    methods: {
        async deletePlan() {
            try {
                this.dialog = false
                await managerService.deletePlan(this.plan_id)
            } catch (e) {
                console.log(e)
            }
        }
    },
    setup() {

    },
}
</script>