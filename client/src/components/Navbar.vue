<template>
  <nav class="navbar justify-content-between">
  <a class="navbar-brand">DoDo</a>
  <form class="form-inline">
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-danger">
      Log Out
    </button>
  </form>
</nav>
</template>

<script>
export default {
  name: 'Navbar'
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
