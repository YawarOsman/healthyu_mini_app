export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/register/name_dob/index',
    'pages/register/setup_account/index',
    'pages/register/otp_verification/index',
    'pages/onboarding/index',
    'pages/order/index',
    'pages/order_shipping/index',
    'pages/scan_box/index',
  ],
  permission: {
    'scope.scan': {
      desc: 'Used to scan your box QR code',
    },
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#000000',
    navigationBarTitleText: '',
    navigationBarTextStyle: 'white',
    navigationStyle: 'custom',
    backgroundColor: '#F44336',
    transparentTitle: 'always',
    titlePenetrate: 'YES',
  },
})
