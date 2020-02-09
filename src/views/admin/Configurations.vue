<template>
  <div class="w-100">
    <base-header type="gradient-blue" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
    </base-header>
    <div class="container-fluid mt--7">
      <div class="card">
        <div class="card-header font-weight-600">Parametros de Configuracion</div>
        <div class="card-body">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="meta_call">Meta Mensual Para Call Center.</label>
                  <input
                    type="number"
                    class="form-control"
                    name="meta_call_month"
                    id="meta_call_month"
                    v-model="goal_calls"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="meta_call_day">Meta Diaria Para Atencion de Ordenes.</label>
                  <input
                    type="number"
                    class="form-control"
                    name="meta_call_day"
                    id="meta_call_day"
                    v-model="goal_orders"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group justify-content-end">
                  <button class="btn btn-pepsi-primary" @click="processSave">Guardar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#lateral .v-btn--example {
  bottom: 0;
  position: absolute;
  margin: 0 -0.5% -3.5% 0%;
}
</style>

<script>
import configurationService from "../../services/configurationServices";
export default {
  data: () => ({
    data: [],
    goal_orders: 0,
    goal_calls: 0
  }),
  computed: {},
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    save(data) {
      return new Promise((resolve, reject) => {
        configurationService
          .saveConfig(data)
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    async processSave() {
      this.$loading(true);
      console.log("validations");

      if (!this.goal_calls) {
        this.$vToastify.error(
          "Debe añadir un valor para la Meta de Call Center",
          "Error:"
        );
        this.$loading(false);
        return;
      }
      if (!this.goal_orders) {
        this.$vToastify.error(
          "Debe añadir un valor para la Meta de Ordenes por atender",
          "Error:"
        );
        this.$loading(false);
        return;
      }

      if (!parseInt(this.goal_calls)) {
        this.$vToastify.error(
          "El valor ingresado en 'Meta Mensual Para Call Center' no es un Número",
          "Error:"
        );
        this.$loading(false);
        return;
      }

      if (!parseInt(this.goal_orders)) {
        this.$vToastify.error(
          "El valor ingresado en 'Meta Diaria Para Atencion de Ordenes.' no es un Número",
          "Error:"
        );
        this.$loading(false);
        return;
      }

      let response1 = await this.save({
        param_name: "goal_calls",
        goal_value: this.goal_calls
      });
      console.log(response1);
      if (response1.status === 200) {
        this.$vToastify.success("Configuracion Guardada", "Exito");
      } else {
        this.$vToastify.error("Error al guardar la configuración", "Error:");
      }

      let response2 = await this.save({
        param_name: "goal_orders",
        goal_value: this.goal_orders
      });
      console.log(response2);

      if (response1.status === 200) {
        this.$vToastify.success("Configuracion Guardada", "Exito");
      } else {
        this.$vToastify.error("Error al guardar la configuración", "Error:");
      }

      this.$loading(false);
    },
    getAll() {
      return new Promise((resolve, reject) => {
        configurationService
          .getAll()
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    async matchingConfigs() {
      this.$loading(true);

      let response = await this.getAll();
      console.log(response);
      let goalCall = response.data.find(
        element => element.name === "goal_calls"
      );

      if (goalCall) {
        this.goal_calls = goalCall.value;
      }

      let goalOrders = response.data.find(
        element => element.name === "goal_orders"
      );

      if (goalOrders) {
        this.goal_orders = goalOrders.value;
      }

      this.$loading(false);
    }
  },
  mounted() {
    this.matchingConfigs();
    this.$loading(false);
  }
};
</script>
