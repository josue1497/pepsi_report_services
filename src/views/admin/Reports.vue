<template>
  <div class="container">
    <base-header type="gradient-blue" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row justify-content-center">
        <div class="col-md-3 mx-3">
          <div class="card ">
            <img  style="height: 150px;" src="https://cdn.emprender-facil.com/wp-content/uploads/2019/08/call-center.jpg" class="card-img-top" alt="Call center Report image" />
            <div class="card-body">
              <h5 class="card-title text-center">Call Center</h5>
              <p
                class="card-text"
              >Serie de Graficos para hacer seguimiento de los teleoperadores en sus labores diarias.</p>
              <router-link to="/admin/reports/call-center" class="btn btn-pepsi-primary">Ver. <i class="ni ni-curved-next"></i> </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-3 mx-3">
          <div class="card ">
            <img style="height: 150px;" src="https://sc01.alicdn.com/kf/HTB1d3xSg7zoK1RjSZFlq6yi4VXaz/Promotional-660L-Pepsi-Refrigerator-for-Beverage.jpg_350x350.jpg" class="card-img-top" alt="Call center Report image" />
            <div class="card-body">
              <h5 class="card-title text-center">Equipos</h5>
              <p
                class="card-text"
              >Un listado y graficos de los diferentes equipos y su estado actual dentro de la compañia.</p>
              <router-link to="/admin/reports/call-center" class="btn btn-pepsi-primary">Ver. <i class="ni ni-curved-next"></i> </router-link>
            </div>
          </div>
        </div>

        <div class="col-md-3 mx-3">
          <div class="card ">
            <img style="height: 150px;" src="https://aceairandappliances.com/wp-content/uploads/2019/01/pepsi-cooler-repair-min-300x216.jpg" class="card-img-top" alt="Call center Report image" />
            <div class="card-body">
              <h5 class="card-title text-center">Detalle de Equipos.</h5>
              <p
                class="card-text"
              >Un conjunto de graficas donde se podra hacer seguimiento general de los incidentes por zonas.</p>
              <router-link to="/admin/reports/kit-details" class="btn btn-pepsi-primary">Ver. <i class="ni ni-curved-next"></i> </router-link>
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
  methods: {}
};
</script>