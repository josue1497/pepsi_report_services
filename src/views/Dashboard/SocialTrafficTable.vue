<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Asesores Destacados: Llamadas atendidas</h3>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light" :data="table_data">
        <template slot="columns">
          <th>Asesor</th>
          <th>Llamadas</th>
          <th>Objetivo logrado (90%)</th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">{{row.names}}</th>
          <td>{{row.cant}}</td>
          <td>
            <div class="d-flex align-items-center">
              <span class="mr-2">{{row-cant}}</span>
              <base-progress
                type="gradient-success"
                class="pt-0"
                :show-percentage="false"
                :value="(parseInt(row.cant)/1000)*100"
              />
            </div>
          </td>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "social-traffic-table",
  props: {
    table_data: {
      type: Array,
      description: "Data of table",
      default: []
    }
  },
  data() {
    return {
      tableData: []
    };
  },
};
</script>
<style>
</style>
