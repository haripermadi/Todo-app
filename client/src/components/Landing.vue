<template>
<div>
  <div v-if="token === ''">
    <h1><span><i class="fas fa-clipboard-list"></i></span> DoDo</h1>
    <p>Do what you should Do with DoDO!</p>
    <div class="jumbotron">
      <div class="container"><button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#signUpModal">Sign Up</button></div>
      <div class="container"><button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#signInModal">Login</button></div>
      <!-- <div class="container"><button type="button" id="fbbutton" class="fb-login-button btn-block" scope="public_profile,email" onlogin="checkLoginState();">Login With facebook</button></div> -->
      <div class="container fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false" scope="public_profile,email" onlogin="checkLoginState();"></div>
    </div>
  </div>
  <home v-if="token !== ''"></home>
  <!-- signup -->
  <div class="modal fade" id="signUpModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Sign Up</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="name" class="col-form-label">Name:</label>
              <input type="text" class="form-control" v-model="objNewuser.name" placeholder="name...">
            </div>
            <div class="form-group">
              <label for="email" class="col-form-label">Email:</label>
              <p :class="{ 'control': true }">
                <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" class="form-control" v-model="objNewuser.email" placeholder="Email">
                <span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
              </p>
              <!-- <input type="text" class="form-control" v-model="objNewuser.email" placeholder="email..."> -->
            </div>
            <div class="form-group">
              <label for="password" class="col-form-label">Password:</label>
               <p class="control has-icon has-icon-right">
                <input name="password" v-validate="'required|min:6'" :class="{'input': true, 'is-danger': errors.has('password') }" type="password" class="form-control" v-model="objNewuser.password"  placeholder="Password">
                <i v-show="errors.has('password')" class="fa fa-warning"></i>
                <span v-show="errors.has('password')" class="help text-danger">{{ errors.first('password') }}</span>
            </p>
              <!-- <input type="password" class="form-control" v-model="objNewuser.password" placeholder="password..."> -->
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="signUpButton">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
<!-- login -->
  <div class="modal fade" id="signInModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Log In</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="email" class="col-form-label">Email:</label>
              <input type="text" class="form-control" placeholder="email..." v-model="objUser.email">
            </div>
            <div class="form-group">
              <label for="password" class="col-form-label">Password:</label>
              <input type="password" class="form-control" placeholder="password..." v-model="objUser.password">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="signInButton">Log In</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Home from '@/components/Home'
export default {
  name: 'Landing',
  components: {
    Home
  },
  data () {
    return {
      objNewuser: {
        name: '',
        email: '',
        password: ''
      },
      objUser: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signUpButton: function () {
      this.$store.dispatch('signUp', this.objNewuser)
    },
    signInButton: function () {
      this.$store.dispatch('signIn', this.objUser)
    }
  },
  computed: {
    token: function () {
      return this.$store.getters.getActiveUser.token
    }
  }

}
</script>

<style scoped>
.container{
  margin-top: 10px;
  max-width: 400px;
  /* background: rgba(0, 0, 0, 0.7) */
  background: transparent;
}

button{
  height: 50px;
}
.jumbotron {
  max-width: 700px;
  margin: 0 auto;
  padding: 32px;
  background: rgba(135, 206, 235, 0.5)
}

.fb-login-button {
  height: 100% !important;
  width: 100% !important;
}
#fbbutton{
  height: 100% !important;
  width: 100% !important;
}
</style>
