<template>
  <v-card>
    <v-card-title class="align-start">
      <span>Requests Weekly Overview</span>

      <v-spacer></v-spacer>
    </v-card-title>

    <v-card-text>
      <div id="amchart" v-on:draw-cart.stop="drawChart" ref="chartdiv"></div>
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
// eslint-disable-next-line object-curly-newline

import { store } from "@/app/mystore"
//import LineChart from './linechart'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
import { watch } from '@vue/composition-api';
export default {
  components: {
    VueApexCharts,
    //LineChart
  },
  data() {
    return {
      localStore: store,
      d: [{
        "country": "2020-03-02",
        "visits": 3025
      }, {
        "country": "China",
        "visits": 1882
      }, {
        "country": "Japan",
        "visits": 1809
      }]
    }
  },
  async created() {

  },
  async mounted() {
    this.drawChart()
    if (this.localStore.state.stop) {
      this.localStore.state.stop()
    }
    this.localStore.state.stop = watch(
      () => store.state.chartData,
      (count, prevCount) => {
        /* ... */
        this.drawChart()
      }
    ).bind(this)
  },
  methods: {

    async drawChart() {
      if (this.chart) {
        this.chart.dispose();
      }
      let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
      chart.scrollbarX = new am4core.Scrollbar();

      // Add data
      chart.data = this.localStore.state.chartData

      // Create axes
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "date";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.labels.template.verticalCenter = "middle";
      categoryAxis.renderer.labels.template.rotation = 270;
      categoryAxis.tooltip.disabled = true;
      categoryAxis.renderer.minHeight = 110;
      categoryAxis.renderer.labels.template.fill = am4core.color("#9155fd");


      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.minWidth = 50;
      valueAxis.fill = '#9155fd'
      valueAxis.renderer.labels.template.fill = am4core.color("#9155fd");

      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.sequencedInterpolation = true;
      series.dataFields.valueY = "sum";
      series.dataFields.categoryX = "date";
      series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
      series.columns.template.strokeWidth = 0;

      series.tooltip.pointerOrientation = "vertical";

      series.columns.template.column.cornerRadiusTopLeft = 10;
      series.columns.template.column.cornerRadiusTopRight = 10;
      series.columns.template.column.fillOpacity = 0.8;

      chart.colors.list = [
        am4core.color("#9155fd"),

      ]
      // on hover, make corner radiuses bigger
      var hoverState = series.columns.template.column.states.create("hover");
      hoverState.properties.cornerRadiusTopLeft = 0;
      hoverState.properties.cornerRadiusTopRight = 0;
      hoverState.properties.fillOpacity = 1;

      series.columns.template.adapter.add("fill", function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
      });

      // Cursor
      chart.cursor = new am4charts.XYCursor();
      this.chart = chart

    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  setup() {

  },
}
</script>

<style>
#amchart {
  width: 100%;
  height: 500px;
}
</style>