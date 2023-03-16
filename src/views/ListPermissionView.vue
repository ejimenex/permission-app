<template>
  <div>
    <div class="text-right">
      <button type="button" @click="newPermission()" class="btn btn-primary">
        Nuevo Permiso
      </button>
    </div>

    <hr />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nombre Empleado</th>
          <th scope="col">Apellido Empleado</th>
          <th scope="col">Tipo Permiso</th>
          <th scope="col">Fecha Permiso</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in permissions" :key="item.id">
          <td>{{ item.employeeName }}</td>
          <td>{{ item.employeeLastName }}</td>
          <td>{{ item.permissionTypeDescription }}</td>
          <td>{{ item.permissionDate }}</td>
          <td>
            <button @click="deleteRow(item.id)" class="btn btn-danger">
              Elminar
            </button>
            <button  @click="edit(item.id)"  class="btn btn-info">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      permissions: [],
    };
  },
  methods: {
    newPermission() {
      this.$router.push("create/0");
    },
      edit(id) {
      this.$router.push(`create/${id}`);
    },
    getAllPermission() {
     
      axios
        .get(`${this.$urlApi}/Permission/all`)
        .then((response) => {
          this.permissions = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteRow(id) {
      this.$swal({
        title: "Seguro?",
        text: "Esta seguro que desea borrar este permiso?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si!",
      }).then((result) => {
        if (result.value) {
          axios
            .delete(`${this.$urlApi}/Permission?id=${id}`)
            .then((response) => {
              console.log(response);
              this.getAllPermission();
              this.$swal("Eliminado", "Se eliminó el permiso", "success");
            })
            .catch((error) => {
              this.$swal("Error", error.error, "error");
            });
        }
      });
    },
  },

  beforeMount() {
    this.getAllPermission();
  },
};
</script>
