<template>
  <div class="error" :class="'error-' + type">
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: 'Error',
    props: {
      message: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'danger'
      }
    }
  }
</script>