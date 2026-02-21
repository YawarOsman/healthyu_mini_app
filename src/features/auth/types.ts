import { BoxEntity } from "../order/types"

export interface AuthState {
  // User info
  name: string
  phone: string
  email: string
  selfiePath: string | null
  isSelfieSaved: boolean

  // Order tracking
  isUserOrderedABox: boolean
  boxes: BoxEntity[]
  estimatedDeliveryDate: string | null
}
