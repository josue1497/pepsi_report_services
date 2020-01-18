<template>
  <!-- <v-container fill-height fluid grid-list-xl>
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
  </v-container>-->

  <div class="w-100">
    <base-header type="gradient-blue" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row justify-content-center">
        <div class="col-md-3 mx-3">
          <div class="card">
            <img
              style="height: 150px;"
              src="https://cdn.windowsfileviewer.com/images/types/xlsx.png"
              class="card-img-top"
              alt="Call center Report image"
            />
            <div class="card-body">
              <h5 class="card-title text-center">Importador para informe Call Center</h5>
              <!-- <p
                class="card-text"
              >Serie de Graficos para hacer seguimiento de los teleoperadores en sus labores diarias.</p> -->
              <router-link to="/admin/call-center-import" class="btn btn-pepsi-primary">
                Ir. 
                <i class="ni ni-curved-next"></i>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-3 mx-3">
          <div class="card">
            <img
              style="height: 150px;"
              src="https://cdn.windowsfileviewer.com/images/types/xlsx.png"
              class="card-img-top"
              alt="Call center Report image"
            />
            <div class="card-body">
              <h5 class="card-title text-center">Importador Informes de Equipos</h5>
              <!-- <p
                class="card-text"
              >Un listado y graficos de los diferentes equipos y su estado actual dentro de la compañia.</p> -->
              <router-link to="/admin/kit-report" class="btn btn-pepsi-primary">
                Ir. 
                <i class="ni ni-curved-next"></i>
              </router-link>
            </div>
          </div>
        </div>

        <div class="col-md-3 mx-3">
          <div class="card">
            <img
              style="height: 150px;"
              src="https://cdn.windowsfileviewer.com/images/types/xlsx.png"
              class="card-img-top"
              alt="Call center Report image"
            />
            <div class="card-body">
              <h5 class="card-title text-center"> Importador de Detalle de Equipos.</h5>
              <!-- <p
                class="card-text"
              >Un conjunto de graficas donde se podra hacer seguimiento general de los incidentes por zonas.</p> -->
              <router-link to="/admin/kit-detail-import" class="btn btn-pepsi-primary">
                Ir. 
                <i class="ni ni-curved-next"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </base-header>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    complete(index) {
      this.list[index] = !this.list[index];
    }
  }
};
</script>
