import {
  SET_USER_INFO,
  SET_SELFIE_SAVED,
  SET_USER_ORDERED_BOX,
  SET_USER_BOXES,
  SET_ESTIMATED_DELIVERY,
} from './constants'

export const setUserInfo = (info: { name?: string; phone?: string; email?: string }) => ({
  type: SET_USER_INFO,
  payload: info,
})

export const setSelfieSaved = (path: string) => ({
  type: SET_SELFIE_SAVED,
  payload: path,
})

export const setUserOrderedBox = (ordered: boolean) => ({
  type: SET_USER_ORDERED_BOX,
  payload: ordered,
})

export const setUserBoxes = (boxes: any[]) => ({
  type: SET_USER_BOXES,
  payload: boxes,
})

export const setEstimatedDelivery = (date: string) => ({
  type: SET_ESTIMATED_DELIVERY,
  payload: date,
})
