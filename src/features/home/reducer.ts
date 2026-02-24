import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { RoutineEntity, BaseStreakEntity } from './types'

export interface HomeState {
  todayRoutine: RoutineEntity[]
  weeklyStreaks: BaseStreakEntity[]
  loading: boolean
  error: string | null
}

const now = new Date()
// Create a fake future time for 'due now' (+10m)
const dueHour = String(now.getHours()).padStart(2, '0')
const dueMin = String(Math.min(now.getMinutes() + 10, 59)).padStart(2, '0')

// Create a fake past time for 'overdue' (-45m)
const overdueDate = new Date(now.getTime() - 45 * 60000)
const overdueHour = String(overdueDate.getHours()).padStart(2, '0')
const overdueMin = String(overdueDate.getMinutes()).padStart(2, '0')

// Create a fake future time for 'later today' (+3 hours)
const laterDate = new Date(now.getTime() + 3 * 60 * 60000)
const laterHour = String(laterDate.getHours()).padStart(2, '0')
const laterMin = String(laterDate.getMinutes()).padStart(2, '0')

const MOCK_ROUTINES: RoutineEntity[] = [
  {
    id: 'r1',
    productId: 'p1',
    productNameEn: 'Nail Serum Drops',
    productNameAr: 'قطرات سيروم الأظافر',
    descriptionEn: 'Vitamin B7 + Keratin',
    descriptionAr: 'فيتامين ب7 + كيراتين',
    productImageUrl: 'https://picsum.photos/seed/nail/200',
    productDisplayImage: 'https://www.svgrepo.com/show/216426/flask-chemical.svg',
    productVideoUrl: '',
    tipsEn: [],
    tipsAr: [],
    timeToRemind: {
      id: 'rt1',
      reminderId: 'rem1',
      time: `${overdueHour}:${overdueMin}`,
      minimumTime: '00:00',
      maximumTime: '23:59',
      isCompleted: false,
      usageDurationInMinutes: 5,
    },
  },
  {
    id: 'r2',
    productId: 'p2',
    productNameEn: 'Magnesium Tablets',
    productNameAr: 'أقراص المغنيسيوم',
    descriptionEn: 'Shines your skin and protects nails.',
    descriptionAr: 'يضيء بشرتك ويحمي الأظافر.',
    productImageUrl: 'https://picsum.photos/seed/mag/200',
    productDisplayImage: 'https://www.svgrepo.com/show/216426/flask-chemical.svg',
    productVideoUrl: '',
    tipsEn: [],
    tipsAr: [],
    timeToRemind: {
      id: 'rt2',
      reminderId: 'rem2',
      time: `${dueHour}:${dueMin}`,
      minimumTime: '00:00',
      maximumTime: '23:59',
      isCompleted: false,
      usageDurationInMinutes: 1,
    },
  },
  {
    id: 'r3',
    productId: 'p3',
    productNameEn: 'Skin Balm',
    productNameAr: 'بلسم البشرة',
    descriptionEn: null,
    descriptionAr: null,
    productImageUrl: 'https://picsum.photos/seed/balm/200',
    productDisplayImage: 'https://www.svgrepo.com/show/216426/flask-chemical.svg',
    productVideoUrl: '',
    tipsEn: [],
    tipsAr: [],
    timeToRemind: {
      id: 'rt3',
      reminderId: 'rem3',
      time: `${laterHour}:${laterMin}`,
      minimumTime: '00:00',
      maximumTime: '23:59',
      isCompleted: false,
      usageDurationInMinutes: 2,
    },
  },
  {
    id: 'r4',
    productId: 'p4',
    productNameEn: 'Vitamin D3',
    productNameAr: 'فيتامين د3',
    descriptionEn: 'Supports bone health and immunity.',
    descriptionAr: 'يدعم صحة العظام والمناعة.',
    productImageUrl: 'https://picsum.photos/seed/vitd/200',
    productDisplayImage: 'https://www.svgrepo.com/show/216426/flask-chemical.svg',
    productVideoUrl: '',
    tipsEn: [],
    tipsAr: [],
    timeToRemind: {
      id: 'rt4',
      reminderId: 'rem4',
      time: `${dueHour}:${dueMin}`,
      minimumTime: '00:00',
      maximumTime: '23:59',
      isCompleted: false,
      usageDurationInMinutes: 0,
    },
  },
  {
    id: 'r5',
    productId: 'p5',
    productNameEn: 'Hair Gummies',
    productNameAr: 'حلوى الشعر',
    descriptionEn: null,
    descriptionAr: null,
    productImageUrl: 'https://picsum.photos/seed/gummy/200',
    productDisplayImage: 'https://www.svgrepo.com/show/216426/flask-chemical.svg',
    productVideoUrl: '',
    tipsEn: [],
    tipsAr: [],
    timeToRemind: {
      id: 'rt5',
      reminderId: 'rem5',
      time: `${laterHour}:${laterMin}`,
      minimumTime: '00:00',
      maximumTime: '23:59',
      isCompleted: false,
      usageDurationInMinutes: 0,
    },
  },
  {
    id: 'r6',
    productId: 'p6',
    productNameEn: 'Morning Cleanser',
    productNameAr: 'غسول الصباح',
    descriptionEn: 'Gentle exfoliating cleanser',
    descriptionAr: 'غسول مقشر لطيف',
    productImageUrl: 'https://picsum.photos/seed/cleanse/200',
    productDisplayImage: 'https://www.svgrepo.com/show/216426/flask-chemical.svg',
    productVideoUrl: '',
    tipsEn: [],
    tipsAr: [],
    timeToRemind: {
      id: 'rt6',
      reminderId: 'rem6',
      time: '08:00',
      minimumTime: '00:00',
      maximumTime: '23:59',
      isCompleted: true,
      usageDurationInMinutes: 3,
    },
  },
]

const INITIAL_STATE: HomeState = {
  todayRoutine: MOCK_ROUTINES,
  weeklyStreaks: [],
  loading: false,
  error: null,
}

const homeSlice = createSlice({
  name: 'home',
  initialState: INITIAL_STATE,
  reducers: {
    setTodayRoutine: (state, action: PayloadAction<RoutineEntity[]>) => {
      state.todayRoutine = action.payload
    },
    setWeeklyStreaks: (state, action: PayloadAction<BaseStreakEntity[]>) => {
      state.weeklyStreaks = action.payload
    },
    markRoutineAsDone: (state, action: PayloadAction<string>) => {
      const routine = state.todayRoutine.find((r) => r.id === action.payload)
      if (routine) {
        routine.timeToRemind.isCompleted = true
      }
    },
  },
})

export const { setTodayRoutine, setWeeklyStreaks, markRoutineAsDone } = homeSlice.actions

export default homeSlice.reducer
