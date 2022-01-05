<template>
  <component :is="resolveLayout">
    <router-view></router-view>
  </component>
</template>

<script>
import { computed } from '@vue/composition-api'
import { useRouter } from '@/utils'
import LayoutBlank from '@/my-layouts/Blank.vue'
import LayoutContent from '@/my-layouts/Content.vue'
import { managerApi } from './app/manager/manager.api'
import { store} from "./app/mystore"
export default {
  components: {
    LayoutBlank,
    LayoutContent
  },
  data(){
    return {
      localStore:store
    }
  },
  async mounted() {
        const theme = localStorage.getItem("theme");
        if (theme) {
            if (theme == "true") {
                this.$vuetify.theme.dark = true;
            } else {
                this.$vuetify.theme.dark = false;
            }
        }
      
    },
  setup() {
    const { route } = useRouter()

    const resolveLayout = computed(() => {
      // Handles initial route
      console.log(route.value)
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
