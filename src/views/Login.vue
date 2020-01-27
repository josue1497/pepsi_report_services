<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <!-- <div class="card-header bg-transparent pb-5">
                        <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
                        <div class="btn-wrapper text-center">
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
                                <span class="btn-inner--text">Github</span>
                            </a>
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                                <span class="btn-inner--text">Google</span>
                            </a>
                        </div>
        </div>-->
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

            <!-- <base-checkbox class="custom-control-alternative" :checked="true">
                                <span class="text-muted">Remember me</span>
            </base-checkbox>-->
            <div class="text-center">
              <base-button type="primary" class="btn-pepsi-secondary my-4" @click="sing_in">Iniciar Sesión</base-button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light">
            <small>¿Haz olvidado tu contraseña?</small>
          </a>
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
  mounted(){
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
      console.log("login action");
      this.loader = true;
      try {
        const response = await this.$store.dispatch("userData/login", {
          email: this.model.email,
          password: this.model.password
        });
        if (this.userData.user_logged) {
          console.log(this.userData.user);
          this.loader = false;
          this.$router.push("admin/dashboard");
        } else {
          this.show_toaster = true;
          this.loader = true;
        }
      } catch (error) {
        console.log(error.response.data.error);
        this.login_message = error.response.data.error;
        this.show_toaster = true;
        this.loader = false;
      }
    }
  }
  // components: {
  //   loader
  // }
};
</script>
<style>
</style>
