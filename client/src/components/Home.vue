<template>
  <div>
    <navbar></navbar>
    <h2>Welcome to DoDo</h2>
    <div class="container">
      quotes
    </div>
    <div class="container">
      <form>
        <div class="form-group">
          <label for="addtodo">Add ToDo</label>
          <input type="text" class="form-control" placeholder="todo...">
        </div>
        <button type="button" class="btn btn-primary"><i class="fas fa-plus"></i></button>
      </form>
    </div>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary">All</button>
        <button type="button" class="btn btn-secondary">Uncomplete</button>
        <button type="button" class="btn btn-secondary">Completed</button>
      </div>
    <div class="jumbotron">
      todo list
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>

<style>
.jumbotron {
  max-width: 700px;
  margin: 0 auto;
  padding: 32px;
  background: rgba(135, 206, 235, 0.5)
}

.container{
  margin-top: 10px;
  max-width: 700px;
}
input {
  height: 50px;
}
</style>
