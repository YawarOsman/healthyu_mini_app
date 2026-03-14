import { Gender } from "@/core/types"

export interface AuthState {
  name: string
  phone: string | null
  email: string | null 
  qiAuthToken: string
  isUserOrderedABox: boolean
  isUserHaveBox: boolean
  gender: Gender
  selfiePath: string | null
}
