export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/register/name_dob/index',
    'pages/register/setup_account/index',
    'pages/register/otp_verification/index',
    'pages/onboarding/index',
    'pages/order/index',
    'pages/order_shipping/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#000000',
    navigationBarTitleText: 'Flavie',
    navigationBarTextStyle: 'white',
    navigationStyle: 'custom',
    backgroundColor: '#F44336',
    transparentTitle: 'always',
    titlePenetrate: 'YES',
  },
})
