<template>
  <div>
    <form action="" @submit.prevent="addTask">
      <label>
        Name:
        <input type="text" v-model="task.name">
      </label><br>
      <label>
        Description
        <textarea v-model="task.description"></textarea>
      </label><br>
      <label>
        <input type="checkbox" v-model="task.isComplete"> Complete
      </label><br>
      <button type="submit">Add task</button>
    </form>
  </div>
</template>

<script>

const TaskModel = function() {
  this.name = "";
  this.description = "";
  this.isComplete = false;
};

export default {
  name: 'TaskForm',
  data() {
    return {
      task: new TaskModel
    }
  },
  methods: {
    async addTask() {
      try {
        await this.$store.dispatch('tasks/addTask', this.task);
      } catch(err) {
        console.log(err);
      } finally {
        this.clear();
      }
    },
    clear() {
      this.task = new TaskModel;
    }
  }
}
</script>