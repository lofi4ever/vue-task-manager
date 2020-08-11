<template>
  <div class="errors-list" v-if="errors.length">
    <Error v-for="(error, index) in errors" :key="index" :message="error.message" :type="error.type"></Error>
  </div>
</template>

<script>
  import Error from './Error';

  export default {
    name: 'Errors',
    components: {
      Error
    },
    data() {
      return {
        errors: {}
      }
    },
    computed: {
      newIndex() {
        if(!this.errors.length) {
          return 0;
        } else {
          return Math.max(...Object.keys(this.errors).map((item) => +item)) + 1;
        }
      }
    },
    created() {
      this.$bus.$on('error', function(error) {
        let {delay} = error;
        this.errors[this.newIndex] = error;
        if(delay) {
          setTimeout(() => {
            delete this.errors[this.newIndex]
          }, delay);
        }
      })
    }
  }
</script>