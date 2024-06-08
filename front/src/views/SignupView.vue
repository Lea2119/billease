<template>
  <div class="main">
    <v-card variant="flat" class="w-50">
      <v-card-title class="text-center pa-6 text-h4 font-weight-bold">
        Create your account
      </v-card-title>
      <v-form ref="form" @submit.prevent="signup()">
        <v-text-field
          v-model="email"
          label="Email"
          variant="outlined"
          class="mb-4"
          :rules="emailRules"
        />
        <v-text-field
          v-model="username"
          label="Username"
          :rules="usernameRules"
          variant="outlined"
          class="mb-4"
        />
        <v-text-field
          v-model="password"
          label="Password"
          variant="outlined"
          :rules="passwordRules"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
          class="mb-4"
        />
        <v-card-actions class="pa-0 justify-end">
          <v-btn variant="outlined" size="large" type="submit">Sign Up</v-btn>
          <v-btn variant="outlined" size="large" @click="resetForm">Reset</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <AlertComponent :status="statut" :message="message" />
  </div>
</template>

<script setup lang="ts">
import type { SignupFormData } from '@/models/user'
import router from '@/router'
import axios from 'axios'
import { ref } from 'vue'
import type { VForm } from 'vuetify/components'
import AlertComponent from '@/components/AlertComponent.vue'
import { resetForm } from '@/utils/global'
import { emailRules, usernameRules, passwordRules } from '@/utils/validationRules'

type Status = 'error' | 'success' | ''

const visible = ref<boolean>(false)
const email = ref<string>('')
const username = ref<string>('')
const password = ref<string>('')
const form = ref<VForm | null>(null)
const statut = ref<Status>('')
const message = ref<string>('')

const signup = async (): Promise<void> => {
  if (form.value) {
    const valid = await form.value.validate()
    if (valid) {
      const formData: SignupFormData = {
        email: email.value,
        username: username.value,
        password: password.value
      }

      axios
        .post('api/v1/users/', formData)
        .then(() => {
          statut.value = 'success'
          message.value = 'Signup successful!'
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        })
        .catch(() => {
          statut.value = 'error'
          message.value = 'Failed to signup'
        })
        .finally(() => {
          setTimeout(() => {
            statut.value = ''
          }, 1000)
        })
    }
  }
}
</script>

<style scoped></style>
