<template>
    <v-card :loading="loading" class="mx-auto my-6" >
        <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
        </template>

        <v-img height="250" :src="image"></v-img>

        <v-card-title>{{ title }}</v-card-title>

        <v-card-text>
            <v-row align="center" class="mx-0">
                <div class="grey--text ">{{ getDate(date) }}</div>
            </v-row>

            <div class="my-4 text-subtitle-1">{{ getAuthor(author) }}</div>

            <div>{{ description }}</div>
            <v-btn :href="url" target="_blank" color="primary" class="me-3 mt-4 mb-4">MORE</v-btn>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['title', 'image', 'description', 'author', 'url', 'date','category'],
    data() {
        return {
            loading: false,
        }
    },
    methods: {
        getAuthor(author) {
            try {                
                const aut = JSON.parse(author)
                if (Array.isArray(aut)) {
                    if(aut[0] && aut[0].jobTitle && aut[0].name){
                        return  aut[0].jobTitle + ': ' + aut[0].name
                    }else if(aut[0] &&  aut[0].name){
                        return  aut[0].name
                    }
                }
                if (aut.name) {
                    return aut.name
                }
                return author
            } catch (e) {
                return author
            }

        },
        getDate(date){
            const dateParsed = new Date(date)
            return `${dateParsed.getDate()}/${(dateParsed.getMonth()+1).toString().padStart(2,0)}/${dateParsed.getFullYear()}  ${(dateParsed.getHours()).toString().padStart(2,'0')}:${(dateParsed.getMinutes()).toString().padStart(2,'0')}`
        }
    },
    setup() {

    },
}
</script>