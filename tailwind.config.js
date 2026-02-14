/** @type {import('tailwindcss').Config} */
module.exports = {
  // Required for Taro
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  safelist: [
    'font-headline-lg',
    'font-body-lg',
    'font-btn',
    'font-juana', // Legacy/Direct check
    'font-lato',  // Legacy/Direct check
  ],
  // Disable preflight to avoid conflicts with Taro's default styles
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        // Map to CSS variables defined in src/styles/theme.scss
        scaffold: 'var(--scaffold-bg, #000000)',
        primary: 'var(--primary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-brand': 'var(--text-brand)',
        'text-accent': 'var(--text-accent)',
        'text-inverse': 'var(--text-inverse)',
        'text-placeholder': 'var(--text-placeholder)',
        'surface-primary': 'var(--surface-primary)',
        'surface-secondary': 'var(--surface-secondary)',
        'surface-accent': 'var(--surface-accent)',
        'surface-brand': 'var(--surface-brand)',
        'surface-inverse': 'var(--surface-inverse)',
        'border-primary': 'var(--border-primary)',
        'border-secondary': 'var(--border-secondary)',
        'border-brand': 'var(--border-brand)',
        'button-bg': 'var(--button-bg)',
        'button-text': 'var(--button-text)',
        'button-outlined-border': 'var(--button-outlined-border)',
        error: 'var(--error)',
        'icon-primary': 'var(--icon-primary)',
        'icon-secondary': 'var(--icon-secondary)',
        'icon-accent': 'var(--icon-accent)',
        'icon-brand': 'var(--icon-brand)',
        'icon-inverse': 'var(--icon-inverse)',
      },
      spacing: {
        'page': 'var(--spacing-page)',
        'xl': 'var(--spacing-xl)',
      },
      height: {
        'btn': 'var(--btn-height)',
        'btn-sm': 'var(--btn-height-sm)',
      },
      borderRadius: {
        'none': 'var(--radius-none)',
        'sm': 'var(--radius-sm)',
        'xl': 'var(--radius-xl)',
        'btn': 'var(--radius-btn)',
        'card': 'var(--radius-card)',
      },
      fontSize: {
        // Base Mappings
        'headline-lg': 'var(--text-headline-lg)',
        'headline-md': 'var(--text-headline-md)',
        'headline-sm': 'var(--text-headline-sm)',
        'display-sm': 'var(--text-display-sm)',
        'title-lg': 'var(--text-title-lg)',
        'title-md': 'var(--text-title-md)',
        'title-sm': 'var(--text-title-sm)',
        'body-lg': 'var(--text-body-lg)',
        'body-md': 'var(--text-body-md)',
        'body-sm': 'var(--text-body-sm)',
        'label-lg': 'var(--text-label-lg)',
        'label-md': 'var(--text-label-md)',
        'label-sm': 'var(--text-label-sm)',
        
        // Component Specific
        'btn': 'var(--text-btn)',
        'btn-text': 'var(--text-btn-text)',
        'appbar': 'var(--text-appbar)',
        'tab': 'var(--text-tab)',
        'input-hint': 'var(--text-input-hint)',
        'input-error': 'var(--text-input-error)',
        'bottom-nav': 'var(--text-bottom-nav)',
        'dialog-title': 'var(--text-dialog-title)',
        
        // Legacy numerics (keeping for compatibility if needed, but mapped to nearest or strict px)
        '12': '12px',
        '13': '13px',
        '14': '14px',
        '15': '15px',
        '16': '16px',
        '18': '18px',
        '19': '19px',
        '20': '20px',
        '24': '24px',
        '32': '32px',
      },
      borderWidth: {
        'thin': '0.5px',
        'thinner': '0.4px',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        juana: ['Juana', 'serif'],
        lato: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
