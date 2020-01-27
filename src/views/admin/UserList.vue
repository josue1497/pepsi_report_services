<template>
  <div class="w-100">
    <base-header type="gradient-blue" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="card shadow w-100" :class="'bg-ligth'">
          <div class="card-header border-0" :class="'bg-transparent'">
            <div class="row align-items-center">
              <div class="col">
                <h3 class="mb-0 text-dark">Listado de Usuarios</h3>
              </div>
              <div class="col text-right">
                <base-button type="secondary" color="pepsi-primary" size="md" @click="new_modal">
                  <i class="ni ni-fat-add"></i> Añadir Usuario
                </base-button>
              </div>
            </div>
          </div>

          <div class="table-responsive">
            <base-table
              class="table align-items-center table-flush"
              :class="''"
              :thead-classes="'thead-pepsi-tertiary'"
              tbody-classes="list"
              :data="tableData"
            >
              <template slot="columns">
                <th>CI.:</th>
                <th>Nombres y Apellidos</th>
                <th>E-Mail</th>
                <th></th>
              </template>

              <template slot-scope="{row}">
                <td>{{ row.identification_document }}</td>
                <td>{{ row.name }} {{ row.lastname }}</td>
                <td>{{ row.email }}</td>
                <td>
                  <base-button type="primary" size="sm" class="btn btn-pepsi-primary">
                    <span>Editar</span>
                  </base-button>
                  <base-button type="danger" color="pepsi-primary" size="sm">Desactivar</base-button>
                </td>
              </template>
            </base-table>
          </div>

          <div class="card-footer d-flex justify-content-end" :class="''">
            <base-pagination :total="30"></base-pagination>
          </div>
        </div>
      </div>
    </base-header>
    <modal :show="dialog" :showClose="true">
      <template slot="header">
        <div class="d-flex align-content-center">
          <h3>Hola</h3>
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
          <h1>Hola</h1>
        </div>
      </template>
      <template slot="footer">
        <div class="d-flex align-content-center">
          <button class="btn btn-primary" @click="close">Aceptar</button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import userServices from "./../../services/userServices";
import JQuery from "jquery";
let $ = JQuery;

export default {
  mounted() {
    this.$loading(false);
  },
  data: () => ({
    search: "",
    dialog: false,
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
    tableData: []
  }),
  created() {
    console.log("start");
    this.init();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    async init() {
      let temp = await this.getData();
      console.log(temp);
      this.tableData = temp.data;
    },
    new_modal() {
      this.dialog = true;
    },
    editItem(item) {
      // this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    getData() {
      return new Promise((resolve, reject) => {
        userServices
          .all_users()
          .then(response => {
            console.log(response);
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },
    deleteItem(item) {
      // const index = this.desserts.indexOf(item);
      confirm("¿Seguro que desea deshabilitar este usuario?") &&
        this.desserts.splice(index, 1);
    },

    // close() {
    //   this.dialog = false;
    //   setTimeout(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem);
    //     this.editedIndex = -1;
    //   }, 300);
    // },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>