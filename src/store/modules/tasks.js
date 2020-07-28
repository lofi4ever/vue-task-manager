import axios from 'axios'

const state = () => ({
  tasks: null
});

const getters = {
  tasks: state => state.tasks
}

const mutations = {
  addTask: (state, task) => {
    state.tasks.push(task);
  },
  removeTask: (state, task) => {
    state.tasks.splice(state.tasks.indexOf(task), 1);
  }
}

const actions = {
  async getTasks({ state }) {
    if(!state.tasks) {
      state.tasks = (await axios.get('/api/tasks/')).data;
    }

    return state.tasks;
  },
  async addTask(context, task) {
    try {
      let result = await axios.post('/api/tasks/', task); // put result in the list so it has a proper id
      context.commit('addTask', result.data);
    } catch(err) {
      console.log(err);
    }
  },
  async removeTask(context, task) {
    try {
      await axios.delete(`/api/tasks/${task.id}`);
      context.commit('removeTask', task);
    } catch(err) {
      console.log(err);
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}