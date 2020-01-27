<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Asesores destacados: Ordenes procesadas</h3>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light" :data="table_data">
        <template slot="columns">
          <th>Operador</th>
          <th>Ordenes</th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            <i class="fas fa-star text-warning mr-3"></i>
          {{row.names}}</th>
          <td>{{row.cant}}</td>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "page-visits-table",
  props: {
    table_data: {
      type: Array,
      description: "Data of table",
      default: []
    }
  },
  data() {
    return {
      count:0,
    };
  }
};
</script>
<style>
</style>
