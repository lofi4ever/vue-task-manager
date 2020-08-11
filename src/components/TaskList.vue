<template>
  <div>
    <Task v-for="(task, index) in tasks"
      :task="task" 
      :key="index"
      @remove="remove"
      @edit="edit"></Task>
  </div>
</template>

<script>
import Task from './Task'

export default {
  name: 'TaskList',
  props: {
    tasks: Array
  },
  components: {
    Task
  },
  data() {
    return {
      //
    }
  },
  inject: ['setTaskToEdit'],
  methods: {
    remove(task) {
      this.$store.dispatch('tasks/removeTask', task);
    },
    edit(task) {
      this.setTaskToEdit(task);
    }
  }
}
</script>