import { Gender } from "@/core/types"

export interface AuthState {
  // User info
  name: string
  phone: string | null
  email: string | null 
  qiAuthToken: string
  gender: Gender
  selfiePath: string | null
}
