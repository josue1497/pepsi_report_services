<template>
  <div>
    <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center">
      <!-- Mask -->
      <span :class="'mask '+((user.role_id===1)?' bg-gradient-danger ':' bg-gradient-primary')"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Hola {{user.name}}</h1>
            <p
              class="text-white mt-0 mb-5"
            >This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
            <div class="d-flex flex-row justify-content-start">
              <button @click="update" class="btn btn-pepsi-primary">Guardar información</button>
              <button @click="open" class="btn btn-pepsi-secondary">Cambiar Contraseña</button>
            </div>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-4 order-xl-2">
          <div class="card card-profile shadow">
            <div class="card-header text-center border-0">
              <div class="d-flex justify-content-between">
                <h3 class="text-mutted text-center">Estadisticas</h3>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <div class="card-profile-stats d-flex justify-content-center">
                    <div>
                      <span class="heading">22</span>
                      <span class="description">Llamadas Atendidas</span>
                    </div>
                    <div>
                      <span class="heading">10</span>
                      <span class="description">Ordenes Procesadas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-8 order-xl-1">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Mi Cuenta</h3>
                </div>
              </div>
            </div>
            <template>
              <h6 class="heading-small text-muted mb-4">Información</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg-12">
                    <base-input
                      label="Cédula de Identidad"
                      placeholder="Cédula de Identidad"
                      v-model="user.identification_document"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <base-input label="Nombres" placeholder="Nombres" v-model="user.name" />
                  </div>
                  <div class="col-lg-6">
                    <base-input label="Apellidos" placeholder="Apellidos" v-model="user.lastname" />
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <!-- Address -->
              <h6 class="heading-small text-muted mb-4">Información de Contacto</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-md-12">
                    <base-input label="Usuario" placeholder="Usuario" v-model="user.username" />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      label="Correo Electrónico"
                      placeholder="Correo Electrónico"
                      type="email"
                      v-model="user.email"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    <base-input
                      alternative
                      label="Numero de Teléfono"
                      type="phone"
                      placeholder="Numero de Teléfono"
                      v-model="user.phone_number"
                    />
                  </div>
                </div>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
    <modal :show="dialog" :showClose="true">
      <template slot="header">
        <div class="d-flex align-content-center">
          <h3>Cambiar Contraseña:</h3>
        </div>
      </template>
      <template slot="close-button">
        <button
          type="button"
          class="close"
          v-if="true"
          @click="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span :aria-hidden="!show">×</span>
        </button>
      </template>
      <template slot="modal-body">
        <div>
          <div class="row my-2">
            <div class="col">
              <input
                type="password"
                class="form-control"
                placeholder="Contraseña Actual:"
                v-model="old_pass"
              />
            </div>
          </div>
          <div class="row my-2">
            <div class="col">
              <input
                type="password"
                class="form-control"
                placeholder="Nueva Contraseña:"
                v-model="new_pass"
              />
            </div>
            <div class="col">
              <input
                type="password"
                class="form-control"
                placeholder="Apellidos:"
                v-model="confirm_pass"
              />
            </div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <div class="d-flex align-content-center">
          <button class="btn btn-pepsi-tertiary" @click="close">Cancelar</button>
          <button class="btn btn-pepsi-primary" @click="changePassword">Guardar</button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import userServices from "../../services/userServices";

export default {
  name: "user-profile",
  computed: {
    ...mapState("userData", [
      "user",
      "user_logged",
      "access_token",
      "user_route"
    ]),
    ...mapGetters(["userData"])
  },
  data() {
    return {
      old_pass: "",
      new_pass: "",
      confirm_pass: "",
      dialog: false
    };
  },
  mounted() {
    this.$loading(false);
  },
  methods: {
    async update() {
      this.$loading(true);
      try {
        console.log(this.user);
        const response = await this.$store.dispatch(
          "userData/update",
          this.user
        );

        this.$vToastify.success("Información Actualizada", "Información");
        this.$loading(false);
      } catch (error) {
        this.$vToastify.error(error, "Información");
        this.$loading(false);
      }
    },
    async changePassword() {
      if (!this.old_pass) {
        this.$vToastify.error(
          "Debe señalar la contraseña que desea cambiar",
          "Error:"
        );
        return;
      }
      if (!this.new_pass) {
        this.$vToastify.error("Debe colocar una nueva contraseña", "Error:");
        return;
      }
      if (!this.confirm_pass) {
        this.$vToastify.error(
          "Debe confimar la contraseña que desea actualizar",
          "Error:"
        );
        return;
      }
      if (this.new_pass !== this.confirm_pass) {
        this.$vToastify.error(
          "Las contraseñas no coinciden, por favor verifique",
          "Error:"
        );
        return;
      }

      this.$loading(true);

      let response = await this.change_password({
        user_id: this.user.id,
        old_pass: this.old_pass,
        new_pass: this.new_pass
      });

      if (response.status === 200) {
        this.$vToastify.success("Información Actualizada", "Información");
      } else {
        this.$vToastify.error(response.message, "Error:");
      }
      this.close();

      this.$loading(false);
    },
    change_password(data) {
      return new Promise((resolve, reject) => {
        userServices
          .changePassword(data)
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
    open() {
      this.dialog = true;
    },
    close() {
      this.old_pass = "";
      this.new_pass = "";
      this.confirm_pass = "";
      this.dialog = false;
    }
  }
};
</script>
<style></style>
