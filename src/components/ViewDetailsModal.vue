<template>
  <div class="modal fade" id="viewDetailsModal" tabindex="-1" aria-labelledby="viewDetails-modal-label" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Task</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form action="" @submit.prevent="editTaskSubmit">
          <div class="modal-body">
            <label for="title-edit">Title:</label>
            <input v-model="editTask.title" type="text" id="title">
            <small v-if="error.name === 'error edit'" class="form-text error">{{error.message[0]}}</small>
            <br>
            <br>
            <label for="description-edit">Description:</label>
            <input v-model="editTask.description" type="text" id="description">
            <br>
            <br>
            <label for="CategoryId-edit">Category:</label>
            <select v-model="editTask.CategoryId" id="CategoryId-edit">
              <option v-for="(category, idx) in categoryList" :key="idx" v-bind:value="category.id">{{category.name}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <div style="float: left;">
              <button type="button" class="btn btn-danger" @click="deleteTask ()">Delete</button>
            </div>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancelDetails-btn" @click="cancelClick">Cancel</button>
            <button type="submit" class="btn btn-primary" >Edit Task</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "ViewDetailsModal",
  props: ['editTask', 'categoryList', 'baseUrl', 'error', 'noAccess'],
  methods: {
    editTaskSubmit () {
      this.error.name = ''
      this.error.message = ''
      axios ({
        method: "PUT",
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
        $( "#cancelDetails-btn" ).click();
        this.$emit ('dataChangeEvent')
      })
      .catch (err => {
        console.log (err, 'error edit task')
        this.error.name = 'error edit'
        this.error.message = err.response.data.message
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
        $( "#cancelDetails-btn" ).click();
        this.$emit ('dataChangeEvent')
      })
      .catch (err => {
        console.log (err, 'error delete task')
      })
    },
    cancelClick () {
      this.error.name = ''
      this.error.message = ''
    }
  }
}
</script>

<style>

</style>