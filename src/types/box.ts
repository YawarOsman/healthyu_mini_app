export interface BoxItemEntity {
  id: string
  nameEn: string
  nameAr: string
  descriptionEn?: string
  descriptionAr?: string
  image: string
}

export interface BoxGenresEntity {
  id: string
  nameEn: string
  nameAr: string
}

export interface BoxEntity {
  id: string
  nameEn: string
  nameAr: string
  descriptionEn?: string
  descriptionAr?: string
  boxIndex: number
  image: string
  videoUrl?: string
  price: number
  isCurrent: boolean
  isOpened: boolean
  items: BoxItemEntity[]
  genres: BoxGenresEntity[]
  numberOfItems: number
}
