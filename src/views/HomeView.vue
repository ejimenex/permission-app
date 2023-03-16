<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ListPermissionView />
  </div>
</template>

<script>
// @ is an alias to /src
import ListPermissionView from './ListPermissionView.vue'

export default {
  name: 'ListPermissionView',
  components: {
    ListPermissionView
  }
}
</script>
