<template>
  <v-card id="account-setting-card">
    <!-- tabs -->
    <v-tabs v-model="tab" show-arrows>
      <v-tab v-for="tab in tabs" :key="tab.icon">
        <v-icon size="20" class="me-3">{{ tab.icon }}</v-icon>
        <span>{{ tab.title }}</span>
      </v-tab>
    </v-tabs>

    <!-- tabs item -->
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <PlanTryApi :plan_id="$route.params.id"></PlanTryApi>
      </v-tab-item>

      <v-tab-item>
        <PlanDoc></PlanDoc>
      </v-tab-item>

      <v-tab-item>
        <PlanPreview></PlanPreview>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mdiAccountOutline, mdiLockOpenOutline, mdiInformationOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import PlanDoc from "@/my-views/pages/plans/PlanDoc.vue"
import PlanPreview from "@/my-views/pages/plans/PlanPreview.vue"
import PlanTryApi from "@/my-views/pages/plans/PlanTryApi.vue"
// demos
import { store } from "@/app/mystore"

export default {
  components: {
    PlanDoc,
    PlanPreview,
    PlanTryApi
  },
  created() {
    const plan = store.state.plans.filter((e) => e.id == this.$route.params.id)
    if (!plan || plan.length == 0) {
      this.$router.push('/dashboard')
    }
  },
  setup() {
    const tab = ref('')

    // tabs
    const tabs = [
      { title: 'Try Api', icon: mdiAccountOutline },
      { title: 'Doc', icon: mdiLockOpenOutline },
      { title: 'Preview', icon: mdiInformationOutline },
    ]

  

    return {
      tab,
      tabs,
      icons: {
        mdiAccountOutline,
        mdiLockOpenOutline,
        mdiInformationOutline,
      },
    }
  },
}
</script>
