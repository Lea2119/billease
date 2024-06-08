<template>
  <div class="main">
    <v-card variant="flat" class="w-50">
      <v-card-title class="text-center pa-6 text-h4 font-weight-bold">
        Log into your account
      </v-card-title>
      <v-form ref="form" @submit.prevent="login()">
        <v-text-field
          v-model="username"
          label="Username"
          :rules="usernameRules"
          variant="outlined"
          class="mb-4"
        />
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
          v-model="password"
          label="Password"
          variant="outlined"
          :rules="passwordRules"
          class="mb-4"
        />
        <v-card-actions class="pa-0 justify-end">
          <v-btn color="black" variant="outlined" size="large" type="submit">Login</v-btn>
          <v-btn color="black" variant="outlined" size="large" @click="resetForm">Reset</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <AlertComponent :status="statut" :message="message" />
    <p>bcHKTy9vrGp9NlV!</p>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { ref } from 'vue'
import type { VForm } from 'vuetify/components'
import AlertComponent from '@/components/AlertComponent.vue'
import { resetForm } from '@/utils/global'
import { usernameRules, passwordRules } from '@/utils/validationRules'

const userStore = useUserStore()

type Status = 'error' | 'success' | ''

const visible = ref<boolean>(false)
const username = ref<string>('')
const password = ref<string>('')
const form = ref<VForm | null>(null)
const statut = ref<Status>('')
const message = ref<string>('')

const login = async (): Promise<void> => {
  if (form.value) {
    const valid = await form.value.validate()
    if (valid) {
      axios.defaults.headers.common['Authorization'] = ''
      localStorage.removeItem('token')

      const formData = {
        username: username.value,
        password: password.value
      }
      axios
        .post('/api/v1/token/login', formData)
        .then((response) => {
          const token: string = response.data.auth_token
          userStore.setToken(token)
          axios.defaults.headers.common['Authorization'] = `Token ${token}`
          localStorage.setItem('token', token)
          statut.value = 'success'
          message.value = 'Login successful!'
          setTimeout(() => {
            router.push('/dashboard')
          }, 1000)
        })
        .catch(() => {
          statut.value = 'error'
          message.value = 'Failed to login'
        })
        .finally(() => {
          setTimeout(() => {
            statut.value = ''
          }, 2000)
        })
    }
  }
}
</script>

<style scoped></style>
