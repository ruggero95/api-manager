<template>
  <v-row>
    <v-col cols="12" md="4">
      <dashboard-congratulation-john></dashboard-congratulation-john>
    </v-col>
    <v-col cols="12" md="8">
      <dashboard-statistics-card></dashboard-statistics-card>
    </v-col>

    <v-col cols="12">
      <dashboard-weekly-overview></dashboard-weekly-overview>
    </v-col>
  </v-row>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiPoll, mdiLabelVariantOutline, mdiCurrencyUsd, mdiHelpCircleOutline } from '@mdi/js'

// demos
import DashboardCongratulationJohn from './DashboardCongratulationJohn.vue'
import DashboardStatisticsCard from './DashboardStatisticsCard.vue'
import DashboardWeeklyOverview from './DashboardWeeklyOverview.vue'
import { managerService } from "@/app/manager/manager.service"
import { store } from "@/app/mystore"
export default {
  data() {
    return {
      localStore: store
    }
  },
  async created() {
   
  },
  async mounted() {
    //await managerService.retrievePlans()
    try {
      await managerService.retrieveRequests()
      await managerService.getWeeklySum()
    } catch (e) {
      if (!this.localStore.state.NeworkError) {
        this.localStore.state.NeworkError = true
      }
    }
  },
  components: {
    DashboardCongratulationJohn,
    DashboardStatisticsCard,
    DashboardWeeklyOverview,
  },
  setup() {

  },
}
</script>
