<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title class="text-h5">FAQ</v-card-title>
                    <v-card-text>
                        <v-expansion-panels accordion>
                            <v-expansion-panel v-for="(item,index) in items" :key="index">
                                <v-expansion-panel-header>{{ item.title }}</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <span v-html="item.description"></span>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    title: 'Cloud Computing Project',
                    description: 'Final exam project which consist in the creation of a cloud-native microservices application'
                },

                {
                    title: 'Requirements',
                    description: '<ul><li>Three microservices or two microservices and one Saas</li><li>At least one external API</li><li>At least two different databases</li><li>Each service must be conteit least one external API</li></ul>'
                },
                {
                    title: 'Implementation',
                    description: 'Final exam project which consist in the creation of a cloud-native microservices application'
                },
            ]
        }
    },
    setup() {

    },
}
</script>