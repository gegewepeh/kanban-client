<template>
  <div>
    <nav-bar :showPage="showPage"
    @isLoggedOut="changePage"
    @taskAdded="refreshList"
    :task="task"
    :baseUrl="baseUrl"
    :error="error"
    ></nav-bar>

    <login-page :showPage="showPage"
    :user="user"
    :baseUrl="baseUrl"
    :error="error"
    @loginEvent="login"
    @noAcc="changePage"
    @loginEventGoogle="loginEventGoogle"
    ></login-page>

    <register-page :showPage="showPage"
    :user="user"
    :userReg="userReg"
    :baseUrl="baseUrl"
    :error="error"
    @haveAcc="changePage"
    @registerEvent="login"
    ></register-page>

    <kanban-page :showPage="showPage"
    :kanbans="kanbans"
    :categoryList="categoryList"
    :editTask="editTask"
    :baseUrl="baseUrl"
    :error="error"
    @dataChangeEvent="refreshList"
    ></kanban-page>
  </div>

</template>

<script>
import axios from "axios"
import Swal from 'sweetalert2'
import NavBar from "./components/NavBar"
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"
import KanbanPage from "./components/KanbanPage"

export default {
  name: "App",
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      showPage: 'login-page',
      kanbans: [],
      categoryList: [],
      currentUserId: 0,
      user: {
        email: '',
        password: ''
      },
      userReg: {
        email: '',
        password: ''
      },
      task: {
        title: '',
        description: ''
      },
      editTask: {
        title: '',
        description: '',
        CategoryId: ''
      },
      error: {
        name: '',
        message: ''
      }
    }
  },
  components: {
    NavBar,
    LoginPage,
    RegisterPage,
    KanbanPage
  },
  methods: {
    changePage ( pageName ) {
      this.showPage = pageName
    },
    refreshList () {
      console.log ('list refreshed')
      this.fetchKanban()
      this.fetchCategories()
    },
    loginEventGoogle () {
      this.refreshList()
      this.changePage ('kanban-page')
    },
    login () {
      axios ({
        method: 'POST',
        url: `${this.baseUrl}/login`,
        data: {
          email: this.user.email,
          password: this.user.password
        },
      })
      .then (res => {
        console.log (res.data, 'after login')
        localStorage.setItem ('user_id', res.data.id)
        localStorage.setItem ('access_token', res.data.access_token)
        this.fetchKanban()
        this.fetchCategories()
        Swal.fire(
            'Signed in!',
            `Signed in as ${this.user.email}!`,
            'success'
          )
        this.user.email = ''
        this.user.password = ''
        this.error.name = ''
        this.changePage ('kanban-page')

      })
      .catch (err => {
        this.error.name = 'error'
        this.error.message = err.response.data.message
        console.log (err.response.data.message, 'error login')
      })
    },
    fetchKanban() {
      axios ({
        method: 'GET',
        url: `${this.baseUrl}/tasks`,
        headers: {
          'access_token': localStorage.access_token
        }
      })
      .then (res => {
        this.kanbans = res.data
        console.log (this.kanbans, 'kanbans')
      })
      .catch (err => {
        console.log (err, 'error fetch kanban')
      })
    },
    fetchCategories () {
      axios ({
        method: 'GET',
        url: `${this.baseUrl}/categories`,
        headers: {
          'access_token': localStorage.access_token
        }
      })
      .then (res => {
        this.categoryList = res.data
        console.log (this.categoryList, 'category list')
      })
      .catch (err => {
        console.log (err, 'error fetch category list')
      })
    }
  },
  created() {
    if (localStorage.access_token){
      this.showPage = 'kanban-page'
      this.fetchKanban()
      this.fetchCategories()
    } else {
      this.showPage = 'login-page'
    }
  }
}
</script>

<style>


</style>