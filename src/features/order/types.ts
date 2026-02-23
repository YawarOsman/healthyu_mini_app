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

// ─── Current-box helper ───

/** Returns the first box marked as current, or null. */
export function getCurrentBox(boxes: BoxEntity[]): BoxEntity | null {
  return boxes.find((b) => b.isCurrent) ?? null
}

/**
 * A BoxItem enriched with the scheduling flags of its parent box,
 * so the home screen can categorise items the same way it previously
 * categorised boxes.
 */
export interface BoxItemWithMeta extends BoxItem {
  isOverdue?: boolean
  isCurrent?: boolean
  isLater?: boolean
  isCompleted?: boolean
  timeLabel?: string
  /** Alias for displayImage so existing card props keep working */
  productDisplayImage?: string
}

/**
 * Flattens all boxes into a list of their items, each carrying the
 * scheduling metadata of its parent box.
 */
export function getItemsFromBoxes(boxes: BoxEntity[]): BoxItemWithMeta[] {
  return boxes.reduce<BoxItemWithMeta[]>((acc, box) => {
    const mapped = box.items.map((item) => ({
      ...item,
      isOverdue: box.isOverdue,
      isCurrent: box.isCurrent,
      isLater: box.isLater,
      isCompleted: box.isCompleted,
      timeLabel: box.timeLabel,
      productDisplayImage: item.displayImage,
    }))
    return acc.concat(mapped)
  }, [])
}
