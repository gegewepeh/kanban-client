<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark m-0" style="background-color: #002c4b; padding: 12px 20px;">
      <div class="container-fluid">
        <a class="navbar-brand" href="#" style="font-size: 26px;">Kanban</a>
      </div>
      <button v-if="showPage === 'kanban-page'" type="button" class="btn btn-primary mx-3" style="width: 120px;" data-bs-toggle="modal" data-bs-target="#addTask">Add Task</button>     
      <button v-if="showPage === 'kanban-page'" type="button" class="btn btn-danger" style="width: 120px;" @click.prevent="logout">Logout</button>
    </nav>

    <add-task-modal :task="task" :baseUrl="baseUrl" :error="error" @taskAdded="taskAdded"></add-task-modal>

  </div>
</template>

<script>
import axios from "axios"
import AddTaskModal from "./AddTaskModal"

export default {
  name: "NavBar",
  props: ['showPage', 'task', 'baseUrl', 'error'],
  components: {
    AddTaskModal
  },
  methods: {
    logout() {
      console.log ('logout clicked')
      localStorage.clear()
      this.$emit ('isLoggedOut', 'login-page')
    },
    taskAdded () {
      this.$emit ('taskAdded')
    }
  }
}
</script>

<style>

</style>