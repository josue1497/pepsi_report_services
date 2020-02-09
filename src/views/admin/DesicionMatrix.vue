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
            <table class="table table-hover border rounded w-100 p-0">
              <thead class="bg-pepsi-primary text-white">
                <tr>
                  <th scope="col" colspan="8" class="text-center">validación Preliminar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" colspan="6">Código CEP</th>
                  <td>234324</td>
                  <td>t23423es</td>
                </tr>
                <tr>
                  <th scope="row" colspan="6">Estatus MIC</th>
                  <td>tasdsaes</td>
                  <td>tasdades</td>
                </tr>
                <tr>
                  <th scope="row" colspan="6">A que negocio pertenece el Equipo</th>
                  <td>tesadass</td>
                  <td>teasdass</td>
                </tr>
                <tr>
                  <th scope="row" colspan="6">Datos de Equipo</th>
                  <td>teasdass</td>
                  <td>teasdasds</td>
                </tr>
              </tbody>
            </table>
            <table class="table table-hover border rounded w-100 p-0">
              <thead class="bg-yellow text-dark">
                <tr>
                  <th scope="col" colspan="8" class="text-center">Preguntas Directas Del Operador</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" colspan="7">Presenta Fallas de Iluminación</th>
                  <td>
                    <div class="form-group">
                      <input type="checkbox" name id class="form-control" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" colspan="7">Falta de manillas y/o Cerraduras</th>
                  <td>
                    <div class="form-group">
                      <input type="checkbox" name id class="form-control" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    colspan="7"
                  >Parrillas externas y/o protectores Rotos o desajustados</th>
                  <td>
                    <div class="form-group">
                      <input type="checkbox" name id class="form-control" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    colspan="7"
                  >Cable de alimentación eléctrica o toma corriente macho defectuoso</th>
                  <td>
                    <div class="form-group">
                      <input type="checkbox" name id class="form-control" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" colspan="7">Equipo con escarcha, congelado o con goteos</th>
                  <td>
                    <div class="form-group">
                      <input type="checkbox" name id class="form-control" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" colspan="7">Indicador de temperatura defectuoso</th>
                  <td>
                    <div class="form-group">
                      <input type="checkbox" name id class="form-control" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    colspan="7"
                  >Gomas de cierre de puertas en mal estado, rotas o desajustadas</th>
                  <td>
                    <div class="form-group">
                      <input type="checkbox" name id class="form-control" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" colspan="7">Indicador de temperatura defectuoso</th>
                  <td>
                    <div class="form-group">
                      <input type="checkbox" name id class="form-control" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" colspan="7">Vidrios de Puerta partidos o fisurados</th>
                  <td>
                    <div class="form-group">
                      <input type="checkbox" name id class="form-control" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" colspan="7">Ninguna de las anteriores</th>
                  <td>
                    <div class="form-group">
                      <input type="checkbox" name id class="form-control" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="table table-hover border rounded w-100 p-0">
              <thead class="bg-warning text-white">
                <tr>
                  <th scope="col" colspan="8" class="text-center">Información de Ventas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row" colspan="7">Se requiere cambio y/o refrescamiento de imagen</td>
                  <td>
                    <div class="form-group">
                      <input type="checkbox" name id class="form-control" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="table table-hover border rounded w-100 p-0">
              <thead class="bg-green text-white">
                <tr>
                  <th
                    scope="col"
                    colspan="8"
                    class="text-center"
                  >Revisión del Operador sobre Historial de Mtto</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    scope="row"
                    colspan="7"
                  >El equipo tiene una ODS Abierta con estatus de usuario distino a C010</td>
                  <td>
                    <div class="form-group">
                      <input type="checkbox" name id class="form-control" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    scope="row"
                    colspan="7"
                  >Ultima Orden (ZPMI-ZPMC-ZPMP) asociada al equipo es menor a 30 días</td>
                  <td>
                    <div class="form-group">
                      <input type="checkbox" name id class="form-control" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    scope="row"
                    colspan="7"
                  >Ultima Orden (ZPMI-ZPMC-ZPMP) asociada al equipo es mayor a 1 año</td>
                  <td>
                    <div class="form-group">
                      <input type="checkbox" name id class="form-control" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    scope="row"
                    colspan="7"
                  >Posee mas de tres (03) Ordenes (ZPMI-ZPMC-ZPMP) en los ultimos 6 meses</td>
                  <td>
                    <div class="form-group">
                      <input type="checkbox" name id class="form-control" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    scope="row"
                    colspan="7"
                  >Ninguna de las anteriores</td>
                  <td>
                    <div class="form-group">
                      <input type="checkbox" name id class="form-control" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="table table-hover border rounded w-100 p-0">
              <thead class="bg-blue text-white">
                <tr>
                  <th scope="col" colspan="8" class="text-center">De la Ubicación</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row" colspan="7">Ubicación del Equipo</td>
                  <td>
                    <div class="form-group">
                      <input type="checkbox" name id class="form-control" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
