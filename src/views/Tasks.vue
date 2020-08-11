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
      <template>
        <TaskForm 
        v-show="isFormShownComputed"
        :task="currentTask" 
        :action="currentAction"
        @done="resetForm"></TaskForm>
        <button v-if="isFormShown" @click="isFormShown = false">Close Form</button>
        <button v-else @click="isFormShown = true">Add Task</button>
      </template>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TaskModel from '../models/task.model'
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
      errored: false,
      currentTask: new TaskModel(),
      currentAction: 'add',
      isFormShown: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasks']),
    isFormShownComputed() {
      return this.isFormShown || (!this.loading && !this.tasks.length);
    }
  },
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
  methods: {
    ...mapActions('tasks', ['getTasks']),
    resetForm() {
      this.currentTask = new TaskModel();
      this.currentAction = 'add';
    },
    setTaskToEdit(task) {
      this.currentTask = task;
      this.currentAction = 'edit';
      this.isFormShown = true;
    }
  },
  provide() {
    return {
      setTaskToEdit: this.setTaskToEdit
    }
  }
}
</script>