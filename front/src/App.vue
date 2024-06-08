<template>
  <Toolbar />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toolbar from '@/components/ToolBarComponent.vue'
</script>

<style scoped></style>
