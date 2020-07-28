<template>
  <div>
    <h2>Task List</h2>

    <template v-if="loading">
      loading...
    </template>
    <template v-else-if="errored">
      there was an error while trying to get tasks 
    </template>
    <template v-else>
      <TaskList v-if="tasks.length" :tasks="tasks"></TaskList>
      <template v-else>task list is empty</template>
      <TaskForm></TaskForm>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'

export default {
  name: 'Tasks',
  components: {
    TaskList,
    TaskForm
  },
  data() {
    return {
      loading: true,
      errored: false
    }
  },
  computed: mapGetters(['tasks']),
  async created() {
    try {
      await this.getTasks();
    } catch(err) {
      console.log(err);
      this.errored = true;
    } finally {
      this.loading = false;
    }
  },
  methods: mapActions(['getTasks'])
}
</script>