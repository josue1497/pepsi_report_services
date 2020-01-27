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
              <label for="user_id" class="text-white">Operador</label>
              <select name="user_id" id="user_id" class="form-control" v-model="user_id">
                <option
                  v-bind:key="index"
                  v-for="(user, index) in users"
                  :value="user.id">{{user.name}} {{user.lastname}}</option>
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
      <!-- chart de llamadas -->
      <div class="row mb-4" v-if="loaded">
        <div class="col-md-12 mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-white mb-0">Grafico de Llamadas.</h5>
              </div>
            </div>
            <bar-chart :height="350" ref="barChart" :chart-data="cc_chart.chartData" v-if="loaded"></bar-chart>
          </card>
        </div>
      </div>
      <!-- chart de chats -->
      <div class="row mb-4" v-if="loaded">
        <div class="col-md-12 mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-white mb-0">Grafico de Chats.</h5>
              </div>
            </div>
            <bar-chart :height="350" ref="barChart" :chart-data="ch_chart.chartData" v-if="loaded"></bar-chart>
          </card>
        </div>
      </div>
      <!-- chart de emails -->
      <div class="row mb-4" v-if="loaded">
        <div class="col-md-12 mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-white mb-0">Grafico de Correos Electronicos.</h5>
              </div>
            </div>
            <bar-chart :height="350" ref="barChart" :chart-data="em_chart.chartData" v-if="loaded"></bar-chart>
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

export default {
  components: {
    LineChart,
    BarChart
  },
  mounted(){
    this.$loading(false);
  },
  data() {
    return {
      cc_chart: {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "Asignadas",
              data: [],
              backgroundColor: [
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)"
              ]
            },
            {
              label: "Atendidas",
              data: [],
              backgroundColor: [
                "rgba(54, 162, 235)",
                "rgba(54, 162, 235)",
                "rgba(54, 162, 235)",
                "rgba(54, 162, 235)",
                "rgba(54, 162, 235)",
                "rgba(54, 162, 235)",
                "rgba(54, 162, 235)"
              ]
            },
            {
              label: "Rechazadas",
              data: [],
              backgroundColor: [
                "rgba(75, 192, 192)",
                "rgba(75, 192, 192)",
                "rgba(75, 192, 192)",
                "rgba(75, 192, 192)",
                "rgba(75, 192, 192)",
                "rgba(75, 192, 192)",
                "rgba(75, 192, 192)"
              ]
            },
            {
              label: "Buzon de voz",
              data: [],
              backgroundColor: [
                "rgba(153, 102, 255)",
                "rgba(153, 102, 255)",
                "rgba(153, 102, 255)",
                "rgba(153, 102, 255)",
                "rgba(153, 102, 255)",
                "rgba(153, 102, 255)",
                "rgba(153, 102, 255)"
              ]
            },
            {
              label: "Perdidas",
              data: [],
              backgroundColor: [
                "rgba(255, 159, 64)",
                "rgba(255, 159, 64)",
                "rgba(255, 159, 64)",
                "rgba(255, 159, 64)",
                "rgba(255, 159, 64)",
                "rgba(255, 159, 64)",
                "rgba(255, 159, 64)"
              ]
            },
            {
              label: "No atendidas",
              data: [],
              backgroundColor: [
                "rgba(255, 152, 62)",
                "rgba(255, 152, 62)",
                "rgba(255, 152, 62)",
                "rgba(255, 152, 62)",
                "rgba(255, 152, 62)",
                "rgba(255, 152, 62)",
                "rgba(255, 152, 62)"
              ]
            },
            {
              label: "SMS",
              data: [],
              backgroundColor: [
                "rgba(255, 206, 86)",
                "rgba(255, 206, 86)",
                "rgba(255, 206, 86)",
                "rgba(255, 206, 86)",
                "rgba(255, 206, 86)",
                "rgba(255, 206, 86)",
                "rgba(255, 206, 86)"
              ]
            }
          ]
        }
      },
      ch_chart: {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "Asignados",
              data: [],
              backgroundColor: [
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)"
              ]
            },
            {
              label: "Atendidos",
              data: [],
              backgroundColor: [
                "rgba(54, 162, 235)",
                "rgba(54, 162, 235)",
                "rgba(54, 162, 235)",
                "rgba(54, 162, 235)",
                "rgba(54, 162, 235)",
                "rgba(54, 162, 235)",
                "rgba(54, 162, 235)"
              ]
            }
          ]
        }
      },
      em_chart: {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "Asignados",
              data: [],
              backgroundColor: [
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)"
              ]
            },
            {
              label: "Atendidos",
              data: [],
              backgroundColor: [
                "rgba(54, 162, 235)",
                "rgba(54, 162, 235)",
                "rgba(54, 162, 235)",
                "rgba(54, 162, 235)",
                "rgba(54, 162, 235)",
                "rgba(54, 162, 235)",
                "rgba(54, 162, 235)"
              ]
            },
            {
              label: "Desviados",
              data: [],
              backgroundColor: [
                "rgba(75, 192, 192)",
                "rgba(75, 192, 192)",
                "rgba(75, 192, 192)",
                "rgba(75, 192, 192)",
                "rgba(75, 192, 192)",
                "rgba(75, 192, 192)",
                "rgba(75, 192, 192)"
              ]
            }
          ]
        }
      },
      loaded: false,
      user_id: 0,
      from_date: "",
      to_date: "",
      users: [],
      dataCallCenter: [],
      dataEmails: [],
      dataChats: []
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

      let response = await this.getData();

      this.dataCallCenter = response.call_data;
      this.dataChats = response.chat_data;
      this.dataEmails = response.email_data;

      this.cc_chart.chartData.labels = [];
      for (let item of this.cc_chart.chartData.datasets) {
        item.data = [];
      }
      for (let item of this.dataCallCenter) {
        this.cc_chart.chartData.labels.push(item.date);
        this.cc_chart.chartData.datasets[0].data.push(item.call_assigned);
        this.cc_chart.chartData.datasets[1].data.push(item.call_managed);
        this.cc_chart.chartData.datasets[2].data.push(item.call_reject);
        this.cc_chart.chartData.datasets[3].data.push(item.call_inquiry);
        this.cc_chart.chartData.datasets[4].data.push(item.call_outgoing);
        this.cc_chart.chartData.datasets[5].data.push(item.call_unattended);
        this.cc_chart.chartData.datasets[6].data.push(item.sms);
      }

      this.ch_chart.chartData.labels = [];
      for (let item of this.ch_chart.chartData.datasets) {
        item.data = [];
      }
      for (let item of this.dataChats) {
        this.ch_chart.chartData.labels.push(item.date);
        this.ch_chart.chartData.datasets[0].data.push(item.chat_assigned);
        this.ch_chart.chartData.datasets[1].data.push(item.chat_managed);
      }

      this.em_chart.chartData.labels = [];
      for (let item of this.em_chart.chartData.datasets) {
        item.data = [];
      }
      for (let item of this.dataEmails) {
        this.em_chart.chartData.labels.push(item.date);
        this.em_chart.chartData.datasets[0].data.push(item.email_assigned);
        this.em_chart.chartData.datasets[1].data.push(item.email_managed);
        this.em_chart.chartData.datasets[2].data.push(item.email_outgoing);
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
          .get_callCenterData({
            user_id: this.user_id,
            from_date: this.from_date,
            to_date: this.to_date
          })
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
    getUsers() {
      return new Promise((resolve, reject) => {
        userServices
          .all_users()
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
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
