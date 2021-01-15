<template>


    <div>
      <div class="border mb-1 p-3 bg-white rounded shadow-sm">
        <h2>{{tasks.title}}</h2>
        <p>{{tasks.description}}</p>
        <p>by: {{ tasks.UserName }}</p>
        <small>created: {{ tasks.createdAt.slice(0, 10) }}</small>
        <div class="col-12 text-center mt-4">
          <button class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#viewDetailsModal" @click="editTaskBtn (tasks.id, tasks.title, tasks.description, tasks.CategoryId, tasks.UserId)">View details</button>
          <div class="dropdown" style="float: right;">
            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"><img src="../assets/move-icon.png" alt="move-icon" class="custom-move-button">
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li v-for="(category, idx) in categoryList" :key="idx"><a class="dropdown-item" href="#" @click="patchTask (tasks.id, category.id)">{{category.name}}</a></li>
            </ul>
          </div>
        </div>
      </div>

      <view-details-modal :tasks="tasks" :editTask="editTask" :categoryList="categoryList" :baseUrl="baseUrl" :error="error" :noAccess="noAccess" @dataChangeEvent="dataChangeEvent"></view-details-modal>

    </div>
    

</template>

<script>
import Swal from 'sweetalert2'
import ViewDetailsModal from "./ViewDetailsModal"

export default {
  name: 'KanbanCards',
  components: {
    ViewDetailsModal
  },
  data () {
    return {
      noAccess: true
    } 
  },
  props: ['kanbans', 'tasks', 'categoryList', 'editTask', 'baseUrl', 'error'],
  methods: {
    editTaskBtn (id, title, description, catId, UserId) {
      console.log (+localStorage.user_id, UserId, 'match user id')
      if (+localStorage.user_id !== UserId) {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'You do not have access'
          })
        this.noAccess = true
        this.error.name = 'unauthorized'
      }
      this.editTask.id = id
      this.editTask.title = title
      this.editTask.description = description
      this.editTask.CategoryId = catId
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
        this.$emit ('dataChangeEvent')
      })
      .catch (err => {
        console.log (err, 'error patch task')
      })
    },
    dataChangeEvent () {
      this.$emit ('dataChangeEvent')
    }
  }
}
</script>

<style>

</style>