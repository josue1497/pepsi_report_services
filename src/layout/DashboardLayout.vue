<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Pepsi"
      title="Pepsi CO"
    >
      <template slot="links">

        <sidebar-item v-for="(link, i) in user_route" :key="i"
        :link="{
            name: link.text,
            icon: link.icon + ' text-orange',
            path: link.to
          }"> </sidebar-item>
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';
  import { mapState } from "vuex";


  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    computed:{
      ...mapState("userData", [
      "user",
      "user_logged",
      "access_token",
      "user_route"
    ])
    },
    data() {
      return {
        sidebarBackground: 'blue' //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
