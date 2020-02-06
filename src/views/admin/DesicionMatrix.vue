<template>
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
              <h5 class="card-title text-center">Importador de Ordenes</h5>
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
              <h5 class="card-title text-center"> Importador Historial Equipos.</h5>
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
  },
   mounted(){
    this.$loading(false);
  },
};
</script>
