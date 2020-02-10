<template>
  <div class="w-100">
    <base-header type="pepsi-primary" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="row justify-content-start">
        <div class="col-md-12">
          <small class="text-white">Filtros:</small>
        </div>
      </div>
      <form action>
        <div class="row justify-content-start d-print-none">
          <div class="col-md-3">
            <div class="form-group">
              <label for="user_id" class="text-white">Zona:</label>
              <select name="site" id="site" class="form-control" v-model="site">
                <option
                  v-bind:key="index"
                  v-for="(zone, index) in zones"
                  :value="zone.value"
                >{{zone.zone}}</option>
              </select>
            </div>
          </div>

          <div class="col-md-3">
            <div class="form-group">
              <label for="from_date" class="text-white">Fecha desde:</label>
              <input
                type="date"
                name="from_date"
                id="from_date"
                class="form-control"
                v-model="from_date"
              />
            </div>
          </div>

          <div class="col-md-3">
            <div class="form-group">
              <label for="to_date" class="text-white">Fecha hasta:</label>
              <input type="date" name="to_date" id="to_date" class="form-control" v-model="to_date" />
            </div>
          </div>

          <div class="col-md-3">
            <div class="form-group">
              <div class="d-flex align-items-end mt-2">
                <div>
                  <label for="search" class="text-white"></label>
                  <input
                    type="button"
                    class="btn btn-pepsi-tertiary sm mt-4"
                    id="search"
                    value="Buscar"
                    @click.prevent="show_alert"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row mb-4" v-if="loaded">
        <div class="col-md-12 m-2 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-white mb-0">Grafica de Ordenes.</h5>
              </div>
            </div>
            <pie-chart ref="barChart" :chart-data="chart.chartData" v-if="loaded"></pie-chart>
          </card>
        </div>
        <div class="col-md-12 m-2 mb-xl-0 d-print-none">
          <card type="ligth" header-classes="bg-transparent text-black">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-black-50 mb-0">Listado de ordenes.</h5>
              </div>
            </div>
            <div class="table-responsive border-0">
              <base-table :data="count_data" v-if="loaded">
                <template slot="columns">
                  <th>Puesto de Trabajo Responsable.</th>
                  <th>Cantidad.</th>
                </template>

                <template slot-scope="{row}">
                  <th scope="row">{{row.pto_tbjo_resp}}</th>
                  <td>{{row.cant}}</td>
                </template>
              </base-table>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import reportServices from "./../../services/reportServices";
import userServices from "./../../services/userServices";

import * as chartConfigs from "@/components/Charts/config";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import PieChart from "@/components/Charts/PieChart";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  components: {
    LineChart,
    BarChart,
    PieChart
  },
  computed: {
    ...mapState("userData", [
      "user",
      "user_logged",
      "access_token",
      "user_route"
    ])
  },
  mounted() {
    this.$loading(false);
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
        extraOptions: []
      },
      loaded: false,
      site: "",
      from_date: "",
      to_date: "",
      zones: [],
      count_data: [],
      detail_data: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    complete(index) {
      this.list[index] = !this.list[index];
    },
    async show_alert() {
      this.loaded = false;

      this.chart.chartData.labels = [];
      for (let item of this.chart.chartData.datasets) {
        item.label = [];
        item.data = [];
        item.backgroundColor = [];
      }

      let response = await this.getData({
        zone: this.site,
        from_date: this.from_date,
        to_date: this.to_date,
        user_id: this.user.id,
        role_id: this.user.role_id
      });
      console.log(response);
      if (response.code === 200) {
        this.count_data = response.data;
        for (let item of this.count_data) {
          this.chart.chartData.labels.push(item.pto_tbjo_resp);
          this.chart.chartData.datasets[0].data.push(item.cant);
          this.chart.chartData.datasets[0].label.push(item.pto_tbjo_resp);
          this.chart.chartData.datasets[0].backgroundColor.push(
            this.getRandomColor()
          );
        }

        this.loaded = true;

      } else {
        this.$vToastify.error('Ha ocurrido un error en la busqueda', 'Error:');
      }

      this.loaded = true;
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
    getData(data) {
      return new Promise((resolve, reject) => {
        reportServices
          .getByPtoJob(data)
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
      let temp = await this.getZones();
      this.zones = temp.data;
    }
  }
};
</script>
<style lang="scss">
</style>
