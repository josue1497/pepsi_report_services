<template>
  <div class="w-100">
    <base-header type="pepsi-primary" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="row justify-content-start">
        <div class="col-md-12">
          <small class="text-white">Filtros:</small>
        </div>
      </div>
      <form action>
        <div class="row justify-content-start">
          <div class="col-md-4">
            <div class="form-group">
              <label for="user_id" class="text-white">Mes:</label>
              <select name="month" id="month" class="form-control" v-model="month">
                <option value selected>Seleccione un mes.</option>
                <option v-bind:key="index" v-for="(item, index) in months" :value="item">{{item}}</option>
              </select>
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for="site" class="text-white">Zona:</label>
              <select name="site" id="site" class="form-control" v-model="site">
                <option value selected>Seleccione una zona.</option>
                <option v-bind:key="index" v-for="(t, index) in sites" :value="t">{{t}}</option>
              </select>
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <div class="d-flex align-items-end mt-2">
                <div>
                  <label for="search" class="text-white"></label>
                  <input
                    type="button"
                    class="btn btn-pepsi-tertiary sm mt-4"
                    id="search"
                    value="Buscar"
                    @click="show_charts"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <!-- chart de llamadas -->
      <div class="row mb-4" v-if="loaded">
        <div class="col-md-6 mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-white mb-0">Grafica por Mes.</h5>
              </div>
            </div>
            <pie-chart
              ref="pieChart"
              :chart-data="month_chart.chartData"
              v-if="loaded"
              :options="chartOptions"
            ></pie-chart>
          </card>
        </div>

        <div class="col-md-6 mb-5 mb-xl-0">
          <card type="ligth" header-classes="bg-transparent text-black">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-black-50 mb-0">Listado por Mes.</h5>
              </div>
            </div>
            <div class="table-responsive border-0">
              <base-table :data="data_by_month" v-if="loaded">
                <template slot="columns">
                  <th>Mes</th>
                  <th>Total.</th>
                </template>

                <template slot-scope="{row}">
                  <th scope="row">{{row.month}}</th>
                  <td>{{row.cant}}</td>
                </template>
              </base-table>
            </div>
          </card>
        </div>
      </div>
      <!-- chart de chats -->
      <div class="row mb-4" v-if="loaded">
        <div class="col-md-6 mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-white mb-0">Grafico por Zonas.</h5>
              </div>
            </div>
            <pie-chart
              ref="pieChart"
              :chart-data="site_chart.chartData"
              v-if="loaded"
              :options="chartOptions"
            ></pie-chart>
          </card>
        </div>

        <div class="col-md-6 mb-5 mb-xl-0">
          <card type="ligth" header-classes="bg-transparent text-black">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-black-50 mb-0">Listado por Zonas.</h5>
              </div>
            </div>
            <div class="table-responsive border-0">
              <base-table :data="data_by_sites" v-if="loaded">
                <template slot="columns">
                  <th>Zona</th>
                  <th>Total.</th>
                </template>

                <template slot-scope="{row}">
                  <th scope="row">{{row.company_area}}</th>
                  <td>{{row.cant}}</td>
                </template>
              </base-table>
            </div>
          </card>
        </div>
      </div>
      <!-- chart de emails -->
      <div class="row mb-4" v-if="loaded">
        <div class="col-md-6 mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-white mb-0">Grafico por Status de usuario y por zona.</h5>
              </div>
            </div>
            <pie-chart
              ref="pieChart"
              :chart-data="status_chart.chartData"
              v-if="loaded"
              :options="chartOptions"
            ></pie-chart>
          </card>
        </div>

        <div class="col-md-6 mb-5 mb-xl-0">
          <card type="ligth" header-classes="bg-transparent text-black">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-black-50 mb-0">Listado de Status de usuario y por zona..</h5>
              </div>
            </div>
            <div class="table-responsive border-0">
              <base-table :data="data_by_status" v-if="loaded">
                <template slot="columns">
                  <th>Zona</th>
                  <th>Status</th>
                  <th>Total.</th>
                </template>

                <template slot-scope="{row}">
                  <th scope="row">{{row.site}}</th>
                  <th>{{row.user_status}}</th>
                  <td>{{row.cant}}</td>
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

import * as chartConfigs from "@/components/Charts/config";
import PieChart from "@/components/Charts/PieChart";

export default {
  components: {
    PieChart
  },
  mounted() {
    this.$loading(false);
  },
  data() {
    return {
      chartOptions: {
        hoverBorderWidth: 20
      },
      month_chart: {
        chartData: {
          hoverBackgroundColor: "red",
          hoverBorderWidth: 10,
          labels: [],
          datasets: [
            {
              label: "Data One",
              backgroundColor: [],
              data: []
            }
          ]
        }
      },
      site_chart: {
        chartData: {
          hoverBackgroundColor: "red",
          hoverBorderWidth: 10,
          labels: [],
          datasets: [
            {
              label: "Data One",
              backgroundColor: [],
              data: []
            }
          ]
        }
      },
      status_chart: {
        chartData: {
          hoverBackgroundColor: "red",
          hoverBorderWidth: 10,
          labels: [],
          datasets: [
            {
              label: "Data One",
              backgroundColor: [],
              data: []
            }
          ]
        }
      },
      status_site_chart: {
        chartData: {
          hoverBackgroundColor: "red",
          hoverBorderWidth: 10,
          labels: [],
          datasets: [
            {
              label: "Data One",
              backgroundColor: [],
              data: []
            }
          ]
        }
      },
      loaded: false,
      month: "",
      from_date: "",
      to_date: "",
      months: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ],
      sites: [
        "ADC",
        "Centro Llanos",
        "Oriente Norte",
        "Centro Occidente",
        "Metropolitano",
        "Andes",
        "Occidente",
        "Oriente Sur"
      ],
      site: "",
      data_by_month: [],
      data_by_sites: [],
      data_by_status: [],
      data_by_status_site: []
    };
  },
  created() {
    console.log("start");
    this.init();
  },
  computed: {},
  methods: {
    async show_charts() {
      console.log("pass");
      this.loaded = false;

      let response = await this.getData();

      console.log(response);

      this.data_by_month = response.data_by_month;
      this.data_by_sites = response.data_by_site;
      this.data_by_status = response.data_by_status;
      this.data_by_status_site = response.data_by_status_site;

      for (let item of this.data_by_month) {
        this.month_chart.chartData.labels.push(item.month);
        this.month_chart.chartData.datasets[0].data.push(item.cant);
        this.month_chart.chartData.datasets[0].backgroundColor.push(
          this.getRandomColor()
        );
      }

      for (let item of this.data_by_sites) {
        this.site_chart.chartData.labels.push(item.company_area);
        this.site_chart.chartData.datasets[0].data.push(item.cant);
        this.site_chart.chartData.datasets[0].backgroundColor.push(
          this.getRandomColor()
        );
      }

      for (let item of this.data_by_status) {
        this.status_chart.chartData.labels.push(
          item.user_status + " - " + item.site
        );
        this.status_chart.chartData.datasets[0].data.push(item.cant);
        this.status_chart.chartData.datasets[0].backgroundColor.push(
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
    getData() {
      return new Promise((resolve, reject) => {
        reportServices
          .get_KitDetailData({ month: this.month, site: this.site })
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
      let temp = await this.getUsers();
      console.log(temp);
      this.users = temp.data;
    },
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
