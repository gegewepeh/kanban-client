<template>
      <!-- login-page -->
    <div id="login-page" v-if="showPage === 'login-page'" class="bg-image">
      <div class="container mt-5">
        <div class="row">
          <div class="col-7">
            <div class="m-5 text-center">
              <h3>Welcome to our web-based Kanban software, supporting you in managing tasks and projects with colorful sticky notes tracked on a virtual board.</h3>
              <h3>It lets you use your own computer screen to visualize, control and optimize workflow and collaborate with other team members in real-time.</h3>
            </div>
          </div>
          <div class="col-5 border bg-white black-text">
            <div class="m-4 mt-5">
              <h2>Sign In</h2>
            </div>

            <form action="" @submit.prevent="loginEvent">
              <div class="mt-5 black-text">
                  <div class="m-1 m-3">
                    <label for="email" id="email-label">Email Address :</label>
                    <input class="form-control" v-model="user.email" type="text" id="email" required>
                    <small v-if="error.name !== 'error'" id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div class="m-1 m-3">
                    <label for="password">Password :</label>
                    <input class="form-control" v-model="user.password" type="password" id="password" required>
                  </div>
                </div>
                <div class="m-4">
                  <button class="btn btn-success" id="login-button" type="submit">Sign In</button>
                  <button class="btn btn-primary" id="noAcc-button" @click="noAcc">Don't Have Account</button>
                </div>
                <button v-google-signin-button="clientId" class="google-signin-button m-4"> Continue with Google</button>
                <div class="m-4">
                  <small v-if="error.name === 'error'" id="emailHelp" class="form-text error">{{error.message}}</small>
                </div>

            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import GoogleSignInButton from 'vue-google-signin-button-directive'
import Swal from 'sweetalert2'
import axios from "axios"

export default {
  name: "LoginPage",
  directives: {
    GoogleSignInButton
  },
  data: () => ({
    clientId: '673562065790-bh86ciscgbjg4gedd2rtho3ju1m0tjhc.apps.googleusercontent.com'
  }),
  props: ['showPage', 'user', 'baseUrl', 'error'],
  methods: {
    noAcc () {
      this.$emit ('noAcc', 'register-page')
    },
    loginEvent () {
      this.$emit ("loginEvent")
    },
    OnGoogleAuthSuccess (id_token) {
      axios ({
        method: 'POST',
        url: `${this.baseUrl}/googleSignIn`,
        data: {id_token}
      })
      .then (res => {
        console.log (res.data, 'google sign in response --------------------')
        localStorage.setItem ('user_id', res.data.id)
        localStorage.setItem ('access_token', res.data.access_token)
        Swal.fire(
            'Signed in!',
            `Signed in with google account!`,
            'success'
          )
        this.$emit ("loginEventGoogle")
      })
      .catch ((xhr, status) => {
        console.log ('fail login google')
      })
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    }
  }
}
</script>

<style>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

</style>