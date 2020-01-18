<template>
  <div class="w-100">
    <base-header type="pepsi-primary" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="row justify-content-start">
        <div class="col-md-12">
          <h2 class="text-white">Ordenes sin atender.</h2>
        </div>
      </div>
      <div class="row mb-4" v-if="loaded">
        <div class="col-md-12 m-2 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-white mb-0">Grafica de Ordenes sin atender.</h5>
              </div>
            </div>
            <line-chart ref="barChart" :chart-data="chart.chartData" v-if="loaded"></line-chart>
          </card>
        </div>
        <div class="col-md-12 m-2 mb-xl-0">
          <card type="ligth" header-classes="bg-transparent text-black">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-black-50 mb-0">Listado de ordenes.</h5>
              </div>
            </div>
            <div class="table-responsive border-0">
              <base-table :data="detail_data" v-if="loaded">
                <template slot="columns">
                  <th># Orden</th>
                  <th>Cliente.</th>
                  <th>Zona.</th>
                  <th>Fecha.</th>
                  <th>Fecha Fin Extrema.</th>
                  <th>Tipo.</th>
                  <th>Operador.</th>
                </template>

                <template slot-scope="{row}">
                  <th scope="row">{{row.order_number}}</th>
                  <td>{{row.client_id}}</td>
                  <td>{{row.zone}}</td>
                  <td>{{row.entry_date}}</td>
                  <td>{{row.extreme_end_date}}</td>
                  <td>{{row.value}}</td>
                  <td>{{row.operator}}</td>
                </template>
              </base-table>
            </div>
          </card>
        </div>
      </div>
    </base-header>
  </div>
</template>
<script>
import reportServices from "./../../services/reportServices";
import userServices from "./../../services/userServices";

import * as chartConfigs from "@/components/Charts/config";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import PieChart from "@/components/Charts/PieChart";

export default {
  components: {
    LineChart,
    BarChart,
    PieChart
  },
  data() {
    return {
      chart: {
        chartData: {
          labels: [],
          datasets: [
            {
              label: [],
              data: [],
              backgroundColor: []
            }
          ]
        },
        extraOptions: chartConfigs.blueChartOptions
      },
      loaded: false,
      zones: [],
      count_data: [],
      detail_data: []
    };
  },
  created() {
    console.log("start");
    this.init();
  },
  computed: {},
  methods: {
    complete(index) {
      this.list[index] = !this.list[index];
    },
    async show_alert() {
      console.log("pass");
      this.loaded = false;

      this.chart.chartData.labels = [];
      for (let item of this.chart.chartData.datasets) {
        item.label = [];
        item.data = [];
        item.backgroundColor = [];
      }

      let response = await this.getData();
      console.log(response);

      this.count_data = response.count_data;
      this.detail_data = response.detail_data;

      for (let item of this.count_data) {
        this.chart.chartData.labels.push(item.entry_date);
        this.chart.chartData.datasets[0].data.push(item.cant);
        this.chart.chartData.datasets[0].label.push(item.entry_date);
        this.chart.chartData.datasets[0].backgroundColor.push(
          this.getRandomColor()
        );
      }

      this.loaded = true;

      this.$toasted.show(response.message, {
        theme: "bubble",
        position: "top-right",
        duration: 5000
      });
    },
    getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    },
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    getData() {
      return new Promise((resolve, reject) => {
        reportServices
          .get_ExpiredOrders()
          .then(response => {
            console.log(response);
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },
    getZones() {
      return new Promise((resolve, reject) => {
        reportServices
          .getZones()
          .then(response => {
            console.log(response);
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },
    async init() {
        this.show_alert();
    }
  }
};
</script>
<style lang="scss">
</style>
