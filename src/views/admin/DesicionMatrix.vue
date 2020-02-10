<template>
  <div class="w-100">
    <base-header type="gradient-blue" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
    </base-header>
    <div class="container-fluid mt--7">
      <div class="card">
        <div class="card-header">Matri de Decisión</div>
        <div class="card-body">
          <div class="container mb-3">
            <div class="row">
              <table class="table table-hover border rounded w-100 p-0 table-sm">
                <thead class="bg-pepsi-primary text-white">
                  <tr>
                    <th scope="col" colspan="8" class="text-center">validación Preliminar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" colspan="6">Código CEP</th>
                    <td></td>
                    <td>
                      <input type="text" name id v-model="cliente" @change="evaluate" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="6">Estatus MIC</th>
                    <td></td>
                    <td>
                      <select name id v-model="status" @change="evaluate">
                        <option :value="'Activo'">Activo</option>
                        <option :value="'Otros'">Otros</option>
                        <option :value="'Potencial'">Potencial</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="6">A que negocio pertenece el Equipo</th>
                    <td></td>
                    <td>
                      <select name id v-model="negocio" @change="evaluate">
                        <option :value="'PCV'">PCV</option>
                        <option :value="'CyM'">CyM</option>
                        <option :value="'APC'">APC</option>
                        <option :value="'EFE'">EFE</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="6">Datos de Equipo</th>
                    <td></td>
                    <td>
                      <select name id v-model="tipo" @change="evaluate">
                        <option :value="'Enfriador'">Enfriador</option>
                        <option :value="'Fabricador de Hielo'">Fabricador de Hielo</option>
                        <option :value="'Cava Cuarto'">Cava Cuarto</option>
                        <option :value="'Sifon'">Sifon</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="table table-hover border rounded w-100 p-0 table-sm">
                <thead class="bg-yellow text-dark">
                  <tr>
                    <th scope="col" colspan="8" class="text-center">Preguntas Directas Del Operador</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" colspan="7">Presenta Fallas de Iluminación</th>
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          name
                          id
                          class="form-control m-0 m-0"
                          v-model="iluminacion_fail"
                          @change="evaluate"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="7">Falta de manillas y/o Cerraduras</th>
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          name
                          id
                          class="form-control m-0 m-0 m-0"
                          v-model="manillas_faltantes"
                          @change="evaluate"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      colspan="7"
                    >Parrillas externas y/o protectores Rotos o desajustados</th>
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          name
                          id
                          class="form-control m-0 m-0 m-0"
                          v-model="parrilla_ext_rotas"
                          @change="evaluate"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      colspan="7"
                    >Parrillas Internas y/o protectores Rotos o desajustados</th>
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          name
                          id
                          class="form-control m-0 m-0 m-0"
                          v-model="parrilla_int_rotas"
                          @change="evaluate"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      colspan="7"
                    >Cable de alimentación eléctrica o toma corriente macho defectuoso</th>
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          name
                          id
                          class="form-control m-0 m-0 m-0"
                          v-model="parrilla_int_rotas"
                          @change="evaluate"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="7">Equipo con escarcha, congelado o con goteos</th>
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          name
                          id
                          class="form-control m-0 m-0 m-0"
                          v-model="escarcha"
                          @change="evaluate"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="7">Indicador de temperatura defectuoso</th>
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          name
                          id
                          class="form-control m-0 m-0"
                          v-model="temperadura_defectuoso"
                          @change="evaluate"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      colspan="7"
                    >Gomas de cierre de puertas en mal estado, rotas o desajustadas</th>
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          name
                          id
                          class="form-control m-0 m-0"
                          v-model="gomas_malas"
                          @change="evaluate"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="7">Vidrios de Puerta partidos o fisurados</th>
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          name
                          id
                          class="form-control m-0 m-0"
                          v-model="vidrio_partidos"
                          @change="evaluate"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="7">Ninguna de las anteriores</th>
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          name
                          id
                          class="form-control m-0 m-0"
                          v-model="ninguna"
                          @change="evaluate"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="table table-hover border rounded w-100 p-0 table-sm">
                <thead class="bg-warning text-white">
                  <tr>
                    <th scope="col" colspan="8" class="text-center">Información de Ventas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row" colspan="7">Se requiere cambio y/o refrescamiento de imagen</td>
                    <td>
                      <div class="form-check">
                        <input type="checkbox" name id class="form-control m-0 m-0" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="table table-hover border rounded w-100 p-0 table-sm">
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
                      <div class="form-check">
                        <input
                          type="checkbox"
                          name
                          id
                          class="form-control m-0 m-0"
                          v-model="orden_c010"
                          @change="evaluate"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      scope="row"
                      colspan="7"
                    >Ultima Orden (ZPMI-ZPMC-ZPMP) asociada al equipo es menor a 30 días</td>
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          name
                          id
                          class="form-control m-0 m-0"
                          v-model="orden_30"
                          @change="evaluate"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      scope="row"
                      colspan="7"
                    >Ultima Orden (ZPMI-ZPMC-ZPMP) asociada al equipo es mayor a 1 año</td>
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          name
                          id
                          class="form-control m-0 m-0"
                          v-model="ultima_orden_1anio"
                          @change="evaluate"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      scope="row"
                      colspan="7"
                    >Posee mas de tres (03) Ordenes (ZPMI-ZPMC-ZPMP) en los ultimos 6 meses</td>
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          name
                          id
                          class="form-control m-0 m-0"
                          v-model="tres_ordenes_seis_meses"
                          @change="evaluate"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row" colspan="7">Ninguna de las anteriores</td>
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          name
                          id
                          class="form-control m-0 m-0"
                          v-model="ninguna_dos"
                          @change="evaluate"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="table table-hover border rounded w-100 p-0 table-sm">
                <thead class="bg-blue text-white">
                  <tr>
                    <th scope="col" colspan="8" class="text-center">De la Ubicación</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row" colspan="7">Ubicación del Equipo</td>
                    <td>
                      <div class="form-check">
                        <select name id v-model="ubicacion" @change="evaluate">
                          <option :value="'Foraneo'">Foraneo</option>
                          <option :value="'Local'">Local</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row d-flex align-items-center">
              <div class="col-md-12 border py-4">
                <h2 class="text-red text-center">{{orderMessage}}</h2>
              </div>
              <div class="col-md-12 border bg-red p-5">
                <span class="text-white text center mx-2">{{resultMessage}}</span>
              </div>
            </div>
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
import matrixData from "../../constants/MatrixData";
const XLSX = require("xlsx");
var temp_seet;
var temp_pagination;

