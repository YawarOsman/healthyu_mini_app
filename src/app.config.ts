export default defineAppConfig({
  pages: [
    // ── Tab pages MUST be first ──────────────────────────────────────────
    'pages/index/index',
    'pages/boxes/index',
    'pages/discover/index',
    'pages/me/index',
    // ── Non-tab pages ────────────────────────────────────────────────────
    'pages/register/gender_selection/index',
    'pages/onboarding/index',
    'pages/order/index',
    'pages/order_shipping/index',
    'pages/shipping/index',
    'pages/order_confirmed/index',
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
      { pagePath: 'pages/index/index', text: 'Home', iconPath: 'assets/svg/care.svg', selectedIconPath: 'assets/svg/care.svg' },
      { pagePath: 'pages/boxes/index', text: 'Boxes', iconPath: 'assets/svg/boxes.svg', selectedIconPath: 'assets/svg/boxes.svg' },
      { pagePath: 'pages/discover/index', text: 'Discover', iconPath: 'assets/svg/discover.svg', selectedIconPath: 'assets/svg/discover.svg' },
      { pagePath: 'pages/me/index', text: 'Me', iconPath: 'assets/svg/profile.svg', selectedIconPath: 'assets/svg/profile.svg' },
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
    allowsBounceVertical: "NO",
    enablePullDownRefresh: false,
    titlePenetrate: 'YES',
  },
})
