import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: null
  },
  getters: {
    tasks: state => state.tasks
  },
  mutations: {
    addTask: (state, task) => {
      state.tasks.push(task);
    }
  },
  actions: {
    async getTasks({ state }) {
      if(!state.tasks) {
        state.tasks = (await axios.get('/api/tasks/')).data;
      }

      return state.tasks;
    },
    async addTask(context, task) {
      try {
        await axios.post('/api/tasks/', task);
        context.commit('addTask', task);
      } catch(err) {
        console.log(err);
      }
    }
  },
  modules: {
  }
})
