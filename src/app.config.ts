export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/onboarding/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#000000',
    navigationBarTitleText: 'HealthyU',
    navigationBarTextStyle: 'white',
    navigationStyle: 'custom',
    backgroundColor: '#000000', // Default background color for pull-to-refresh/overscroll area
  },
})
