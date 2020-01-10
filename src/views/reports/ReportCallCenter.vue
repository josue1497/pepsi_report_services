<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex md12 sm12 lg12>
        <material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          :responsive-options="emailsSubscriptionChart.responsiveOptions"
          color="tertiary"
          type="Line"
        >
          <h4 class="title font-weight-light">Contacto de Llamadas</h4>
          <p class="category d-block-flex font-weight-medium">
            <span class="warning--text">*</span>&nbsp;
            Llamadas atendidas.
            <br />
            <span class="red--text">*</span>&nbsp;
            Llamadas No Atendidas.
            <br />
            <span class="gray--text border">*</span>&nbsp;
            Llamadas Redirigidas.
          </p>

          <template slot="actions">
            <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
          </template>
        </material-chart-card>
      </v-flex>
      <v-flex md12 sm12 lg12>
        <material-chart-card
          :data="emailsSubscriptionChart.data"
          :options="emailsSubscriptionChart.options"
          :responsive-options="emailsSubscriptionChart.responsiveOptions"
          color="red"
          type="Line"
        >
          <h4 class="title font-weight-light">Contacto por Correo Electrónico</h4>
          <p class="category d-block-flex font-weight-medium">
            <span class="warning--text">*</span>&nbsp;
            Correos atendidos.
            <br />
            <span class="red--text">*</span>&nbsp;
            Correos No Atendidos.
            <br />
            <span class="gray--text border">*</span>&nbsp;
            Correos Redirigidos.
          </p>

          <template slot="actions">
            <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
          </template>
        </material-chart-card>
      </v-flex>
      <v-flex md12 sm12 lg12>
        <material-chart-card
          :data="dataCompletedTasksChart.data"
          :options="dataCompletedTasksChart.options"
          color="secondary"
          type="Line"
        >
          <h3 class="title font-weight-light">Contacto de Chat</h3>
          <p class="category d-block-flex font-weight-medium">
            <span class="warning--text">*</span>&nbsp;
            Mensajes de Chat atendidos.
            <br />
            <span class="red--text">*</span>&nbsp;
            Mensajes de Chat No Atendidos.
            <br />
            <span class="gray--text border">*</span>&nbsp;
            Mensajes de Chat Redirigidos.
          </p>

          <template slot="actions">
            <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">campaign sent 26 minutes ago</span>
          </template>
        </material-chart-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      dailySalesChart: {
        data: {
          labels: [
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado",
            "Domingo"
          ],
          series: [
            [12, 9, 7, 8, 9, 16],
            [2, 1, 5, 7, 6, 14, 10],
            [1, 3, 4, 5, 2, 4, 10]
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: [
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado",
            "Domingo"
          ],

          series: [
            [230, 750, 450, 700, 28, 241, 300],
            [330, 780, 160, 300, 80, 210, 20],
            [130, 740, 250, 360, 190, 140, 150]
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado",
            "Domingo"
          ],

          series: [
            [542, 743, 120, 432, 123, 554, 33],
            [442, 143, 820, 502, 542, 746, 676],
            [242, 643, 390, 231, 432, 100, 67]
          ]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      },
      headers: [
        {
          sortable: false,
          text: "ID",
          value: "id"
        },
        {
          sortable: false,
          text: "Name",
          value: "name"
        },
        {
          sortable: false,
          text: "Salary",
          value: "salary",
          align: "right"
        },
        {
          sortable: false,
          text: "Country",
          value: "country",
          align: "right"
        },
        {
          sortable: false,
          text: "City",
          value: "city",
          align: "right"
        }
      ],
      items: [
        {
          name: "Dakota Rice",
          country: "Niger",
          city: "Oud-Tunrhout",
          salary: "$35,738"
        },
        {
          name: "Minerva Hooper",
          country: "Curaçao",
          city: "Sinaai-Waas",
          salary: "$23,738"
        },
        {
          name: "Sage Rodriguez",
          country: "Netherlands",
          city: "Overland Park",
          salary: "$56,142"
        },
        {
          name: "Philip Chanley",
          country: "Korea, South",
          city: "Gloucester",
          salary: "$38,735"
        },
        {
          name: "Doris Greene",
          country: "Malawi",
          city: "Feldkirchen in Kārnten",
          salary: "$63,542"
        }
      ],
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      }
    };
  },
  methods: {
    complete(index) {
      this.list[index] = !this.list[index];
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
