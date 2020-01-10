<template>
  <div>
    <base-header type="gradient-blue" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
          <div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
            <div class="row align-items-center">
              <div class="col">
                <h3 class="mb-0 text-dark">Listado de Usuarios</h3>
              </div>
              <div class="col text-right">
                <base-button type="primary" size="sm">Añadir Usuario</base-button>
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
                <th>Project</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Users</th>
                <th>Completion</th>
                <th></th>
              </template>

              <template slot-scope="{row}">
                <th scope="row">
                  <div class="media align-items-center">
                    <a href="#" class="avatar rounded-circle mr-3">
                      <img alt="Image placeholder" :src="row.img" />
                    </a>
                    <div class="media-body">
                      <span class="name mb-0 text-sm">{{row.title}}</span>
                    </div>
                  </div>
                </th>
                <td class="budget">{{row.budget}}</td>
                <td>
                  <badge class="badge-dot mr-4" :type="row.statusType">
                    <i :class="`bg-${row.statusType}`"></i>
                    <span class="status">{{row.status}}</span>
                  </badge>
                </td>
                <td>
                  <div class="avatar-group">
                    <a
                      href="#"
                      class="avatar avatar-sm rounded-circle"
                      data-toggle="tooltip"
                      data-original-title="Ryan Tompson"
                    >
                      <img alt="Image placeholder" src="img/theme/team-1-800x800.jpg" />
                    </a>
                    <a
                      href="#"
                      class="avatar avatar-sm rounded-circle"
                      data-toggle="tooltip"
                      data-original-title="Romina Hadid"
                    >
                      <img alt="Image placeholder" src="img/theme/team-2-800x800.jpg" />
                    </a>
                    <a
                      href="#"
                      class="avatar avatar-sm rounded-circle"
                      data-toggle="tooltip"
                      data-original-title="Alexander Smith"
                    >
                      <img alt="Image placeholder" src="img/theme/team-3-800x800.jpg" />
                    </a>
                    <a
                      href="#"
                      class="avatar avatar-sm rounded-circle"
                      data-toggle="tooltip"
                      data-original-title="Jessica Doe"
                    >
                      <img alt="Image placeholder" src="img/theme/team-4-800x800.jpg" />
                    </a>
                  </div>
                </td>

                <td>
                  <div class="d-flex align-items-center">
                    <span class="completion mr-2">{{row.completion}}%</span>
                    <div>
                      <base-progress
                        :type="row.statusType"
                        :show-percentage="false"
                        class="pt-0"
                        :value="row.completion"
                      />
                    </div>
                  </div>
                </td>

                <td class="text-right">
                  <base-dropdown class="dropdown" position="right">
                    <a
                      slot="title"
                      class="btn btn-sm btn-icon-only text-light"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fas fa-ellipsis-v"></i>
                    </a>

                    <template>
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </template>
                  </base-dropdown>
                </td>
              </template>
            </base-table>
          </div>

          <div
            class="card-footer d-flex justify-content-end"
            :class="''"
          >
            <base-pagination :total="30"></base-pagination>
          </div>
        </div>
      </div>
    </base-header>
  </div>
</template>

<script>
export default {
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
    tableData: [
      {
        img: "img/theme/bootstrap.jpg",
        title: "Argon Design System",
        budget: "$2500 USD",
        status: "pending",
        statusType: "warning",
        completion: 60
      },
      {
        img: "img/theme/angular.jpg",
        title: "Angular Now UI Kit PRO",
        budget: "$1800 USD",
        status: "completed",
        statusType: "success",
        completion: 100
      },
      {
        img: "img/theme/sketch.jpg",
        title: "Black Dashboard",
        budget: "$3150 USD",
        status: "delayed",
        statusType: "danger",
        completion: 72
      },
      {
        img: "img/theme/react.jpg",
        title: "React Material Dashboard",
        budget: "$4400 USD",
        status: "on schedule",
        statusType: "info",
        completion: 90
      },
      {
        img: "img/theme/vue.jpg",
        title: "Vue Paper UI Kit PRO",
        budget: "$2200 USD",
        status: "completed",
        statusType: "success",
        completion: 100
      }
    ]
  }),

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

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
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
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>