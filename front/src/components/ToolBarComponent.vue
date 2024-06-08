<template>
  <v-toolbar class="px-3" color="transparent">
    <v-icon icon="mdi-volleyball" />
    <v-toolbar-title class="font-weight-bold" @click="navigate('/')">BillEase</v-toolbar-title>
    <div v-if="store.user.isAuthenticated">
      <v-btn @click="logout" text="Logout" />
    </div>
    <div v-else>
      <v-btn variant="text" @click="navigate('/signup')" text="Sign Up" />
      <v-btn variant="text" @click="navigate('/login')" text="Login" />
    </div>
  </v-toolbar>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import axios from 'axios'

const store = useUserStore()
const router = useRouter()

const logout = async (): Promise<void> => {
  try {
    await axios.post('api/v1/token/logout/')
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('token')
    store.removeToken()
    router.push('/')
  } catch (error) {
    console.log('Failed to logout:', error)
  }
}

const navigate = (path: string) => router.push(path)
</script>
