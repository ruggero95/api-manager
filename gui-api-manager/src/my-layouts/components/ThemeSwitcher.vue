<template>
  <v-fade-transition mode="out-in">
    <v-icon
      :key="$vuetify.theme.dark"
      @click="changeTheme"
    >
      {{ $vuetify.theme.dark ? icons.mdiWeatherSunny : icons.mdiWeatherNight }}
    </v-icon>
  </v-fade-transition>
</template>

<script>
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'

export default {
  methods:{
    changeTheme(){
      const theme = !this.$vuetify.theme.dark
      this.$vuetify.theme.dark = theme
      localStorage.setItem('theme',theme.toString())
    }
  },
  setup() {
    return {
      icons: {
        mdiWeatherNight,
        mdiWeatherSunny,
      },
    }
  },
}
</script>

<style>
</style>
