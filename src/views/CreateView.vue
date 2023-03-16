<template>
  <form class="container">
    <div class="form-group">
      <label for="employeeName">Nombre Empleado</label>
      <input
        type="text"
        class="form-control"
        id="employeeName"
        v-model="permission.employeeName"
        name="employeeName"
        placeholder="Nombre empleado"
      />
    </div>
    <div class="form-group">
      <label for="employeeLastName">Apellido Empleado</label>
      <input
        type="text"
        class="form-control"
        v-model="permission.employeeLastName"
        name="employeeLastName"
        id="employeeLastName"
        placeholder="Apellido empleado"
      />
    </div>

    <div class="form-group">
      <label for="permissionDate">Tipo Permiso</label>
      <select
        v-model="permission.permissionTypeId"
        name="permissionTypeId"
        class="form-control"
      >
        <option
          :value="item.id"
          v-for="item in permissinType"
          v-bind:key="item.id"
        >
          {{ item.description }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="permissionDate">Fecha del permiso</label>
      <input
        v-model="permission.permissionDate"
        name="permissionDate"
        type="date"
        class="form-control"
        id="permissionDate"
      />
    </div>
    <br />

    <button type="button" @click="crud()" class="btn btn-primary">
      Registrar Permisos
    </button>
  </form>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      permission: {},
      selectedPermission: {},
      permissinType: [],
    };
  },
  methods: {
    getDataEditionMode() {
      const param = this.$route.params;
      if (param.id != "0") {
        axios
          .get(`${this.$urlApi}/permission/getbyid?id=${param.id}`)
          .then((response) => {
            this.permission = response.data;
            this.permission.permissionDate = this.$moment(
              response.data.permissionDate
            ).format("YYYY-MM-DD");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getAllPermissionType() {
      axios
        .get(`${this.$urlApi}/PermissionType/all`)
        .then((response) => {
          this.permissinType = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validatePermission() {
      if (
        !this.permission.employeeName ||
        !this.permission.employeeLastName ||
        !this.permission.permissionDate ||
        !this.permission.permissionTypeId
      ) {
        this.$swal({ icon: "error", text: "Debe llenar todos los campos" });
        return false;
      }
      return true;
    },
    crud() {
      const param = this.$route.params;
      if (param.id != "0") this.editPermissiom();
      else this.addNewPermissiom();
    },
    editPermissiom() {
      if (!this.validatePermission()) return;
      axios
        .put(`${this.$urlApi}/Permission`, this.permission)
        .then((response) => {
          console.log(response);
          this.$swal({
            icon: "success",
            text: "Permiso editado exitosamente",
          });
          this.$router.push("list");
        })
        .catch((error) => {
          this.$swal({ icon: "error", text: error.error });
        });
    },
    addNewPermissiom() {
      if (!this.validatePermission()) return;
      axios
        .post(`${this.$urlApi}/Permission`, this.permission)
        .then((response) => {
          console.log(response);
          this.$swal({
            icon: "success",
            text: "Permiso agregado exitosamente",
          });
          this.$router.push("list");
        })
        .catch((error) => {
          this.$swal({ icon: "error", text: error.error });
        });
    },
  },

  beforeMount() {
    this.getAllPermissionType();
    this.getDataEditionMode();
  },
};
</script>
