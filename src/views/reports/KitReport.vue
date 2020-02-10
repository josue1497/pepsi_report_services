<template>
  <div class="w-100">
    <base-header type="pepsi-primary" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="row justify-content-start d-print-none">
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
      <div class="row mb-4" v-if="loaded">
        <div class="col-md-6 mb-5 mb-xl-0 " id="recargo">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-white mb-0">Clave de Recargo.</h5>
              </div>
            </div>
            <pie-chart ref="barChart" :chart-data="charge_key_chart.chartData" v-if="loaded"></pie-chart>
          </card>
        </div>
        <div class="col-md-6 mb-5 mb-xl-0 d-print-none">
          <card type="ligth" header-classes="bg-transparent text-black">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-black-50 mb-0">Listado.</h5>
              </div>
            </div>
            <div class="table-responsive border-0">
              <base-table :data="dataChargeKey" v-if="loaded">
                <template slot="columns">
                  <th>Clave de recargo</th>
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
        <div class="col-md-6 mb-5 mb-xl-0 ">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-white mb-0">Estado de Ordenes.</h5>
              </div>
            </div>
            <pie-chart ref="barChart" :chart-data="status_chart.chartData" v-if="loaded"></pie-chart>
          </card>
        </div>
        <div class="col-md-6 mb-5 mb-xl-0 d-print-none">
          <card type="ligth" header-classes="bg-transparent text-black">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-black-50 mb-0">Listado.</h5>
              </div>
            </div>
            <div class="table-responsive border-0">
              <base-table :data="dataStatus" v-if="loaded" class="table-fixed">
                <template slot="columns">
                  <th>Tipo de Orden</th>
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
                <h5 class="h3 text-white mb-0">Tipo de Ordenes.</h5>
              </div>
            </div>
            <line-chart ref="barChart" :chart-data="order_class_chart.chartData" v-if="loaded"></line-chart>
          </card>
        </div>
        <div class="col-md-6 mb-5 mb-xl-0 d-print-none">
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
                    <th>Tipo de orden.</th>
                    <th>Fecha de la Orden.</th>
                    <th>Cantidad.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-bind:key="index" v-for="(row, index) in dataOrderClass">
                    <td>{{row.name}}</td>
                    <td>{{row.entry_date}}</td>
                    <td>{{row.cant}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </card>
        </div>
      </div>
      <div class="row mb-4" v-if="loaded">
        <div class="col-md-6 mb-5 mb-xl-0 d-print-none">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-white mb-0">Ordenes Anuladas.</h5>
              </div>
            </div>
            <line-chart ref="barChart" :chart-data="chart_cancelled.chartData" v-if="loaded"></line-chart>
          </card>
        </div>
        <div class="col-md-6 mb-5 mb-xl-0 d-print-none">
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
                    <th>Fecha de la Orden.</th>
                    <th>Cantidad.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-bind:key="index" v-for="(row, index) in dataCancelled">
                    <td>{{row.entry_date}}</td>
                    <td>{{row.cant}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </card>
        </div>
      </div>
    </base-header>
  </div>
</template>
<script>
import reportServices from "./../../services/reportServices";

import LineChart from "@/components/Charts/LineChart";
import PieChart from "@/components/Charts/PieChart";

import { mapState } from "vuex";

export default {
  components: {
    LineChart,
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
      chart_cancelled: {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "Anuladas",
              data: [],
              borderColor: []
            }
          ]
        }
      },
      status_chart: {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "Asignados",
              data: [],
              backgroundColor: []
            },
            {
              label: "Atendidos",
              data: [],
              backgroundColor: []
            }
          ]
        }
      },
      charge_key_chart: {
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
      order_class_chart: {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "ZPMI",
              data: [],
              borderColor: []
            },
            {
              label: "ZPMC",
              data: [],
              borderColor: []
            },
            {
              label: "ZPMR",
              data: [],
              borderColor: []
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
      dataChargeKey: [],
      dataOrderClass: [],
      dataStatus: [],
      dataCancelled: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    complete(index) {
      this.list[index] = !this.list[index];
    },
    imprSelec(nombre) {
      var ficha = document.getElementById(nombre);
      var ventimp = window.open(" ", "popimpr");
      ventimp.document.write(ficha.innerHTML);
      ventimp.document.close();
      ventimp.print();
      ventimp.close();
    },
    async show_alert() {
      this.loaded = false;
      let response = await this.getData();
      console.log(response);
      this.dataOrderClass = response.data_order_class;
      this.dataStatus = response.data_status;
      this.dataCancelled = response.data_cancelled;
      this.dataChargeKey = response.data_charge_key;

      this.charge_key_chart.chartData.labels = [];
      for (let item of this.charge_key_chart.chartData.datasets) {
        item.data = [];
      }
      for (let item of this.dataChargeKey) {
        this.charge_key_chart.chartData.labels.push(item.charge_key);
        this.charge_key_chart.chartData.datasets[0].data.push(item.cant);
        this.charge_key_chart.chartData.datasets[0].label.push(item.charge_key);
        this.charge_key_chart.chartData.datasets[0].backgroundColor.push(
          this.getRandomColor()
        );
      }

      this.status_chart.chartData.labels = [];
      for (let item of this.status_chart.chartData.datasets) {
        item.data = [];
      }
      for (let item of this.dataStatus) {
        this.status_chart.chartData.labels.push(item.user_status);
        this.status_chart.chartData.datasets[0].data.push(item.cant);
        this.status_chart.chartData.datasets[0].backgroundColor.push(
          this.getRandomColor()
        );
      }

      this.order_class_chart.chartData.labels = [];
      for (let item of this.order_class_chart.chartData.datasets) {
        item.data = [];
      }
      for (let item of this.dataOrderClass) {
        let index = this.getKeyByValue(
          this.order_class_chart.chartData.labels,
          item.entry_date
        );
        if (!index)
          this.order_class_chart.chartData.labels.push(item.entry_date);

        switch (item.name) {
          case "ZPMI": {
            this.order_class_chart.chartData.datasets[0].data.push(item.cant);
            this.order_class_chart.chartData.datasets[0].borderColor.push(
              this.getRandomColor()
            );
            break;
          }
          case "ZPMC": {
            this.order_class_chart.chartData.datasets[1].data.push(item.cant);
            this.order_class_chart.chartData.datasets[1].borderColor.push(
              this.getRandomColor()
            );
            break;
          }
          case "ZPMR": {
            this.order_class_chart.chartData.datasets[2].data.push(item.cant);
            this.order_class_chart.chartData.datasets[2].borderColor.push(
              this.getRandomColor()
            );
            break;
          }
          default: {
            break;
          }
        }
      }

      this.chart_cancelled.chartData.labels = [];
      for (let item of this.chart_cancelled.chartData.datasets) {
        item.data = [];
      }
      for (let item of this.dataCancelled) {
        let index = this.getKeyByValue(
          this.chart_cancelled.chartData.labels,
          item.entry_date
        );
        if (!index) this.chart_cancelled.chartData.labels.push(item.entry_date);

        this.chart_cancelled.chartData.labels.push(item.entry_date);
        this.chart_cancelled.chartData.datasets[0].data.push(item.cant);
        this.chart_cancelled.chartData.datasets[0].borderColor.push(
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
          .get_GeneralIndicators({
            site: this.site,
            from_date: this.from_date,
            to_date: this.to_date,
            user_id: this.user.id,
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
    getZones() {
      return new Promise((resolve, reject) => {
        reportServices
          .getZones()
          .then(response => {
            resolve(response);
          })
          .catch(err => {
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
