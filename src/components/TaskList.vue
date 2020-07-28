<template>
  <div>
    <Task v-for="(task, index) in tasks" :task="task" :key="index"></Task>
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
  }
}
</script>