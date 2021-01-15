<template>
  <div id="register-page" v-if="showPage === 'register-page'" class="bg-image">
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
              <h2>Sign Up</h2>
            </div>

          <form action="" @submit.prevent="register">
            <div class="mt-5">
                <div class="m-1 m-3">
                  <label for="email" id="email-label">Email Address :</label>
                  <input class="form-control" v-model="userReg.email" type="text" id="reg-email" required>
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="m-1 m-3">
                  <label for="password">Password :</label>
                  <input class="form-control" v-model="userReg.password" type="password" id="reg-password" required>
                </div>
              </div>
              <div class="m-4">
                <button class="btn btn-success" id="register-button" type="submit">Sign Up</button>
                <button class="btn btn-primary" id="haveAcc-button" @click="haveAcc">I Have Account</button>
              </div>
              <div class="m-4" v-if="error.name === 'error register'">
                <div v-for="(err, idx) in error.message" :key="idx">
                  <small class="form-text error" >{{err}}</small>
                </div>
              </div>
                             
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  props: ['baseUrl', 'showPage', 'userReg', 'user', 'error'],
  methods: {
    haveAcc() {
      this.$emit ('haveAcc', 'login-page')
    },
    register() {
      this.error.name = ''
      this.error.message = ''
      axios ({
        method: 'POST',
        url: `${this.baseUrl}/register`,
        data: {
          email: this.userReg.email,
          password: this.userReg.password
        }
      })
      .then (res => {
        this.user.email = this.userReg.email
        this.user.password = this.userReg.password
        this.$emit ('registerEvent')
        this.userReg.email = ''
        this.userReg.password = ''
        this.error.name = ''
        this.error.message = ''
      })
      .catch (err => {
        this.error.name = 'error register'
        this.error.message = err.response.data.message
      })
    }
  }
}
</script>

<style>

</style>