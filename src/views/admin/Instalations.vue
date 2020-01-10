<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12 id="lateral">
        <material-card
          color="primary"
          title="Inventario Final"
          text="Inventario enviado por mercadeo de canales - Instalaciones realizadas por el 0800-REPARAR"
        >
          <v-fab-transition>
            <v-btn
              fab
              bottom
              small
              right
              class="v-btn--example"
              color="secondary"
              @click="openDialog"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="5"
            :search="search"
          >
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text-tertiary" v-text="header.text" />
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.tv }}</td>
              <td>{{ item.vc_1p }}</td>
              <td>{{ item.vc_2p }}</td>
              <td>{{ item.enfriador_1t }}</td>
              <td>{{ item.enfriador_2t }}</td>
              <td>{{ item.enfriador_3t }}</td>
              <td>{{ item.passthrough }}</td>
              <td>{{ sum(item) }}</td>
              <td>
                <template slot="actions">
                  <v-icon class="mr-2" @click="editItem(item)">mdi-playlist-edit</v-icon>
                </template>
              </td>
            </template>
            <template slot="footer">
              <tr>
                <td>Totales</td>
                <td>{{ totally.vc_1p }}</td>
                <td>{{ totally.vc_2p }}</td>
                <td>{{ totally.enfriador_1t }}</td>
                <td>{{ totally.enfriador_2t }}</td>
                <td>{{ totally.enfriador_3t }}</td>
                <td>{{ totally.passthrough }}</td>
                <td>{{ sum(totally) }}</td>
              </tr>
            </template>
          </v-data-table>
        </material-card>
        <v-dialog v-model="dialog" max-width="500px" scrollable>
          <v-card>
            <v-card-title>
              <span class="headline">{{ editedItem.tv }}</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.vc_1p"
                      label="VC 1P: "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.vc_2p" label="VC 2P: "></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.enfriador_1t" label="Enfriador 1T: "></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.enfriador_2t" label="Enfriador 2T: "></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.enfriador_3t" label="Enfriador 3T: "></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.passthrough" label="PassThrough: "></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="close">Cancelar</v-btn>
              <v-btn color="primary" text @click="save">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
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
        this.totals.passthrough = parseInt(this.totals.passthrough)+parseInt(item.passthrough);
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
    initTotals(){
        this.totals.vc_1p = 0
        this.totals.vc_2p = 0
        this.totals.enfriador_1t = 0
        this.totals.enfriador_2t = 0
        this.totals.enfriador_3t = 0
        this.totals.passthrough =  0
    }
  }
};
</script>
