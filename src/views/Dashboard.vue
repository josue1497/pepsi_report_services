<template>
  <div>
    <base-header type="gradient-pepsi-secondary" class="pb-5 pb-8 pt-4 pt-md-6">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Llamadas atendidas"
            type="gradient-red"
            :sub-title="total_calls_current"
            icon="ni ni-active-40"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span :class="(!call_current)?'text-success mr-2 ':'text-danger mr-2 '">
                <i :class="(!call_current)?'fa fa-arrow-up':' fa fa-arrow-down'"></i>
                {{total_calls_last}}
              </span>
              <span class="text-nowrap">Ultimo mes</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Ordenes Procesadas"
            type="gradient-orange"
            :sub-title="total_orders_currents"
            icon="ni ni-chart-pie-35"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span :class="(!order_current)?'text-success mr-2 ':'text-danger mr-2 '">
                <i :class="(!order_current)?'fa fa-arrow-up':' fa fa-arrow-down'"></i>
                {{total_orders_last}}
              </span>
              <span class="text-nowrap">Ultimo mes</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Llamadas no atendidas"
            type="gradient-green"
            :sub-title="total_calls_r_current"
            icon="ni ni-money-coins"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span :class="(!call_r_current)?'text-success mr-2 ':'text-danger mr-2 '">
                <i :class="(!call_r_current)?'fa fa-arrow-up':' fa fa-arrow-down'"></i>
                {{total_calls_r_last}}
              </span>
              <span class="text-nowrap">Ultimo mes</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Ordenes Anuladas"
            type="gradient-info"
            :sub-title="total_orders_a_current"
            icon="ni ni-chart-bar-32"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span :class="(!order_a_current)?'text-success mr-2 ':'text-danger mr-2 '">
                <i :class="(!order_a_current)?'fa fa-arrow-up':' fa fa-arrow-down'"></i>
                {{total_orders_a_last}}
              </span>
              <span class="text-nowrap">Ultimos mes</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-8 mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-light text-uppercase ls-1 mb-1">Ordenes atendidas</h6>
                <h5 class="h3 text-white mb-0">Ultimos 5 dias habiles.</h5>
              </div>
            </div>
            <line-chart
              v-if="loaded"
              :height="350"
              ref="bigChart"
              :chart-data="bigLineChart.chartData"
              :extra-options="bigLineChart.extraOptions"
            ></line-chart>
          </card>
        </div>

        <div class="col-xl-4">
          <card header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">Call Center</h6>
                <h5 class="h3 mb-0">Ultimos 5 dias habiles</h5>
              </div>
            </div>

            <bar-chart
              v-if="loaded"
              :height="350"
              ref="barChart"
              :chart-data="redBarChart.chartData"
            ></bar-chart>
          </card>
        </div>
      </div>
      <!-- End charts-->

      <!--Tables-->
      <div class="row mt-5">
        <div class="col-xl-6 mb-5 mb-xl-0">
          <page-visits-table :table_data="data_best_orders"></page-visits-table>
        </div>
        <div class="col-xl-6">
          <social-traffic-table :table_data="data_best_calls"></social-traffic-table>
        </div>
      </div>
      <!--End tables-->
    </div>
  </div>
</template>
<script>
// Charts
import * as chartConfigs from "@/components/Charts/config";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";

// Tables
import SocialTrafficTable from "./Dashboard/SocialTrafficTable";
import PageVisitsTable from "./Dashboard/PageVisitsTable";

