import { ImageAssets } from '@/assets/images'

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

export interface DiscoverPageResponse {
  featuredVideo: FeaturedVideoData
  selfCareItems: DiscoverCardData[]
}

export const fetchDiscoverData = async (): Promise<DiscoverPageResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    featuredVideo: {
      id: 'volvo_1',
      thumbnailUrl:
        'https://t3.ftcdn.net/jpg/19/09/34/50/240_F_1909345096_Q2fwLPSpjOgCidGapNYxFl8biZzCyZah.jpg',
    },
    selfCareItems: [
      {
        id: 'skincare_101',
        imageUrl: ImageAssets.discover1,
        title: 'Skincare 101: Tips on getting perfection',
      },
      {
        id: 'magnesium_skin',
        imageUrl: ImageAssets.discover2,
        title: 'Why Magensium is useful for your skin.',
      },
    ],
  }
}
