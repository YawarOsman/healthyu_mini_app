export interface DiscoverCardData {
  id: string
  imageUrl: string
  title: string
}

export interface FeaturedVideoData {
  id: string
  thumbnailUrl: string
  videoUrl?: string
}

export interface DiscoverState {
  featuredVideo: FeaturedVideoData | null
  selfCareItems: DiscoverCardData[]
  loading: boolean
  error: string | null
}
