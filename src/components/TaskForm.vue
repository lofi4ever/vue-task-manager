<template>
  <div>
    <form action="" @submit.prevent>
      <input type="hidden" v-if="task.id" v-model="task.id">
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
      <button type="submit" @click="submit">{{ action === 'add' ? 'add task' : 'edit task' }}</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'TaskForm',
  props: {
    task: Object,
    action: {
      type: String,
      default: 'add'
    }
  },
  methods: {
    async submit() {
      try {
        if(this.action === 'add') {
          await this.$store.dispatch('tasks/addTask', this.task);  
        } else if(this.action === 'edit') {
          await this.$store.dispatch('tasks/editTask', this.task);  
        }
      } catch(err) {
        console.log(err);
        this.$bus.$emit('error', {
          message: 'failed to save task',
          delay: 3000
        });
      } finally {
        this.$emit('done');
      }
    }
  }
}
</script>