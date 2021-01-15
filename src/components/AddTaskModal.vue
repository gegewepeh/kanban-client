<template>
  <div class="modal fade" id="addTask" tabindex="-1" aria-labelledby="addTaskLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Task</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form action="" @submit.prevent="addTask">
            <div class="modal-body">
                <label for="title">Title:</label>
                <input class="form-control" v-model="task.title" type="text" id="title">
                <small v-if="error.name === 'error input'" class="form-text error">{{error.message[0]}}</small>
                <br>
                <br>
                <label for="description">Description:</label>
                <input class="form-control" v-model="task.description" type="text" id="description">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancelAddTask-btn">Cancel</button>
              <button type="submit" class="btn btn-primary">Add Task</button>
            </div>
          </form>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "AddTaskModal",
  props: ['task', 'baseUrl', 'error'],
  methods: {
    addTask() {
      axios ({
        method: "POST",
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
        this.error.name = ''
        $( "#cancelAddTask-btn" ).click();
        this.$emit ('taskAdded') 
      })
      .catch (err => {
        this.error.name = 'error input'
        this.error.message = err.response.data.message
      })
    }
  }
}
</script>

<style>

</style>