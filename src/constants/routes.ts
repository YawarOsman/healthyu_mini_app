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
  BOXES: `${MINI_ROUTE_PREFIX}pages/boxes/index`,
  ANSWERS: `${MINI_ROUTE_PREFIX}pages/answers/index`,
  ME: `${MINI_ROUTE_PREFIX}pages/me/index`,
  BOX_REGISTRATION: `${MINI_ROUTE_PREFIX}pages/scan_box/index`,
} as const

export const ROUTES = MINI_ROUTES
