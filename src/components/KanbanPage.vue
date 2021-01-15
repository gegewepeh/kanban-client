<template>
    <!-- Kanban -->
    <div id="kanban-page" v-if="showPage === 'kanban-page'">
      <div class="container-md mt-4" id="kanban-page">
        <div class="row">
          <div class="col-3 px-2" v-for="category in categoryList" :key="category.id">
  
            <div class="text-center mb-1 p-1 rounded-top shadow-sm" :style="customStyle (category.color)">
              <h3>{{ category.name }}</h3>
            </div>

            <div class="overflow-auto" style="height: 80vh;">
              <!-- kanban-cards -->
              <kanban-cards v-for="tasks in category.Tasks" :key="tasks.id" :tasks="tasks" :categoryList="categoryList" :editTask="editTask" :baseUrl="baseUrl" :error="error"
              @dataChangeEvent="dataChangeEvent"
              ></kanban-cards>
            </div>
            
          </div>
  
        </div>
      </div>
    </div>
</template>

<script>
import KanbanCards from "./KanbanCards"

export default {
  name: "KanbanPage",
  props: ['showPage', 'kanbans', 'categoryList', 'editTask', 'baseUrl', 'error'],
  methods: {
    dataChangeEvent () {
      this.$emit ('dataChangeEvent')
    },
    customStyle (color) {
      return `color: white; background-color: ${color};`
    } 
  },
  components: {
    KanbanCards
  },
}
</script>

<style>

</style>