<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Iniciar Sesión</small>
          </div>
          <form role="form">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="model.email"
            ></base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
            ></base-input>
            <div class="text-center">
              <base-button
                type="primary"
                class="btn-pepsi-secondary my-4"
                @click="sing_in"
              >Iniciar Sesión</base-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import global from "@/constants/GlobalConstants";
// import loader from "@/components/core/Loader.vue";
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "login",
  mounted() {
    this.$loading(false);
  },
  data() {
    return {
      model: {
        email: "",
        password: ""
      },
      loader: false,
      show_toaster: false,
      login_message: ""
    };
  },
  computed: {
    ...mapGetters(["userData"])
  },
  methods: {
    async sing_in() {
      this.$loading(true);
      this.loader = true;
      try {
        const response = await this.$store.dispatch("userData/login", {
          email: this.model.email,
          password: this.model.password
        });
        if (this.userData.user_logged) {
          if (this.userData.user.role_id === 1) {
            this.$router.push("admin/dashboard");
          } else {
            this.$router.push("user/dashboard");
          }
          this.loader = false;
        } else {
          this.$vToastify.error(response.message, "Error");
        }
      } catch (error) {
        this.$vToastify.error(error, "Error");
        this.$loading(false);
      }
      this.$loading(false);
    }
  }
};
</script>
<style>
</style>
