<template>
  <div class="task" :class="{complete: task.isComplete}">
    <div class="task-name">{{ task.name }}</div>
    <div class="task-description">{{ task.description }}</div>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: {
    task: Object
  }
}
</script>