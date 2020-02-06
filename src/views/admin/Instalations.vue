<template>
  <div class="w-100">
    <base-header type="gradient-blue" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
    </base-header>
    <div class="container-fluid mt--7">
      <div class="card">
        <div class="card-header">Instalaciones</div>
        <div class="card-body">
          <div class="container">
            <tr class="table table-hover border rounded">
              <thead class="bg-pepsi-primary text-white">
                <tr>
                  <th scope="col">TV</th>
                  <th scope="col">VC 1P</th>
                  <th scope="col">VC 2P</th>
                  <th scope="col">Enfriador 1T</th>
                  <th scope="col">Enfriador 1T</th>
                  <th scope="col">Enfriador 1T</th>
                  <th scope="col">PassThrough</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) of items" :key="index">
                  <th scope="row">
                    <button class="btn btn-pepsi-tertiary btn-sm">{{row.tv}}</button>
                  </th>
                  <td>{{row.vc_1p}}</td>
                  <td>{{row.vc_2p}}</td>
                  <td>{{row.enfriador_1t}}</td>
                  <td>{{row.enfriador_2t}}</td>
                  <td>{{row.enfriador_3t}}</td>
                  <td>{{row.passthrough}}</td>
                  <td scope="row">{{sum(row)}}</td>
                </tr>
                <tr>
                  <th scope="row">Totales</th>
                  <td>{{ totally.vc_1p }}</td>
                  <td>{{ totally.vc_2p }}</td>
                  <td>{{ totally.enfriador_1t }}</td>
                  <td>{{ totally.enfriador_2t }}</td>
                  <td>{{ totally.enfriador_3t }}</td>
                  <td>{{ totally.passthrough }}</td>
                  <td>{{ sum(totally) }}</td>
                </tr>
              </tbody>
            </tr>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#lateral .v-btn--example {
  bottom: 0;
  position: absolute;
  margin: 0 -0.5% -3.5% 0%;
}
</style>

<script>
import roles from "../../constants/rolesConstants";

export default {
  data: () => ({
    data: [],
    search: "",
    headers: [
      {
        sortable: false,
        text: "TV",
        value: "tv"
      },
      {
        sortable: true,
        text: "VC 1P",
        value: "vc_1p"
      },
      {
        sortable: true,
        text: "VC 2P",
        value: "vc_2p"
      },
      {
        sortable: true,
        text: "Enfriador 1T",
        value: "enfriador_1t"
      },
      {
        sortable: true,
        text: "Enfriador 2T",
        value: "enfriador_2t"
      },
      {
        sortable: true,
        text: "Enfriador 3T",
        value: "enfriador_3t"
      },
      {
        sortable: true,
        text: "PassThrough",
        value: "passthrough"
      },
      {
        sortable: true,
        text: "Total",
        value: "total"
      }
    ],
    items: [
      {
        id: 1,
        tv: "Centro",
        vc_1p: 2,
        vc_2p: 4,
        enfriador_1t: 3,
        enfriador_2t: 5,
        enfriador_3t: 2,
        passthrough: 7
      },
      {
        id: 2,
        tv: "Centro Occ",
        vc_1p: 3,
        vc_2p: 1,
        enfriador_1t: 5,
        enfriador_2t: 2,
        enfriador_3t: 6,
        passthrough: 1
      },
      {
        id: 3,
        tv: "Metropolitana",
        vc_1p: 2,
        vc_2p: 9,
        enfriador_1t: 7,
        enfriador_2t: 5,
        enfriador_3t: 2,
        passthrough: 7
      },
      {
        id: 4,
        tv: "Occidente",
        vc_1p: 1,
        vc_2p: 4,
        enfriador_1t: 9,
        enfriador_2t: 8,
        enfriador_3t: 4,
        passthrough: 3
      },
      {
        id: 5,
        tv: "Oriente",
        vc_1p: 2,
        vc_2p: 6,
        enfriador_1t: 1,
        enfriador_2t: 2,
        enfriador_3t: 1,
        passthrough: 7
      }
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    dialog: false,
    roles: roles,
    totals: {
      vc_1p: 0,
      vc_2p: 0,
      enfriador_1t: 0,
      enfriador_2t: 0,
      enfriador_3t: 0,
      passthrough: 0
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva linea" : "Editar linea";
    },
    totally() {
      Array.from(this.items).forEach(item => {
        this.totals.vc_1p = parseInt(this.totals.vc_1p) + parseInt(item.vc_1p);
        this.totals.vc_2p = parseInt(this.totals.vc_2p) + parseInt(item.vc_2p);
        this.totals.enfriador_1t =
          parseInt(this.totals.enfriador_1t) + parseInt(item.enfriador_1t);
        this.totals.enfriador_2t =
          parseInt(this.totals.enfriador_2t) + parseInt(item.enfriador_2t);
        this.totals.enfriador_3t =
          parseInt(this.totals.enfriador_3t) + parseInt(item.enfriador_3t);
        this.totals.passthrough =
          parseInt(this.totals.passthrough) + parseInt(item.passthrough);
      });
      return this.totals;
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      confirm("¿Seguro desea eliminar esta fila?") &&
        this.desserts.splice(index, 1);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      this.initTotals();
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }
      this.close();
    },
    sum(numbers) {
      return (
        parseInt(numbers.vc_1p) +
        parseInt(numbers.enfriador_1t) +
        parseInt(numbers.enfriador_2t) +
        parseInt(numbers.enfriador_3t) +
        parseInt(numbers.passthrough)
      );
    },
    initTotals() {
      this.totals.vc_1p = 0;
      this.totals.vc_2p = 0;
      this.totals.enfriador_1t = 0;
      this.totals.enfriador_2t = 0;
      this.totals.enfriador_3t = 0;
      this.totals.passthrough = 0;
    },
    onCreate() {
      this.data.push({
        content: "new created",
        flow_no: "FW201601010003" + Math.floor(Math.random() * 100),
        flow_type: "Help",
        flow_type_code: "help"
      });
    },
    onCreate100() {
      [...new Array(100)].map(_ => {
        this.onCreate();
      });
    },
    handleSelectionChange(val) {
      this.selectedRow = val;
    },
    handleCurrentChange(currentRow) {
      console.log(currentRow);
    }
  },
  mounted() {
    this.$loading(false);
  }
};
</script>
