export interface User {
  name: string
  isAuthenticated: boolean
  token: string
}

export interface SignupFormData {
  username: string
  email: string
  password: string
}
