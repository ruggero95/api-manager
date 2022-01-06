<template>
  <v-card height="100%">
    <v-card-title class="align-start">
      <span class="font-weight-semibold">Statistics Card</span>
      <v-spacer></v-spacer>
      <v-btn
        icon
        small
        class="me-n3 mt-n2"
      >
        <v-icon>
          {{ this.mdiDotsVertical }}
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-subtitle class="mb-8 mt-n5">
    
    </v-card-subtitle>

    <v-card-text>
      <v-row>
        <v-col
          cols="6"
          md="3"
          class="d-flex align-center"
        >
          <v-avatar
            size="44"
            color="warning"
            rounded
            class="elevation-1"
          >
            <v-icon
              dark
              color="white"
              size="30"
            >
              {{this.mdiLabelOutline}}
            </v-icon>
          </v-avatar>
          <div class="ms-3">
            <p class="text-xs mb-0">
              Plans
            </p>
            <h3 class="text-xl font-weight-semibold">
              {{ this.localStore.state.plans.length }}
            </h3>
          </div>
        </v-col>
         <v-col
          cols="6"
          md="3"
          class="d-flex align-center"
        >
          <v-avatar
            size="44"
            color="info"
            rounded
            class="elevation-1"
          >
            <v-icon
              dark
              color="white"
              size="30"
            >
              {{this.mdiLabelOutline}}
            </v-icon>
          </v-avatar>
          <div class="ms-3">
            <p class="text-xs mb-0">
              Requests
            </p>
            <h3 class="text-xl font-weight-semibold">
              {{ this.localStore.state.requests.length }}
            </h3>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiAccountOutline, mdiCurrencyUsd, mdiTrendingUp, mdiDotsVertical, mdiLabelOutline } from '@mdi/js'
import {store} from "@/app/mystore"
console.log(store.state.plans)
export default {
  data(){
    return {
      localStore: store,
      mdiLabelOutline:mdiLabelOutline,
      mdiDotsVertical:mdiDotsVertical
    }
  },
  setup() {
    
  },
}
</script>
