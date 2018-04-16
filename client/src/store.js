import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeUser: {
      userId: localStorage.getItem('userId') || '',
      token: localStorage.getItem('token') || '',
      name: localStorage.getItem('name') || ''
    },
    todos: [],
    quotes: ''
  },
  getters: {
    getActiveUser: function (state) {
      return state.activeUser
    },
    getQuote: function (state) {
      return state.quotes
    },
    getTodos: function (state) {
      return state.todos
    }
  },
  mutations: {
    showAllTodo: function (state, payload) {
      state.todos = payload
    },
    getQuote: function (state, payload) {
      state.quotes = payload
    },
    addTodo: function (state, payload) {
      console.log('mutaaddpayload', payload)
      state.todos.push(payload)
    }
  },
  actions: {
    signUp: function (context, payload) {
      console.log('signup payloda', payload)
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/signup',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      }).then(response => {
        console.log('respon signup', response)
        // document.querySelectorAll('#signInModal').modal('show')
      }).catch(error => {
        console.log(error.message)
      })
    },
    signIn: function (context, payload) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/signin',
        data: {
          email: payload.email,
          password: payload.password
        }
      }).then(response => {
        console.log('signin', response)
        localStorage.setItem('userId', response.data.data.id)
        localStorage.setItem('token', response.data.data.token)
        localStorage.setItem('name', response.data.data.name)
      }).catch(error => {
        console.log(error)
      })
    },
    addTodo: function (context, payload) {
      let token = context.state.activeUser.token
      console.log('payload add==', payload)
      if (token) {
        axios({
          method: 'post',
          url: 'http://localhost:3000/todo',
          headers: {
            id: context.state.activeUser.userId,
            token: token
          },
          data: {
            task: payload
          }
        }).then(function (response) {
          console.log('respon gettodo', response)
          context.commit('addTodo', response.data.todo)
        }).catch(function (err) {
          console.log(err)
        })
      } else {
        alert('Login first!')
      }
    },
    showAllTodo: function (context, payload) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/todo/' + context.state.activeUser.userId,
        headers: {
          token: context.state.activeUser.token
        }
      }).then(response => {
        console.log('respon get todo', response)
        context.commit('showAllTodo', response.data.listTodo)
      }).catch(error => {
        console.log(error)
      })
    },
    deleteTodo: function (context, payload) {
      axios({
        method: 'delete',
        url: `http://localhost:3000/todo/${payload._id}`,
        headers: {
          token: context.state.activeUser.token
        }
      }).then(function (response) {
        console.log('respon delete todo', response)
      }).catch(function (err) {
        console.log(err)
      })
    },
    completedTodo: function (context, payload) {
      axios({
        method: 'put',
        url: `http://localhost:3000/todo/completed/${payload._id}`,
        headers: {
          token: context.state.activeUser.token
        },
        data: payload
      }).then(function (response) {
        console.log('respon completetodo', JSON.stringify(response))
      }).catch(function (err) {
        console.log(err)
      })
    },
    uncompleteTodo: function (context, payload) {
      axios({
        method: 'put',
        url: `http://localhost:3000/todo/uncompleted/${payload._id}`,
        headers: {
          token: context.state.activeUser.token
        },
        data: payload
      }).then(function (response) {
        console.log('respon uncompletetodo', response)
      }).catch(function (err) {
        console.log(err)
      })
    },
    getQuote: function (context, payload) {
      axios({
        method: 'get',
        url: 'https://favqs.com/api/qotd'
      }).then(response => {
        console.log('quotes', response.data)
        context.commit('getQuote', response.data.quote)
      })
    }
  }
})

export default store
