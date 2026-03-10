const MINI_ROUTE_PREFIX = '/'
const toMiniRoute = (path: string) => `${MINI_ROUTE_PREFIX}${path.replace(/^\//, '')}`

const MINI_ROUTES = {
  HOME: toMiniRoute('pages/index/index'),
  ONBOARDING: toMiniRoute('pages/onboarding/index'),
  REGISTER_GENDER_SELECTION: toMiniRoute('pages/register/gender_selection/index'),
  REGISTER_NAME_DOB: toMiniRoute('pages/register/name_dob/index'),
  REGISTER_SETUP_ACCOUNT: toMiniRoute('pages/register/setup_account/index'),
  REGISTER_OTP_VERIFICATION: toMiniRoute('pages/register/otp_verification/index'),
  ORDER: toMiniRoute('pages/order/index'),
  ORDER_SHIPPING: toMiniRoute('pages/order_shipping/index'),
  SCAN_BOX: toMiniRoute('pages/scan_box/index'),
  BOXES: toMiniRoute('pages/boxes/index'),
  DISCOVER: toMiniRoute('pages/discover/index'),
  ME: toMiniRoute('pages/me/index'),
} as const

export const ROUTES = MINI_ROUTES
