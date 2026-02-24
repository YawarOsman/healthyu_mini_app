import { isArabicLocale } from '@/i18n/locale'

export type RoutineTimeframeEnum = 'overdue' | 'due' | 'laterToday' | 'completed'

export interface RoutineTimeEntity {
  id: string
  /** Format: "HH:mm" (24-hour) */
  time: string
  minimumTime: string
  maximumTime: string
  isCompleted: boolean
  usageDurationInMinutes: number
  reminderId: string
}

export interface RoutineEntity {
  id: string
  productImageUrl: string
  productDisplayImage: string
  productVideoUrl: string
  productNameEn: string
  productNameAr: string
  descriptionEn: string | null
  descriptionAr: string | null
  tipsEn: string[]
  tipsAr: string[]
  productId: string
  timeToRemind: RoutineTimeEntity
}

export interface BaseStreakEntity {
  date: string
  dayOfWeek: string
  progress: number
}

// ─── Helpers ───

type LocalizedNamedEntity = {
  productNameEn: string
  productNameAr: string
}

export function getLocalizedProductName<T extends LocalizedNamedEntity>(entity: T, locale: string): string {
  return isArabicLocale(locale) ? entity.productNameAr : entity.productNameEn
}

type LocalizedDescriptionEntity = {
  descriptionEn: string | null
  descriptionAr: string | null
}

export function getLocalizedDescription<T extends LocalizedDescriptionEntity>(entity: T, locale: string): string {
  return (isArabicLocale(locale) ? entity.descriptionAr : entity.descriptionEn) ?? ''
}

export function getRoutineTimeframe(
  timeToRemind: RoutineTimeEntity,
  now: Date
): RoutineTimeframeEnum {
  if (timeToRemind.isCompleted) {
    return 'completed'
  }

  const [hours, minutes] = timeToRemind.time.split(':').map(Number)
  const routineDateTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  )

  const diffInMinutes = (routineDateTime.getTime() - now.getTime()) / (1000 * 60)

  if (diffInMinutes < -30) {
    return 'overdue'
  }

  if (diffInMinutes <= 30) {
    return 'due'
  }

  return 'laterToday'
}