import reportServices from "./../services/reportServices";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  components: {
    LineChart,
    BarChart,
    PageVisitsTable,
    SocialTrafficTable
  },
  computed: {
    ...mapState("userData", [
      "user",
      "user_logged",
      "access_token",
      "user_route"
    ])
  },
  data() {
    return {
      bigLineChart: {
        activeIndex: 0,
        chartData: {
          datasets: [
            {
              label: "Ordenes Atendidas",
              data: []
            }
          ],
          labels: []
        },
        extraOptions: [],
        annotation: {
          annotations: [
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: 5,
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 4,
              label: {
                enabled: false,
                content: "Test label"
              }
            }
          ]
        }
      },
      redBarChart: {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "Llamadas Atendidas",
              data: [],
              backgroundColor: [],
              borderColor: []
            },
            {
              label: "Meta",
              data: [],
              borderColor: [],
              backgroundColor: []
            }
          ]
        }
      },
      data_total_calls_m: [],
      data_total_calls_r: [],
      data_total_orders_m: [],
      data_total_orders_a: [],
      data_best_calls: [],
      data_best_orders: [],
      data_calls_by_dates: [],
      data_orders_by_dates: [],

      total_calls_current: 0,
      total_calls_last: 0,
      call_current: false,

      total_orders_currents: 0,
      total_orders_last: 0,
      order_current: false,

      total_calls_r_current: 0,
      total_calls_r_last: 0,
      call_r_current: false,

      total_orders_a_current: 0,
      total_orders_a_last: 0,
      order_a_current: false,

      loaded: false
    };
  },
  methods: {
    initBigChart(index) {
      let chartData = {
        datasets: [
          {
            label: "Performance",
            data: this.bigLineChart.allData[index]
          },
          {
            label: "Performance",
            data: this.bigLineChart.allData[1]
          }
        ],
        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      };
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
    getData(data) {
      return new Promise((resolve, reject) => {
        reportServices
          .getDashboardData(data)
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
    async processData() {
      this.$loading(true);
      this.loaded = false;
      console.log(this.user);
      let response = await this.getData({user_id: this.user.id, role_id: this.user.role_id});
      console.log(response);

      this.data_total_calls_m = response.data_call_manage;
      this.total_calls_current = this.data_total_calls_m[1]
        ? this.data_total_calls_m[1].cant
        : 0;
      this.call_current =
        this.data_total_calls_m[0].cant > this.data_total_calls_m[1]
          ? this.data_total_calls_m[1].cant
          : 0;
      this.total_calls_last =
        this.data_total_calls_m[0].cant - this.data_total_calls_m[1]
          ? this.data_total_calls_m[1].cant
          : 0;

      this.data_total_calls_r = response.data_call_rejected;
      this.total_calls_r_current = this.data_total_calls_r[1]
        ? this.data_total_calls_r[1].cant
        : 0;
      this.call_r_current =
        this.data_total_calls_r[0].cant > this.data_total_calls_r[1]
          ? this.data_total_calls_r[1].cant
          : 0;
      this.total_calls_r_last =
        this.data_total_calls_r[0].cant - this.data_total_calls_r[1]
          ? this.data_total_calls_r[1].cant
          : 0;

      this.data_total_orders_m = response.data_orders_total;
      this.total_orders_currents = this.data_total_orders_m[1]
        ? this.data_total_orders_m[1].cant
        : 0;
      this.order_current =
        this.data_total_orders_m[0].cant > this.data_total_orders_m[1]
          ? this.data_total_orders_m[1].cant
          : 0;

      this.total_orders_last =
        this.data_total_orders_m[0].cant - this.data_total_orders_m[1]
          ? this.data_total_orders_m[1].cant
          : 0;

      this.data_total_orders_a = response.data_order_anuladas;
      this.total_orders_a_current = this.data_total_orders_a[0]
        ? this.data_total_orders_a[0].cant
        : 0;
      this.total_orders_a_last = this.data_total_orders_a[1]
        ? this.data_total_orders_a[1].cant
        : 0;

      this.data_best_calls = response.data_call_best;
      this.data_best_orders = response.data_order_best;

      this.data_calls_by_dates = response.data_call_by_date;
      this.data_orders_by_dates = response.data_order_by_date;

      for (let item of this.data_orders_by_dates) {
        this.bigLineChart.chartData.datasets[0].data.push(item.cant);
        this.bigLineChart.chartData.labels.push(item.entry_date);
      }

      for (let item of this.data_calls_by_dates) {
        this.redBarChart.chartData.datasets[0].data.push(item.cant);
        this.redBarChart.chartData.datasets[0].borderColor.push("#000e93");
        this.redBarChart.chartData.datasets[0].backgroundColor.push("#000e93");

        this.redBarChart.chartData.datasets[1].data.push(90);
        this.redBarChart.chartData.datasets[1].borderColor.push("#e42934");
        this.redBarChart.chartData.datasets[1].backgroundColor.push("#e42934");

        this.redBarChart.chartData.labels.push(item.date);
      }

      this.loaded = true;
      this.$loading(false);
    }
  },
  mounted() {
    this.processData();
  }
};
</script>
<style></style>
