<template>
  <div class="w-100">
    <base-header type="pepsi-primary" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="d-flex justify-content-center">
        <template>
          <card type="ligth" header-classes="bg-transparent text-black">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h5 class="h3 text-black-50 mb-0">Importar Archivo.</h5>
              </div>
            </div>
            <div class="content">
              <div :class="`d-flex justify-center align-center m-3 file-content`">
                <input
                  type="file"
                  name="file"
                  id="file-1"
                  ref="filesUploads"
                  class="inputfile inputfile-1"
                  data-multiple-caption="{count} files selected"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  @change="xlsxLoad"
                />
                <label for="file-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="17"
                    viewBox="0 0 20 17"
                  >
                    <path
                      d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"
                    />
                  </svg>
                  <span>Seleccione sus Archivos&hellip;</span>
                </label>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <button
                class="btn btn-pepsi-primary"
                id="uploadButton"
                disabled="true"
                @click="upload"
              >Cargar</button>
            </div>
          </card>
        </template>
      </div>
    </base-header>
  </div>
</template>
<script>
const XLSX = require("xlsx");
import imporService from "./../../services/importServices";
import { mapState } from "vuex";
var temp_seet;
var temp_pagination;

export default {
  data: () => ({
    sheet_data: [],
    document_name: "",
    paginateData: []
  }),
  computed: {
    ...mapState("userData", [
      "user",
      "user_logged",
      "access_token",
      "user_route"
    ])
  },
  methods: {
    callCenterReport(data) {
      return new Promise((resolve, reject) => {
        imporService
          .kitDetailReport(data, this.access_token)
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
    async upload() {
      this.sheet_data = temp_seet;

      let total_rows = this.sheet_data.length;

      document.getElementById("uploadButton").disabled = true;

      this.paginateData = chunkArray(this.sheet_data, 50);

      for (let short_data of this.paginateData) {
        console.log(short_data);

        let response = await this.callCenterReport({
          sheet_data: short_data,
          document_name: this.document_name,
          total_rows: total_rows
        });

        this.$toasted.show(
          response.message + ": " + response.rows + " Importados.",
          {
            theme: "bubble",
            position: "top-right",
            duration: 5000
          }
        );
      }

      document.getElementById("uploadButton").disabled = false;

    },
    async xlsxLoad(e) {
      var files = e.target.files,
        f = files[0];

      this.document_name = files[0].name;
      var reader = new FileReader();
      reader.onload = function loadData(e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: "array" });
        let sheetName = workbook.SheetNames[0];
        /* DO SOMETHING WITH workbook HERE */
        console.log(workbook);
        let worksheet = workbook.Sheets[sheetName];
        temp_seet = XLSX.utils.sheet_to_json(worksheet);
        console.log(temp_seet);
        document.getElementById("uploadButton").disabled = false;

        // temp_pagination = chunkArray(temp_seet, 50);
      };
      reader.readAsArrayBuffer(f);
    }
  }
};

function chunkArray(myArray, chunk_size) {
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    let myChunk = myArray.slice(index, index + chunk_size);
    // Do something if you want with the group
    tempArray.push(myChunk);
  }

  return tempArray;
}
</script>
<style lang="scss" scoped>
// @import "@/styles/index.scss";

.js .inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.file-content:hover {
  box-shadow: #000 10px;
}

.inputfile + label {
  max-width: 100%;
  font-size: 1.5rem;
  /* 20px */
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  padding: 0.625rem 1.25rem;
  /* 10px 20px */
}

.no-js .inputfile + label {
  display: none;
}
.inputfile {
  display: none;
}

.inputfile:focus + label,
.inputfile.has-focus + label {
  outline: 1px dotted #000;
  outline: -webkit-focus-ring-color auto 5px;
}

.inputfile + label svg {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  margin-top: -0.25em;
  /* 4px */
  margin-right: 0.25em;
  /* 4px */
}

/* style 1 */

.inputfile-1 + label {
  color: #221b1c;
  // background-color: $brand-primary;
}
</style>