import { BoxEntity } from '../types/box'

export const FETCH_BOX_REQUEST = 'FETCH_BOX_REQUEST'
export const FETCH_BOX_SUCCESS = 'FETCH_BOX_SUCCESS'
export const FETCH_BOX_FAILURE = 'FETCH_BOX_FAILURE'

export const fetchBoxRequest = () => {
  return {
    type: FETCH_BOX_REQUEST,
  }
}

export const fetchBoxSuccess = (box: BoxEntity) => {
  return {
    type: FETCH_BOX_SUCCESS,
    payload: box,
  }
}

export const fetchBoxFailure = (error: string) => {
  return {
    type: FETCH_BOX_FAILURE,
    payload: error,
  }
}

// Mock API call
export const fetchBox = (boxId: string) => {
  return (dispatch: any) => {
    dispatch(fetchBoxRequest())

    // Simulate API delay
    setTimeout(() => {
        // Mock data
        const mockBox: BoxEntity = {
            id: boxId,
            nameEn: 'Radiance - Start your glow.',
            nameAr: 'إشراق - ابدأي توهجك.',
            descriptionEn: 'A curated box for outer beauty and hydration.',
            descriptionAr: 'صندوق مختار للجمال الخارجي والترطيب.',
            boxIndex: 1,
            image: 'https://placehold.co/600x400/png', // Replace with real URL or asset if possible, currently using placeholder
            price: 50.0,
            isCurrent: true,
            isOpened: false,
            items: [],
            genres: [
                { id: '1', nameEn: 'Outer Beauty', nameAr: 'جمال خارجي' },
                { id: '2', nameEn: 'Hydration', nameAr: 'ترطيب' }
            ],
            numberOfItems: 5
        }
        dispatch(fetchBoxSuccess(mockBox))
    }, 1500)
  }
}
