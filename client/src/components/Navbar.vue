<template>
  <nav class="navbar justify-content-between">
  <a class="navbar-brand">DoDo</a>
  <form class="form-inline">
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-danger" @click="logOutButton">
      Log Out
    </button>
  </form>
</nav>
</template>

<script>
import swal from 'sweetalert2'
export default {
  name: 'Navbar',
  methods: {
    logOutButton: function () {
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Log me out!'
      }).then((result) => {
        if (result.value) {
          swal(
            'Log out!',
            'Your have been logged out',
            'success'
          )
          localStorage.clear()
          location.reload()
        }
      })
    }
  }
}
</script>

<style>
nav {
  background: rgba(white, white, white, 0.5)
}
a {
  color: white !important;
  font-weight: bold;
}
</style>
