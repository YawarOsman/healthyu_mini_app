export interface RegistrationState {
  name: string
  dob: string
  phone: string
  email: string
  loginMethod: 0 | 1 // 0 = phone, 1 = email
}
