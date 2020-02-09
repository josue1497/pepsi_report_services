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
          <div class="col-md-3">
            <div class="form-group">
              <label for="user_id" class="text-white">Operador:</label>
              <select name="user_id" id="user_id" class="form-control" v-model="user_id">
                <option value>Seleccione un Operador</option>
                <option
                  v-bind:key="index"
                  v-for="(user, index) in users"
                  :value="user.id"
                >{{user.name}} {{user.lastname}}</option>
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
      <div class="row mb-4" v-if="loaded">
        <div class="col-md-6 mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-white mb-0">Ordenes por Estado.</h5>
              </div>
            </div>
            <bar-chart ref="doughnutChart" :chart-data="status.chartData" v-if="loaded"></bar-chart>
          </card>
        </div>
        <div class="col-md-6 mb-5 mb-xl-0">
          <card type="ligth" header-classes="bg-transparent text-black">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-black-50 mb-0">Listado.</h5>
              </div>
            </div>
            <div class="table-responsive border-0">
              <base-table :data="dataStatus" v-if="loaded">
                <template slot="columns">
                  <th>Clave de recargo</th>
                  <th>Cantidad.</th>
                </template>
                <template slot-scope="{row}">
                  <th scope="row">{{row.user_status}}</th>
                  <td>{{row.cant}}</td>
                </template>
              </base-table>
            </div>
          </card>
        </div>
      </div>

      <div class="row mb-4" v-if="loaded">
        <div class="col-md-6 mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-white mb-0">Ordenes por Clave de Recargo.</h5>
              </div>
            </div>
            <pie-chart ref="barChart" :chart-data="charge.chartData" v-if="loaded"></pie-chart>
          </card>
        </div>
        <div class="col-md-6 mb-5 mb-xl-0">
          <card type="ligth" header-classes="bg-transparent text-black">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-black-50 mb-0">Listado.</h5>
              </div>
            </div>
            <div class="table-responsive border-0">
              <base-table :data="dataCharge" v-if="loaded" class="table-fixed">
                <template slot="columns">
                  <th>Clave de Recargo</th>
                  <th>Cantidad.</th>
                </template>

                <template slot-scope="{row}">
                  <th scope="row">{{row.charge_key}}</th>
                  <td>{{row.cant}}</td>
                </template>
              </base-table>
            </div>
          </card>
        </div>
      </div>

      <div class="row mb-4" v-if="loaded">
        <div class="col-md-6 mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-white mb-0">Ordenes por Zona.</h5>
              </div>
            </div>
            <pie-chart ref="barChart" :chart-data="zone.chartData" v-if="loaded"></pie-chart>
          </card>
        </div>
        <div class="col-md-6 mb-5 mb-xl-0">
          <card type="ligth" header-classes="bg-transparent text-black">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-black-50 mb-0">Listado.</h5>
              </div>
            </div>
            <div class="table-responsive border-0">
              <table class="table table-bordered table-fixed" v-if="loaded">
                <thead>
                  <tr>
                    <th>Zona.</th>
                    <th>Cantidad.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-bind:key="index" v-for="(row, index) in dataZones">
                    <td>{{row.zone}}</td>
                    <td>{{row.cant}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </card>
        </div>
      </div>
      <div class="row mb-4" v-if="loaded">
        <div class="col-md-6 mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-white mb-0">Ordenes Anuladas.</h5>
              </div>
            </div>
            <bar-chart
              ref="barChart"
              :chart-data="anulated.chartData"
              :extra-options="anulated.extraOptions"
              v-if="loaded"
            ></bar-chart>
          </card>
        </div>
        <div class="col-md-6 mb-5 mb-xl-0">
          <card type="ligth" header-classes="bg-transparent text-black">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-black-50 mb-0">Listado.</h5>
              </div>
            </div>
            <div class="table-responsive border-0">
              <table class="table table-bordered table-fixed" v-if="loaded">
                <thead>
                  <tr>
                    <th>Fecha.</th>
                    <th>Cantidad.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-bind:key="index" v-for="(row, index) in dataAnulated">
                    <td>{{row.entry_date}}</td>
                    <td>{{row.cant}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </card>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 m-2 mb-xl-0" v-if="loaded">
          <card type="ligth" header-classes="bg-transparent text-black">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-black-50 mb-0">Listado de ordenes vencidas sin atender.</h5>
              </div>
            </div>
            <div class="table-responsive border-0">
              <base-table :data="dataOlds">
                <template slot="columns">
                  <th># Orden</th>
                  <th>Cliente.</th>
                  <th>Zona.</th>
                  <th>Fecha.</th>
                  <th>Fecha Fin Extrema.</th>
                </template>

                <template slot-scope="{row}">
                  <th scope="row">{{row.order_number}}</th>
                  <td>{{row.client_id}}</td>
                  <td>{{row.zone}}</td>
                  <td>{{row.entry_date}}</td>
                  <td>{{row.extreme_end_date}}</td>
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

import LineChart from "@/components/Charts/LineChart";
import PieChart from "@/components/Charts/PieChart";
import BarChart from "@/components/Charts/BarChart";
import DoughnutChart from "@/components/Charts/DoughnutChart";

import { mapState } from "vuex";

export default {
  components: {
    LineChart,
    PieChart,
    BarChart,
    DoughnutChart
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
      anulated: {
        chartData: {
          labels: "Anuladas",
          datasets: [
            {
              label: [],
              data: [],
              borderColor: []
            }
          ],
          extraOptions: {
            tooltips: {
              backgroundColor: "#f5f5f5",
              titleFontColor: "#333",
              bodyFontColor: "#666",
              bodySpacing: 4,
              xPadding: 12,
              mode: "nearest",
              intersect: 0,
              position: "nearest"
            },
            responsive: true,
            scales: {
              yAxes: [
                {
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: "rgba(29,140,248,0.0)",
                    zeroLineColor: "transparent"
                  },
                  ticks: {
                    suggestedMin: 60,
                    suggestedMax: 125,
                    padding: 20,
                    fontColor: "#9e9e9e"
                  }
                }
              ],

              xAxes: [
                {
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: "rgba(29,140,248,0.1)",
                    zeroLineColor: "transparent"
                  },
                  ticks: {
                    padding: 20,
                    fontColor: "#9e9e9e"
                  }
                }
              ]
            }
          }
        }
      },
      zone: {
        chartData: {
          labels: [],
          datasets: [
            {
              label: [],
              data: [],
              backgroundColor: []
            }
          ]
        }
      },
      status: {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "",
              data: [],
              backgroundColor: []
            }
          ]
        }
      },
      olds: {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "",
              data: [],
              backgroundColor: []
            }
          ]
        },
        extraOptions: []
      },
      charge: {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "",
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
      dataCharge: [],
      dataZones: [],
      dataStatus: [],
      dataAnulated: [],
      dataOlds: [],
      users: [],
      user_id: ""
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
      this.$loading(true);
      this.loaded = false;
      let response = await this.getData();

      this.dataAnulated = response.anulated;
      this.dataZones = response.zone;
      this.dataCharge = response.charge;
      this.dataStatus = response.status;
      this.dataOlds = response.olds;

      this.anulated.chartData.labels = [];
      for (let item of this.anulated.chartData.datasets) {
        item.data = [];
      }
      for (let item of this.dataAnulated) {
        this.anulated.chartData.labels.push(item.entry_date);
        this.anulated.chartData.datasets[0].data.push(item.cant);
        // this.anulated.chartData.datasets[0].label.push(item.cant);
        // this.anulated.chartData.datasets[0].label.push(item.entry_date);
        // this.anulated.chartData.datasets[0].backgroundColor.push(
        //   this.getRandomColor()
        // );
      }

      this.status.chartData.labels = [];
      for (let item of this.status.chartData.datasets) {
        item.data = [];
        item.backgroundColor = [];
      }
      for (let item of this.dataStatus) {
        this.status.chartData.labels.push(item.user_status);
        this.status.chartData.datasets[0].data.push(item.cant);
        // this.status.chartData.datasets[0].label = item.user_status;
        let tempColor = this.getRandomColor();
        do {
          tempColor = this.getRandomColor();
        } while (
          this.status.chartData.datasets[0].backgroundColor.some(
            el => el === tempColor
          )
        );
        this.status.chartData.datasets[0].backgroundColor.push(tempColor);
      }

      this.zone.chartData.labels = [];
      for (let item of this.zone.chartData.datasets) {
        item.data = [];
        item.backgroundColor = [];
      }
      for (let item of this.dataZones) {
        this.zone.chartData.labels.push(item.zone);
        this.zone.chartData.datasets[0].data.push(item.cant);

        let tempColor = this.getRandomColor();
        do {
          tempColor = this.getRandomColor();
        } while (
          this.zone.chartData.datasets[0].backgroundColor.some(
            el => el === tempColor
          )
        );
        this.zone.chartData.datasets[0].backgroundColor.push(tempColor);
      }

      this.charge.chartData.labels = [];
      for (let item of this.charge.chartData.datasets) {
        item.data = [];
        item.backgroundColor = [];
      }
      for (let item of this.dataCharge) {
        this.charge.chartData.labels.push(item.charge_key);
        // this.charge.chartData.datasets[0].label = item.charge_key;
        this.charge.chartData.datasets[0].data.push(item.cant);
        this.charge.chartData.datasets[0].backgroundColor.push(
          this.getRandomColor()
        );
      }

      this.loaded = true;
      this.$loading(false);
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
          .getReportUser({
            user_id: this.user_id,
            date_from: this.from_date,
            date_to: this.to_date,
            role_id: this.user.role_id
          })
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getUsers() {
      return new Promise((resolve, reject) => {
        userServices
          .all_users()
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    async init() {
      let temp = await this.getUsers();
      let data = temp.data;
      let id = this.user.id;
      if (this.user.role_id === 1) {
        this.users = data;
      } else {
        let us = data.find(element => element.id === id);
        this.users.push(us);
      }
    }
  }
};
</script>
<style lang="scss">
</style>
