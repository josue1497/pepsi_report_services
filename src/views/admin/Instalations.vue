<template>
  <div class="w-100">
    <base-header type="gradient-blue" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
    </base-header>
    <div class="container-fluid mt--7" v-show="loaded">
      <div class="card">
        <div class="card-header">
          <div class="d-flex justify-content-between align-items-center">
            <span>Instalaciones</span>
            <button class="btn btn-pepsi-primary" @click="addZone">Añadir Zona</button>
          </div>
        </div>
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
                    <button class="btn btn-pepsi-tertiary btn-sm" @click="edit(row)">{{row.zone}}</button>
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
    <modal :show="dialog" :showClose="true">
      <template slot="header">
        <div class="d-flex align-content-center">
          <h3>Instalación</h3>
        </div>
      </template>
      <template slot="close-button">
        <button
          type="button"
          class="close"
          v-if="true"
          @click="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span :aria-hidden="!show">×</span>
        </button>
      </template>
      <template slot="modal-body">
        <div>
          <div class="row my-2">
            <div class="col">
              <label for>VC 1P</label>
              <input
                type="text"
                class="form-control"
                id="vc_1p"
                name="vc_1p"
                v-model="editedItem.vc_1p"
              />
            </div>
            <div class="col">
              <label for>VC 2P</label>
              <input
                type="text"
                class="form-control"
                id="vc_2p"
                name="vc_2p"
                v-model="editedItem.vc_2p"
              />
            </div>
          </div>
          <div class="row my-2">
            <div class="col">
              <label for>Enfriador 1T</label>
              <input
                type="text"
                class="form-control"
                id="enfriador_1t"
                name="enfriador_1t"
                v-model="editedItem.enfriador_1t"
              />
            </div>
            <div class="col">
              <label for>Enfriador 2T</label>
              <input
                type="text"
                class="form-control"
                id="enfriador_2t"
                name="enfriador_2t"
                v-model="editedItem.enfriador_2t"
              />
            </div>
          </div>
          <div class="row my-2">
            <div class="col">
              <label for>Enfriador 3T</label>
              <input
                type="text"
                class="form-control"
                id="enfriador_3t"
                name="enfriador_1t"
                v-model="editedItem.enfriador_3t"
              />
            </div>
            <div class="col">
              <label for>Passthrough</label>
              <input
                type="text"
                class="form-control"
                id="passthrough"
                name="passthrough"
                v-model="editedItem.passthrough"
              />
            </div>
          </div>
          <div class="row my-2">
            <div class="col">
              <label for>Zona</label>
              <input
                type="text"
                class="form-control"
                id="zone"
                name="zone"
                :disabled="editedItem.id!==0"
                v-model="editedItem.zone"
              />
            </div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <div class="d-flex align-content-center">
          <button class="btn btn-pepsi-tertiary" @click="close">Cancelar</button>
          <button
            class="btn btn-pepsi-primary"
            v-show="editedItem.id===0"
            id="create"
            @click="saveOrUpdateInstalation('create')"
          >Guardar</button>
          <button
            class="btn btn-pepsi-primary"
            v-show="editedItem.id!==0"
            id="update"
            @click="saveOrUpdateInstalation('update')"
          >Guardar</button>
        </div>
      </template>
    </modal>
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
import instalationService from "./../../services/instalationsServices.js";

export default {
  data: () => ({
    data: [],
    search: "",
    items: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      zone: "",
      vc_1p: 0,
      vc_2p: 0,
      enfriador_1t: 0,
      enfriador_2t: 0,
      enfriador_3t: 0,
      passthrough: 7
    },
    defaultItem: {
      id: 0,
      zone: "",
      vc_1p: 0,
      vc_2p: 0,
      enfriador_1t: 0,
      enfriador_2t: 0,
      enfriador_3t: 0,
      passthrough: 0
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
    },
    dialog: false,
    loaded: false
  }),
  computed: {
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
    addZone() {
      console.log("add");
      Object.assign(this.editedItem, this.defaultItem);
      this.openDialog();
    },
    edit(item) {
      console.log("edit");

      Object.assign(this.editedItem, item);
      this.openDialog();
    },
    close() {
      this.initEditItem();
      this.dialog = false;
    },
    sum(numbers) {
      console.log(numbers);
      return (
        parseInt(numbers.vc_1p) +
        parseInt(numbers.vc_2p) +
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
    initEditItem() {
      this.editedItem = Object.assign(this.editedItem, this.defaultItem);
    },
    async processInstalations() {
      this.$loading(true);
      this.loaded = false;
      this.initTotals();
      let response = await this.getAllInstalations();
      console.log(response);
      this.items = response.data;
      this.loaded = true;
      this.$loading(false);
    },
    async saveOrUpdateInstalation(action) {
      this.$loading(true);
      let response;
      if ("update" === action) {
        response = await this.updateInstalation(
          this.editedItem,
          this.editedItem.id
        );
        console.log(response);
      }

      if ("create" === action) {
        response = await this.newInstalation(this.editedItem);
        console.log(response);
      }
      if (response.status === 200) {
        this.$vToastify.success("Operación realizada con Exito", "Exito");
      } else {
        this.$vToastify.error("Error al guardar los datos", "Error:");
      }
      this.close();
      this.processInstalations();
      this.$loading(false);
    },
    getAllInstalations() {
      return new Promise((resolve, reject) => {
        instalationService
          .getAll()
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    newInstalation(data) {
      return new Promise((resolve, reject) => {
        instalationService
          .saveInstalation(data)
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    updateInstalation(data, id) {
      return new Promise((resolve, reject) => {
        instalationService
          .updateInstalation(data, id)
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  mounted() {
    this.processInstalations();
    this.$loading(false);
  }
};
</script>
