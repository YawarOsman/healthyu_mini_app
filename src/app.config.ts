export default defineAppConfig({
  pages: [
    // ── Tab pages MUST be first ──────────────────────────────────────────
    'pages/index/index',
    'pages/boxes/index',
    'pages/discover/index',
    'pages/me/index',
    // ── Non-tab pages ────────────────────────────────────────────────────
    'pages/register/name_dob/index',
    'pages/register/setup_account/index',
    'pages/register/otp_verification/index',
    'pages/onboarding/index',
    'pages/order/index',
    'pages/order_shipping/index',
    'pages/scan_box/index',
  ],
  tabBar: {
    color: '#ffffff',
    selectedColor: '#ffffff',
    backgroundColor: '#000000',
    borderStyle: 'black',
    list: [
      // Keep labels non-empty so config is valid across Alipay versions.
      // Alipay runtime requires PNG paths here.
      { pagePath: 'pages/index/index', text: 'Home', iconPath: 'assets/png/care.png', selectedIconPath: 'assets/png/care.png' },
      { pagePath: 'pages/boxes/index', text: 'Boxes', iconPath: 'assets/png/boxes.png', selectedIconPath: 'assets/png/boxes.png' },
      { pagePath: 'pages/discover/index', text: 'Discover', iconPath: 'assets/png/discover.png', selectedIconPath: 'assets/png/discover.png' },
      { pagePath: 'pages/me/index', text: 'Me', iconPath: 'assets/png/profile.png', selectedIconPath: 'assets/png/profile.png' },
    ],
  },
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
    backgroundColor: '#000000',
    transparentTitle: 'always',
    titlePenetrate: 'YES',
  },
})
