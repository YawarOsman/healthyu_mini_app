import { isArabicLocale } from '@/i18n/locale'

// ─── Order Feature — Data Models ───

export interface BoxGenre {
  id: number
  nameEn: string
  nameAr: string
  imageUrl: string | null
}

export interface BoxItemIngredient {
  id: number
  nameEn: string
  nameAr: string
}

export interface BoxItem {
  id: number
  nameEn: string
  nameAr: string
  displayImage: string
  ingredients: BoxItemIngredient[]
}

export interface BoxEntity {
  id: number
  nameEn: string
  nameAr: string
  headlineEn: string
  headlineAr: string
  image: string
  isCurrent: boolean
  genres: BoxGenre[]
  videoUrl: string | null
  videoThumbnail: string | null
  items: BoxItem[]
  // Dev-mode timeframe simulation flags (mirrors Flutter's RoutineTimeframeEnum)
  isOverdue?: boolean
  isLater?: boolean
  isCompleted?: boolean
  timeLabel?: string
  productDisplayImage?: string
}

type LocalizedNamedEntity = {
  nameEn: string
  nameAr: string
}

export function getLocalizedName<T extends LocalizedNamedEntity>(entity: T, locale: string): string {
  return isArabicLocale(locale) ? entity.nameAr : entity.nameEn
}

export function getLocalizedHeadline(box: BoxEntity, locale: string): string {
  return isArabicLocale(locale) ? box.headlineAr : box.headlineEn
}
