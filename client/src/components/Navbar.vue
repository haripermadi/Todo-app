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
export default {
  name: 'Navbar',
  methods: {
    logOutButton: function () {
      let check = confirm('log out?')
      if (check === true) {
        localStorage.clear()
        this.$router.push({path: '/'})
      }
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
