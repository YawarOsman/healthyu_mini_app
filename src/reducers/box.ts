import {
  FETCH_BOX_REQUEST,
  FETCH_BOX_SUCCESS,
  FETCH_BOX_FAILURE,
} from '../actions/box'
import { BoxEntity } from '../types/box'

export interface BoxState {
  loading: boolean
  box: BoxEntity | null
  error: string | null
}

const INITIAL_STATE: BoxState = {
  loading: false,
  box: null,
  error: null,
}

export default function box(state = INITIAL_STATE, action: any): BoxState {
  switch (action.type) {
    case FETCH_BOX_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_BOX_SUCCESS:
      return {
        ...state,
        loading: false,
        box: action.payload,
        error: null,
      }
    case FETCH_BOX_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
