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
                  <base-button
                    type="primary"
                    size="sm"
                    class="btn btn-pepsi-primary"
                    @click="editItem(row)"
                  >
                    <span>Editar</span>
                  </base-button>
                  <base-button
                    type="danger"
                    color="pepsi-primary"
                    size="sm"
                    v-if="!(row.remember_token==='N')"
                    @click="deleteItem(row, 'N')"
                  >Desactivar</base-button>
                  <base-button
                    type="success"
                    color="pepsi-primary"
                    size="sm"
                    v-if="((row.remember_token!=='Y' || !row.remember_token))"
                    @click="deleteItem(row, 'Y')"
                  >Activar</base-button>
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
    <modal :show="dialog" :showClose="true" :modalClasses="'modal-lg'">
      <template slot="header">
        <div class="d-flex align-content-center">
          <h3>Administrar Usuario:</h3>
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
          <span >×</span>
        </button>
      </template>
      <template slot="modal-body">
        <div>
          <div class="row my-2">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Numero de Cedula:"
                v-model="editedItem.identification_document"
              />
            </div>
          </div>
          <div class="row my-2">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Nombres:"
                v-model="editedItem.name"
              />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Apellidos:"
                v-model="editedItem.lastname"
              />
            </div>
          </div>
          <div class="row my-2">
            <div class="col">
              <input
                type="email"
                class="form-control"
                placeholder="Correo Electrónico:"
                v-model="editedItem.email"
              />
            </div>
            <div class="col">
              <input
                type="phone"
                class="form-control"
                placeholder="Numero de Telefono:"
                v-model="editedItem.phone_number"
              />
            </div>
          </div>
          <div class="row my-2">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Usuario:"
                v-model="editedItem.username"
              />
            </div>
            <div class="col">
              <input
                type="password"
                class="form-control"
                placeholder="Contraseña:"
                v-model="editedItem.password"
              />
            </div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <div class="d-flex align-content-center">
          <button class="btn btn-pepsi-tertiary" @click="close">Cancelar</button>
          <button class="btn btn-pepsi-primary" v-if="new_user" @click="create">Crear</button>
          <button class="btn btn-pepsi-primary" v-if="!new_user" @click="save">Guardar</button>
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
      id: "",
      identification_document: "",
      name: "",
      lastname: "",
      username: "",
      email: "",
      email_verified_at: "",
      password: "",
      phone_number: "",
      remember_token: "",
      created_at: "",
      updated_at: "",
      role_id: ""
    },
    defaultItem: {
      id: "",
      identification_document: "",
      name: "",
      lastname: "",
      username: "",
      email: "",
      email_verified_at: "",
      password: "",
      phone_number: "",
      remember_token: "",
      created_at: "",
      updated_at: "",
      role_id: ""
    },
    tableData: [],
    new_user: false
  }),
  created() {
    this.init();
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    async init() {
      this.$loading(true);
      let temp = await this.getData();
      this.tableData = temp.data;
      this.$loading(false);
    },
    new_modal() {
      this.new_user = true;
      this.dialog = true;
    },
    editItem(item) {
      // this.editedIndex = this.desserts.indexOf(item);
      this.new_user = false;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    getData() {
      return new Promise((resolve, reject) => {
        userServices
          .all_users()
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    async deleteItem(item, value) {
      if (value === "Y") {
        if (confirm("¿Seguro que desea habilitar este usuario?")) {
          this.$loading(true);
          let response = await this.activateUser({
            user_id: item.id,
            value: value
          });
          this.init();
          this.$loading(false);
        }
      } else {
        if (confirm("¿Seguro que desea deshabilitar este usuario?")) {
          this.$loading(true);
          let response = await this.activateUser({
            user_id: item.id,
            value: value
          });
          this.init();

          this.$loading(false);
        }
      }
    },
    async save() {
      this.$loading(true);
      let response = await this.pushUser(this.editedItem, this.editedItem.id);

      if (response.status === 200) {
        this.$vToastify.success(response.message, "Operación Exitosa.");
      } else {
        this.$vToastify.error(response.message, "Error:");
      }

      this.close();
      this.init();
      this.$loading(false);
    },
    async create() {
      if (!this.editedItem.name) {
        this.$vToastify.error("El campo nombre es requerido", "Error:");
        return;
      }
      if (!this.editedItem.lastname) {
        this.$vToastify.error("El campo apellido es requerido", "Error:");
        return;
      }
      if (!this.editedItem.username) {
        this.$vToastify.error(
          "El campo Nombre de Usuario es requerido",
          "Error:"
        );
        return;
      }
      if (!this.editedItem.password) {
        this.$vToastify.error("El campo Contrasela es requerido", "Error:");
        return;
      }
      if (!this.editedItem.email) {
        this.$vToastify.error(
          "El campo Correo electrónico es requerido",
          "Error:"
        );
        return;
      }
      if (!this.editedItem.identification_document) {
        this.$vToastify.error(
          "El campo Cedula de Identidad es requerido",
          "Error:"
        );
        return;
      }

      this.$loading(true);

      let response = await this.createUser(this.editedItem);

      if (response.status === 200) {
        this.$vToastify.success(response.message, "Operación Exitosa.");
      } else {
        this.$vToastify.error(response.message, "Error:");
      }
      this.init();
      this.close();

      this.$loading(false);
    },
    close() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.dialog = false;
    },
    pushUser(data, user_id) {
      return new Promise((resolve, reject) => {
        userServices
          .updateUser(data, user_id)
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    createUser(data) {
      return new Promise((resolve, reject) => {
        userServices
          .createUser(data)
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    activateUser(data) {
      return new Promise((resolve, reject) => {
        userServices
          .activateuser(data)
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
</script>