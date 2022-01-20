<template>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="localStore.state.NeworkError"
    >
      {{ this.localStore.state.NeworkErrorMessage }}

        <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="localStore.state.NeworkError = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import {store} from "@/app/mystore"
  export default {
      data(){
          return {
              localStore: store
          }
      }
  }
</script>