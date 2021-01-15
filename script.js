var app = new Vue({
  el: '#app',
  data: {
    baseUrl: 'http://localhost:3000',
    showPage: 'login-page',
    kanbans: [],
    categoryList: [],
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
    }
  },
  methods: {
    register () {
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
        this.login()
        this.userReg.email = ''
        this.userReg.password = ''
      })
      .catch (err => {
        console.log (err, 'error register')
      })
    },
    login() {
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
        this.user.email = ''
        this.user.password = ''
        localStorage.setItem ('access_token', res.data.access_token)
        this.fetchKanban()
        this.showPage = 'kanban-page'
      })
      .catch (err => {
        console.log (err, 'error login')
      })
    },
    noAcc () {
      this.showPage = 'register-page'
    },
    haveAcc() {
      this.showPage = 'login-page'
    },
    logout() {
      console.log ('logout clicked')
      localStorage.clear()
      this.showPage = 'login-page'
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
      })
      .then (res => {
        this.categoryList = res.data
      })
      .catch (err => {
        console.log (err, 'error fetch category list')
      })
    },
    addTask() {
      axios ({
        method: 'POST',
        url: `${this.baseUrl}/tasks`,
        data: {
          title: this.task.title,
          description: this.task.description,
          CategoryId: 1
        },
        headers: {
          'access_token': localStorage.access_token
        }
      })
      .then (res => {
        this.task.title = ''
        this.task.description = ''
        this.fetchKanban()
      })
      .catch (err => {
        console.log (err, 'error add task')
      })
    },
    editTaskBtn (id, title, description, catId) {
      this.editTask.id = id
      this.editTask.title = title
      this.editTask.description = description
      this.editTask.CategoryId = catId
    },
    editTaskSubmit () {
      console.log (this.editTask.CategoryId, 'categoryId')
      axios ({
        method: 'PUT',
        url: `${this.baseUrl}/tasks/${this.editTask.id}`,
        data: {
          title: this.editTask.title,
          description: this.editTask.description,
          CategoryId: this.editTask.CategoryId
        },
        headers: {
          'access_token': localStorage.access_token
        }
      })
      .then (res => {
        this.fetchKanban()
      })
      .catch (err => {
        console.log (err, 'error edit task')
      })
    },
    patchTask (id, catId) {
      axios ({
        method: 'PATCH',
        url: `${this.baseUrl}/tasks/${id}`,
        data: {
          CategoryId: catId
        },
        headers: {
          'access_token': localStorage.access_token
        }
      })
      .then (res => {
        this.fetchKanban()
      })
      .catch (err => {
        console.log (err, 'error patch task')
      })
    },
    deleteTask () {
      axios ({
        method: 'DELETE',
        url: `${this.baseUrl}/tasks/${this.editTask.id}`,
        headers: {
          'access_token': localStorage.access_token
        }
      })
      .then (res => {
        this.fetchKanban()
      })
      .catch (err => {
        console.log (err, 'error delete task')
      })
    }
  },
  computed: {
    backlogCat() {
      return this.kanbans.filter (kanban => kanban.CategoryId === 1)
    },
    todoCat() {
      return this.kanbans.filter (kanban => kanban.CategoryId === 2)
    },
    inProgressCat() {
      return this.kanbans.filter (kanban => kanban.CategoryId === 3)
    },
    completeCat() {
      return this.kanbans.filter (kanban => kanban.CategoryId === 4)
    }, 
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
})