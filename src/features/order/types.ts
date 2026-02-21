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
