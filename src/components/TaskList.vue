<template>
  <div>
    <Task v-for="(task, index) in tasks"
      :task="task" 
      :key="index"
      @remove="remove"></Task>
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
  methods: {
    remove(task) {
      this.$store.dispatch('tasks/removeTask', task);
    }
  }
}
</script>