<template>
  <div>
    <navbar></navbar>
    <h2>Welcome to DoDo</h2>
    <div class="container" id="quoteid">
      <blockquote class="blockquote mb-0">
      <p id="qbody">{{quote.body}}</p>
      <footer class="blockquote-footer">{{quote.author}}<cite title="Source Title"> favqs.com</cite></footer>
    </blockquote>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-12" id="inputid">
      <form>
        <div class="form-group">
          <label for="addtodo">Add ToDo</label>
          <input type="text" class="form-control" v-model="task" placeholder="todo...">
        </div>
      </form>
        </div>
        <div class="col-md-4 col-4" id="addbutton">
        <button type="button" class="btn btn-primary" @click="addTodo"><i class="fas fa-plus"></i></button>
        </div>
      </div>
    </div>
    <div class="jumbotron">
      <div class="list-group" v-for="(todo, i) in todoList" :key="i">
        <div v-if="todo.status === false" class="list-group-item list-group-item-action list-group-item-dark" id="uncompleted"><span class="icon" @click="completedTodo(todo)"><i class="far fa-square"></i></span> {{todo.task}} <span class="removeTag" @click="deleteTodo(todo)"><i class="far fa-trash-alt"></i></span><span class="editTag" data-toggle="modal" data-target="#myModal" @click="getEditTodo(todo)"><i class="far fa-edit"></i></span></div>
        <div v-else class="list-group-item list-group-item-action list-group-item-dark" id="completed"><span class="icon" @click="uncompletedTodo(todo)"><i class="far fa-check-square"></i></span> {{todo.task}} <span class="removeTag" @click="deleteTodo(todo)"><i class="far fa-trash-alt"></i></span><span class="editTag" data-toggle="modal" data-target="#myModal" @click="getEditTodo(todo)"><i class="far fa-edit"></i></span></div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Edit Todo</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="todo" class="col-form-label">Edit your todo</label>
              <input type="text" class="form-control" v-model="editTodo.task">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="editTodoList">Submit</button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  data () {
    return {
      task: '',
      editTodo: {}
    }
  },
  created: function () {
    this.$store.dispatch('showAllTodo')
    this.$store.dispatch('getQuote')
  },
  computed: {
    quote: function () {
      return this.$store.getters.getQuote
    },
    todoList: function () {
      return this.$store.getters.getTodos
    }
  },
  methods: {
    addTodo: function () {
      this.$store.dispatch('addTodo', this.task).then(() => {
        this.task = ''
      })
    },
    completedTodo: function (todo) {
      this.$store.dispatch('completedTodo', todo)
    },
    uncompletedTodo: function (todo) {
      this.$store.dispatch('uncompleteTodo', todo)
    },
    deleteTodo: function (todo) {
      this.$store.dispatch('deleteTodo', todo)
    },
    getEditTodo: function (todo) {
      this.editTodo = todo
    },
    editTodoList: function () {
      this.$store.dispatch('editTodo', this.editTodo)
    }
  }
}
</script>

<style>
.jumbotron {
  max-width: 700px;
  margin: 0 auto;
  padding: 32px;
  background: rgba(135, 206, 235, 0.7)
}

.container{
  margin-top: 10px;
  /* max-width: 700px; */
}
input {
  height: 50px;
}
#inputid {
  max-width: 600px;
  margin-left: 250px;
}
#addbutton{
  max-width: 50px;
  margin-top: 37px;
}
.list-group-item {
  color: blue !important;
  text-align: left !important;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
#quoteid{
  max-width: 1000px;
  max-height: 100px;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 10px;
  background: rgba(196, 229, 56,0.4)
}
#qbody{
  font-size: 17px;
}

#completed {
  text-decoration: line-through;
  color: firebrick !important;
}

.icon {
  cursor: pointer;
}
.removeTag{
  position: absolute;
  right: 40px;
  cursor: pointer;
}
.editTag{
  position: absolute;
  right: 10px;
  cursor: pointer;
}

</style>
