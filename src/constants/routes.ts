declare const process: {
  env: {
    TARO_ENV?: string
  }
}

const MINI_ROUTE_PREFIX = '/'

const MINI_ROUTES = {
  HOME: `${MINI_ROUTE_PREFIX}pages/index/index`,
  ONBOARDING: `${MINI_ROUTE_PREFIX}pages/onboarding/index`,
  REGISTER_NAME_DOB: `${MINI_ROUTE_PREFIX}pages/register/name_dob/index`,
  REGISTER_SETUP_ACCOUNT: `${MINI_ROUTE_PREFIX}pages/register/setup_account/index`,
  REGISTER_OTP_VERIFICATION: `${MINI_ROUTE_PREFIX}pages/register/otp_verification/index`,
  CAMERA: `${MINI_ROUTE_PREFIX}pages/camera/index`,
  ORDER: `${MINI_ROUTE_PREFIX}pages/order/index`,
  ORDER_SHIPPING: `${MINI_ROUTE_PREFIX}pages/order_shipping/index`,
  SCAN_BOX: `${MINI_ROUTE_PREFIX}pages/scan_box/index`,
} as const

const H5_ROUTES = {
  ...MINI_ROUTES,
  HOME: '/',
  ONBOARDING: '/onboarding',
  REGISTER_NAME_DOB: '/register/name',
  REGISTER_SETUP_ACCOUNT: '/register/setup',
  REGISTER_OTP_VERIFICATION: '/register/verify',
  ORDER: '/order',
  ORDER_SHIPPING: '/shipping',
  SCAN_BOX: '/scan',
} as const

const isH5 = process.env.TARO_ENV === 'h5'

export const ROUTES = (isH5 ? H5_ROUTES : MINI_ROUTES) as typeof MINI_ROUTES
