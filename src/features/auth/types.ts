export interface AuthState {
  // User info
  name: string
  phone: string
  email: string
  selfiePath: string | null
  isSelfieSaved: boolean

  // Order tracking
  isUserOrderedABox: boolean
  boxes: any[] // Will be BoxEntity[] once user receives and scans
  estimatedDeliveryDate: string | null
}
