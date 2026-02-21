import {
  SET_USER_INFO,
  SET_SELFIE_SAVED,
  SET_USER_ORDERED_BOX,
  SET_USER_BOXES,
  SET_ESTIMATED_DELIVERY,
} from './constants'
import type { AuthState } from './types'

const INITIAL_STATE: AuthState = {
  name: '',
  phone: '+964 772 128 7272',
  email: '',
  selfiePath: null,
  isSelfieSaved: true, // Mock: assume selfie is saved for dev
  isUserOrderedABox: true,
  boxes: [
    {
      id: 1,
      nameEn: 'Nail Serum',
      nameAr: 'سيروم الأظافر',
      headlineEn: 'Vitamin B7 + Keratin',
      headlineAr: 'فيتامين ب7 + كيراتين',
      videoUrl: null,
      videoThumbnail: null,
      image: '',
      isCurrent: false,
      isOverdue: true,
      isLater: false,
      isCompleted: false,
      genres: [],
      items: [],
    },
    {
      id: 2,
      nameEn: 'Magnesium',
      nameAr: 'مغنيسيوم',
      headlineEn: 'Shines your skin and protects nails.',
      headlineAr: 'يضيء بشرتك ويحمي الأظافر.',
      videoUrl: null,
      videoThumbnail: null,
      image: '',
      isCurrent: true,
      isOverdue: false,
      isLater: false,
      isCompleted: false,
      genres: [],
      items: [],
    },
    {
      id: 3,
      nameEn: 'Nail Serum',
      nameAr: 'سيروم الأظافر',
      headlineEn: 'Vitamin B7 + Keratin',
      headlineAr: 'فيتامين ب7 + كيراتين',
      videoUrl: null,
      videoThumbnail: null,
      image: '',
      isCurrent: false,
      isOverdue: false,
      isLater: true,
      isCompleted: false,
      timeLabel: '3:00 PM',
      genres: [],
      items: [],
    },
    {
      id: 4,
      nameEn: 'Heel Repair Cream',
      nameAr: 'كريم إصلاح الكعب',
      headlineEn: 'Shea Butter',
      headlineAr: 'زبدة الشيا',
      videoUrl: null,
      videoThumbnail: null,
      image: '',
      isCurrent: false,
      isOverdue: false,
      isLater: true,
      isCompleted: false,
      timeLabel: '8:00 PM',
      genres: [],
      items: [],
    },
    {
      id: 5,
      nameEn: 'Nail Serum',
      nameAr: 'سيروم الأظافر',
      headlineEn: 'Vitamin B7 + Keratin',
      headlineAr: 'فيتامين ب7 + كيراتين',
      videoUrl: null,
      videoThumbnail: null,
      image: '',
      isCurrent: false,
      isOverdue: false,
      isLater: false,
      isCompleted: true,
      genres: [],
      items: [],
    },
  ],
  estimatedDeliveryDate: null,
}

export default function auth(state = INITIAL_STATE, action: { type: string; payload?: any }): AuthState {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...state, ...action.payload }

    case SET_SELFIE_SAVED:
      return { ...state, isSelfieSaved: true, selfiePath: action.payload }

    case SET_USER_ORDERED_BOX:
      return { ...state, isUserOrderedABox: action.payload }

    case SET_USER_BOXES:
      return { ...state, boxes: action.payload }

    case SET_ESTIMATED_DELIVERY:
      return { ...state, estimatedDeliveryDate: action.payload }

    default:
      return state
  }
}
