<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="green"
          icon="mdi-phone"
          title="Importador"
          value="Call Center"
          sub-icon="mdi-link"
          sub-text="Ir a..."
          route-link="/admin/call-center-import"
          description="Esta es la descripcion de un nuevo articulo"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="orange"
          icon="mdi-cube"
          title="Estado"
          value="de Equipos"
          small-value=""
          sub-icon="mdi-link"
          sub-text="Ir a..."
          route-link="/admin/kit-report"
          description="Esta es la descripcion de un nuevo articulo"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="red"
          icon="mdi-calendar"
          title="Historico de"
          value="Equipos"
          sub-icon="mdi-link"
          sub-text="Ir a..."
          route-link="/admin/kit-detail-import"
          description="Esta es la descripcion de un nuevo articulo"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style lang="scss" scoped>
</style>
<script>
export default {
  data() {
    return {
     
  }
  },
  methods: {
    complete(index) {
      this.list[index] = !this.list[index];
    }
  }
};
</script>