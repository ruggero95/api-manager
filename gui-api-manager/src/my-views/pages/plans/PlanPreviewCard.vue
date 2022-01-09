<template>
    <v-card class="mx-auto my-6">
        <v-img height="250" :src="image" onerror="yo"></v-img>

        <v-card-title
            class="pe-20 ps-20 pb-0 pt-0"
            style="overflow-y: auto; height:110px"
        >{{ getTitle(title) }}</v-card-title>
        <v-card-text>
            <v-chip-group>
                <v-chip
                    :key="cat"
                    v-for="cat in this.category"
                    text-color="#ffffff"
                    color="#9155fd"
                >{{ cat }}</v-chip>
            </v-chip-group>
        </v-card-text>

        <v-card-text>
            <v-row align="center" class="mx-0">
                <div class="grey--text">{{ getDate(date) }}</div>
            </v-row>

            <div class="my-4 text-subtitle-1">{{ getAuthor(author) }}</div>

            <div style="overflow-y: auto; height:110px">{{ getDescription(description) }}</div>
            <v-btn :href="url" target="_blank" color="primary" class="me-3 mt-4 mb-4">MORE</v-btn>
        </v-card-text>
        
    </v-card>
</template>
<style>
.bg-chip {
    color: "#ffffff";
    background: var(--v-primary-base);
}
</style>
<script>
import { utils } from "@/app/config/utils"
import dayjs from "dayjs"
export default {
    props: ['title', 'image', 'description', 'author', 'url', 'date', 'category'],
    data() {
        return {
            loading: false,
        }
    },
    methods: {        
        getTitle(title) {
            let cutter = 135
            if (title.length < cutter) {
                return title
            }
            return utils.cutTextAtWord(title, cutter)
        },
        getDescription(description) {
            let cutter = 230
            if (description.length < cutter) {
                return description
            }
            return utils.cutTextAtWord(description, cutter)
        },
        getAuthor(author) {
            try {
                const aut = JSON.parse(author)
                if (Array.isArray(aut)) {
                    if (aut[0] && aut[0].jobTitle && aut[0].name) {
                        return aut[0].jobTitle + ': ' + aut[0].name
                    } else if (aut[0] && aut[0].name) {
                        return aut[0].name
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
        getDate(date) {
            return dayjs(date).format('DD-MM-YYYY HH:mm')
        }
    },
    setup() {

    },
}
</script>