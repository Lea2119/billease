<template>
  <v-alert
    class="alert ma-3"
    v-if="status"
    :color="status === AlertType.ERROR ? 'red' : 'green-lighten-1'"
    variant="outlined"
    width="fit-content"
  >
    <p>{{ message }}</p>
  </v-alert>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

enum AlertType {
  ERROR = 'error',
  SUCCESS = 'success'
}

defineProps({
  status: {
    type: String,
    required: true,
    default: ''
  },
  message: {
    type: String,
    required: true,
    default: ''
  }
})
</script>

<style scoped>
.alert {
  position: fixed;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%);
}
</style>