export default {
  data: () => ({
    data: [],
    search: "",
    efe: matrixData.efe,
    especiales: matrixData.especiales,
    potenciales: matrixData.potenciales,
    foraneos: matrixData.foraneos,
    negocios: matrixData.negocios,
    documentos: matrixData.documentos,
    dialog: false,
    tipo: "",
    negocio: "",
    cliente: "",
    status: "",
    resultMessage: "",
    orderMessage: "",
    ubicacion: "",
    iluminacion_fail: false,
    ninguna: false,
    vidrio_partidos: false,
    gomas_malas: false,
    temperadura_defectuoso: false,
    escarcha: false,
    cable_malo: false,
    parrilla_int_rotas: false,
    parrilla_ext_rotas: false,
    manillas_faltantes: false,
    ninguna_dos: false,
    tres_ordenes_seis_meses: false,
    ultima_orden_1anio: false,
    orden_c010: false,
    orden_30: false,
    cambio_imagen: false
  }),
  methods: {
    evaluate() {
      console.log("evaluate");
      this.orderMessage = "";
      this.resultMessage = "";

      if (this.negocio === "APC" || this.negocio === "EFE") {
        if (this.efe.some(element => element === this.cliente)) {
          this.orderMessage = "Orden de Correctivo";
          this.resultMessage = "Orden de correctivo";
          return;
        }
        this.orderMessage = "Orden de Retiro";
        this.resultMessage = "El equipo debe ser Retirado";
        return;
      }

      if (
        this.ubicacion === "Foraneo" &&
        !this.foraneos.some(element => element === this.cliente)
      ) {
        this.orderMessage = "Orden de Retiro";
        this.resultMessage =
          "El cliente no esta registrado y se necesita retirar el equipo";
        return;
      }

      if (
        "Potencial" === this.status &&
        !this.potenciales.some(element => element === this.cliente)
      ) {
        this.orderMessage = "Orden de Retiro";
        this.resultMessage =
          "El cliente no esta registrado y se necesita retirar el equipo";
        return;
      }

      if (this.orden_c010) {
        this.orderMessage = "No se puede procesar la orden";
        this.resultMessage =
          "El equipo tiene una orden abierta, no se puede generar esta orden";
        return;
      }

      if (this.orden_30) {
        this.orderMessage = "Orden de Correctivo 999, Reincidencia";
        this.resultMessage = "El equipo aun se encuentra en garantia";
        return;
      }

      if (this.negocio === "CyM") {
        this.orderMessage = "Orden de Correctivo";
        if (this.especiales.some(element => element === this.cliente)) {
          this.resultMessage = "Orden de correctivo AAA";
          return;
        }

        this.resultMessage = "Orden de correctivo";
        return;
      }

      if (this.negocio === "PCV") {
        if (this.tipo === "Otres") {
          this.orderMessage = "Retiro";
          this.resultMessage = "El equipo debe ser Retirado";
          return;
        }

        if (this.especiales.some(element => element === this.cliente)) {
          this.resultMessage += "Orden de correctivo AAA";
        }

        if (!this.documentos.some(element => element === this.cliente)) {
          this.orderMessage = "Correctivo";
          this.resultMessage =
            "Orden C011, esperando por documentos mercantiles del cliente";
        }
        if (this.iluminacion_fail) {
          this.resultMessage += " Presenta Fallas de Iluminación";
        }
        if (this.manillas_faltantes) {
          this.resultMessage += " Falta de manillas y/o Cerraduras";
        }
        if (this.parrilla_ext_rotas) {
          this.resultMessage +=
            " Parrillas externas y/o protectores Rotos o desajustados";
        }
        if (this.parrilla_int_rotas) {
          this.resultMessage +=
            " Parrillas internas y/o protectores Rotos o desajustados";
        }
        if (this.escarcha) {
          this.resultMessage += " Equipo con escarcha, congelado o con goteos";
        }
        if (this.temperadura_defectuoso) {
          this.resultMessage += " Indicador de temperatura defectuoso";
        }
        if (this.gomas_malas) {
          this.resultMessage +=
            " Gomas de cierre de puertas en mal estado, rotas o desajustadas";
        }
        if (this.vidrio_partidos) {
          this.orderMessage = "Cambio tecnico";
          this.resultMessage += " ";
        }

        if (this.ninguna) {
          this.orderMessage = "";
          this.resultMessage = "";
        }

        if (this.orden_c010) {
          this.orderMessage = "No se puede procesar la orden";
          this.resultMessage =
            "El equipo tiene una orden abierta, no se puede generar esta orden";
          return;
        }

        if (this.ninguna) {
          this.orderMessage = "Orden de Correctivo 999, Reincidencia";
          this.resultMessage =
            "El equipo aun se encuentra en garantia, reincidencia";
          return;
        }

        if (this.ultima_orden_1anio) {
          this.orderMessage = "Correctivo";
          this.resultMessage = "El equipo requiere una sesion de mantenimiento";
          return;
        }

        if (this.tres_ordenes_seis_meses) {
          this.orderMessage = "Cambio tecnico";
          this.resultMessage = "El equipo debe ser Cambiado ";
          return;
        }

        if (this.foraneos.some(element => element === this.cliente)) {
          this.orderMessage = "Cambio tecnico";
          this.resultMessage = "El equipo debe ser Cambiado ";
          return;
        }
      }
    }
  },
  mounted() {
    this.$loading(false);
  }
};
</script>
