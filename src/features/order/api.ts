import type { ApiResponse } from '@/core/types'

import { BoxEntity } from './types'

// ─── Mock Data ───
// Replace this with a real API call when the backend is ready.

const MOCK_BOX: BoxEntity = {
  id: 1,
  nameEn: 'Flavie Box 1',
  nameAr: 'صندوق فلافي 1',
  headlineEn: 'Radiance – Start your glow.',
  headlineAr: 'إشراقة – ابدئي توهجك.',
  image: '',
  isCurrent: true,
  genres: [
    {
      id: 1,
      nameEn: 'Outer Beauty',
      nameAr: 'الجمال الخارجي',
      imageUrl: null,
    },
    {
      id: 2,
      nameEn: 'Hydration',
      nameAr: 'ترطيب',
      imageUrl: null,
    },
  ],
  videoUrl: null,
  videoThumbnail: null,
  items: [
    {
      id: 1,
      nameEn: 'Eyelash Growth Drops',
      nameAr: 'قطرات نمو الرموش',
      displayImage: '',
      ingredients: [
        { id: 1, nameEn: 'Biotin', nameAr: 'بيوتين' },
        { id: 2, nameEn: 'Castor', nameAr: 'خروع' },
      ],
    },
    {
      id: 2,
      nameEn: 'Skin Glow Cream',
      nameAr: 'كريم توهج البشرة',
      displayImage: '',
      ingredients: [
        { id: 3, nameEn: 'Vitamin C', nameAr: 'فيتامين سي' },
        { id: 4, nameEn: 'Peptides', nameAr: 'ببتيدات' },
      ],
    },
    {
      id: 3,
      nameEn: 'Under Eye Cream',
      nameAr: 'كريم تحت العين',
      displayImage: '',
      ingredients: [
        { id: 5, nameEn: 'Retinol', nameAr: 'ريتينول' },
        { id: 6, nameEn: 'Caffeine', nameAr: 'كافيين' },
      ],
    },
    {
      id: 4,
      nameEn: 'Heel Repair Cream',
      nameAr: 'كريم إصلاح الكعب',
      displayImage: '',
      ingredients: [
        { id: 7, nameEn: 'Shea Butter', nameAr: 'زبدة الشيا' },
      ],
    },
    {
      id: 5,
      nameEn: 'Nail Serum',
      nameAr: 'سيروم الأظافر',
      displayImage: '',
      ingredients: [
        { id: 8, nameEn: 'Vitamin B7', nameAr: 'فيتامين ب7' },
        { id: 9, nameEn: 'Keratin', nameAr: 'كيراتين' },
      ],
    },
    {
      id: 6,
      nameEn: 'Magnesium',
      nameAr: 'مغنيسيوم',
      displayImage: '',
      ingredients: [
        { id: 10, nameEn: 'Capsules - 200mg', nameAr: 'كبسولات - 200 ملغ' },
      ],
    },
  ],
}

/**
 * Fetch box data from the server.
 * Currently returns mock data — swap with a real HTTP call when ready.
 *
 * Example real implementation:
 * ```ts
 * const res = await Taro.request({ url: `${BASE_URL}/api/boxes/current` })
 * return { success: true, data: res.data, error: null }
 * ```
 */
export async function fetchBoxData(): Promise<ApiResponse<BoxEntity>> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600))

  return {
    success: true,
    data: MOCK_BOX,
    error: null,
  }
}

// ─── Cities ───
const MOCK_CITIES = [
  'Baghdad',
  'Erbil',
  'Sulaymaniyah',
  'Basra',
  'Duhok',
  'Kirkuk',
  'Najaf',
  'Karbala',
]

/**
 * Fetch available cities.
 * Currently returns mock data — swap with a real HTTP call when ready.
 *
 * Example real implementation:
 * ```ts
 * const res = await Taro.request({ url: `${BASE_URL}/api/cities` })
 * return { success: true, data: res.data, error: null }
 * ```
 */
export async function fetchCitiesData(): Promise<ApiResponse<string[]>> {
  await new Promise(resolve => setTimeout(resolve, 300))

  return {
    success: true,
    data: MOCK_CITIES,
    error: null,
  }
}
