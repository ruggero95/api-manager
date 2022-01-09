<template>
  <component :is="resolveLayout">
    <router-view></router-view>
    <BadError />
  </component>
</template>

<script>
import { computed } from '@vue/composition-api'
import { useRouter } from '@/utils'
import LayoutBlank from '@/my-layouts/Blank.vue'
import LayoutContent from '@/my-layouts/Content.vue'
import { store } from "./app/mystore"
import BadError from "@/my-views/BadError.vue"
export default {
  components: {
    LayoutBlank,
    LayoutContent,
    BadError
  },
  data() {
    return {
      localStore: store
    }
  },
  async mounted() {
    try {
      const theme = localStorage.getItem("theme");
      if (theme) {
        if (theme == "true") {
          this.$vuetify.theme.dark = true;
        } else {
          this.$vuetify.theme.dark = false;
        }
      }  
     
    } catch (e) {
      if(!this.localStore.state.NeworkError){
          this.localStore.state.NeworkError = true
      }
      //this.localStore.state.NeworkError = true
    }

  },
  setup() {
    const { route } = useRouter()

    const resolveLayout = computed(() => {
      // Handles initial route
      //console.log(store.state.user)
      if (route.value.name === null) return null

      if (route.value.meta.layout === 'blank') return 'layout-blank'

      return 'layout-content'
    })

    return {
      resolveLayout,
    }
  },
}
</script>
