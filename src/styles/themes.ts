// Theme definitions extracted from Flutter's colors.dart + theme files

export type ThemeMode = 'flavie-dark' | 'flavie-light' | 'mann-dark' | 'mann-light'

export interface AppTheme {
  // Scaffold / page background
  scaffoldBg: string
  // Primary brand color
  primary: string
  // Text
  textPrimary: string
  textSecondary: string
  textBrand: string
  textAccent: string
  textInverse: string
  textPlaceholder: string
  // Surface
  surfacePrimary: string
  surfaceSecondary: string
  surfaceAccent: string
  surfaceBrand: string
  surfaceInverse: string
  // Border
  borderPrimary: string
  borderSecondary: string
  borderBrand: string
  // Button
  buttonBg: string
  buttonText: string
  buttonOutlinedBorder: string
  // Error
  error: string
  // Icon
  iconPrimary: string
  iconSecondary: string
  iconAccent: string
  iconBrand: string
  iconInverse: string
}

// ── Shared Grey Scale ──
export const grey = {
  50: '#FAFAFA',
  100: '#F5F5F5',
  200: '#E5E5E5',
  300: '#D4D4D4',
  400: '#A3A3A3',
  500: '#A3A3A3',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
  950: '#0A0A0A',
}

// ── Flavie Color Palettes ──
const flavieShades = {
  50: '#FAEAE3',
  100: '#F8DCCE',
  200: '#F4CCB9',
  300: '#F1BEA3',
  400: '#EEAE8C',
  500: '#EB9E74',
  600: '#E88D5B',
  700: '#DD814D',
  800: '#CD7848',
  900: '#BE6E41',
  950: '#AF653B',
}

const roleQuartz = {
  50: '#FBF8F9',
  100: '#F7ECF0',
  200: '#F0DAE3',
  300: '#E6BBCA',
  400: '#D591A8',
  500: '#C56F89',
  600: '#A64C63',
  700: '#964054',
  800: '#7D3746',
  900: '#69323E',
  950: '#3F1821',
}

// ── Mann Color Palettes ──
const blackPearl = {
  50: '#F7F7F6',
  100: '#E5E4E2',
  200: '#CAC9C5',
  300: '#A8A6A0',
  400: '#85847C',
  500: '#6A6962',
  600: '#54534D',
  700: '#454540',
  800: '#393936',
  900: '#32322F',
  950: '#0C0C0B',
}

// ── Theme Definitions ──

export const flavieDark: AppTheme = {
  scaffoldBg: '#000000',
  primary: flavieShades[500],
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.56)',
  textBrand: flavieShades[500],
  textAccent: 'rgba(255, 255, 255, 0.56)',
  textInverse: 'rgba(255, 255, 255, 0.4)',
  textPlaceholder: grey[300],
  surfacePrimary: roleQuartz[50],
  surfaceSecondary: grey[50],
  surfaceAccent: grey[100],
  surfaceBrand: flavieShades[500],
  surfaceInverse: '#141414',
  borderPrimary: roleQuartz[200],
  borderSecondary: grey[300],
  borderBrand: flavieShades[500],
  buttonBg: flavieShades[500],
  buttonText: '#000000',
  buttonOutlinedBorder: grey[300],
  error: '#E25C5C',
  iconPrimary: grey[950],
  iconSecondary: 'rgba(255, 255, 255, 0.24)',
  iconAccent: '#8F8F8F',
  iconBrand: flavieShades[500],
  iconInverse: '#FFFFFF',
}

export const flavieLight: AppTheme = {
  scaffoldBg: '#000000',
  primary: flavieShades[500],
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.56)',
  textBrand: flavieShades[500],
  textAccent: 'rgba(255, 255, 255, 0.56)',
  textInverse: 'rgba(255, 255, 255, 0.4)',
  textPlaceholder: grey[300],
  surfacePrimary: roleQuartz[50],
  surfaceSecondary: grey[50],
  surfaceAccent: grey[100],
  surfaceBrand: flavieShades[500],
  surfaceInverse: '#141414',
  borderPrimary: roleQuartz[200],
  borderSecondary: grey[300],
  borderBrand: flavieShades[500],
  buttonBg: flavieShades[500],
  buttonText: '#000000',
  buttonOutlinedBorder: grey[300],
  error: '#E25C5C',
  iconPrimary: grey[950],
  iconSecondary: 'rgba(255, 255, 255, 0.24)',
  iconAccent: '#8F8F8F',
  iconBrand: flavieShades[500],
  iconInverse: '#FFFFFF',
}

export const mannDark: AppTheme = {
  scaffoldBg: '#000000',
  primary: '#FFFFFF',
  textPrimary: '#FFFFFF',
  textSecondary: grey[500],
  textBrand: '#FFFFFF',
  textAccent: 'rgba(255, 255, 255, 0.56)',
  textInverse: 'rgba(255, 255, 255, 0.4)',
  textPlaceholder: grey[400],
  surfacePrimary: blackPearl[50],
  surfaceSecondary: grey[50],
  surfaceAccent: blackPearl[100],
  surfaceBrand: '#FFFFFF',
  surfaceInverse: '#141414',
  borderPrimary: blackPearl[200],
  borderSecondary: grey[300],
  borderBrand: '#FFFFFF',
  buttonBg: '#FFFFFF',
  buttonText: '#000000',
  buttonOutlinedBorder: grey[300],
  error: '#E25C5C',
  iconPrimary: grey[950],
  iconSecondary: grey[600],
  iconAccent: '#8F8F8F',
  iconBrand: '#FFFFFF',
  iconInverse: '#FFFFFF',
}

export const mannLight: AppTheme = {
  scaffoldBg: '#000000',
  primary: '#FFFFFF',
  textPrimary: '#FFFFFF',
  textSecondary: grey[500],
  textBrand: '#FFFFFF',
  textAccent: 'rgba(255, 255, 255, 0.56)',
  textInverse: 'rgba(255, 255, 255, 0.4)',
  textPlaceholder: grey[400],
  surfacePrimary: blackPearl[50],
  surfaceSecondary: grey[50],
  surfaceAccent: blackPearl[100],
  surfaceBrand: '#FFFFFF',
  surfaceInverse: '#141414',
  borderPrimary: blackPearl[200],
  borderSecondary: grey[300],
  borderBrand: '#FFFFFF',
  buttonBg: '#FFFFFF',
  buttonText: '#000000',
  buttonOutlinedBorder: grey[300],
  error: '#E25C5C',
  iconPrimary: grey[950],
  iconSecondary: grey[600],
  iconAccent: '#8F8F8F',
  iconBrand: '#FFFFFF',
  iconInverse: '#FFFFFF',
}

export const themes: Record<ThemeMode, AppTheme> = {
  'flavie-dark': flavieDark,
  'flavie-light': flavieLight,
  'mann-dark': mannDark,
  'mann-light': mannLight,
}
