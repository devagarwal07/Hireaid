/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./app/**/*.{js,ts,jsx,tsx}",       // next.js app router
    "./pages/**/*.{js,ts,jsx,tsx}",     // next.js pages router
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Font Family - Poppins as primary
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      // Colors matching design system
      colors: {
        // Primary colors (blue)
        primary: {
          DEFAULT: '#0857A1',
          hover: '#176CBA',
          light: '#E8F4FD',
          dark: '#064785',
        },
        // Secondary colors (navy) - for action buttons
        secondary: {
          DEFAULT: '#1e3a5f',
          hover: '#162d4d',
          light: '#EBF2FF',
        },
        // Success colors (green)
        success: {
          DEFAULT: '#22C55E',
          hover: '#16a34a',
          light: '#DCFCE7',
          text: '#166534',
          bg: '#D1FAE5',
        },
        // Warning colors
        warning: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          light: '#FEF3C7',
          text: '#92400E',
        },
        // Error/danger colors
        error: {
          DEFAULT: '#EF4444',
          hover: '#DC2626',
          light: '#FEE2E2',
          text: '#DC2626',
          bg: '#FFEAE6',
        },
        // Info colors
        info: {
          DEFAULT: '#0369A1',
          light: '#E0F2FE',
        },
        // Page background - STANDARD
        'page-bg': '#F0F4FF',
        // Card/panel backgrounds
        'card-bg': '#FFFFFF',
        'hover-bg': '#f0f7ff',
        'muted-bg': '#F9FAFB',
        'input-bg': '#FAFAFA',
        // Text colors
        'text-primary': '#181D27',
        'text-secondary': '#626262',
        'text-muted': '#717171',
        'text-label': '#344054',
        // Border colors
        'border-light': '#E5E5E5',
        'border-default': '#D1D5DB',
        'border-card': '#E5E7EB',
        'border-input': '#D5D7DA',
        // Status badge backgrounds
        'badge-blue': '#EBF2FF',
        'badge-green': '#D1FAE5',
        'badge-red': '#FFEAE6',
        'badge-yellow': '#FEF3C7',
        // Gray/neutral colors (for secondary buttons, backgrounds)
        neutral: {
          DEFAULT: '#EFEFEF',
          hover: '#E5E5E5',
          active: '#DEDEDE',
          dark: '#CCCCCC',
        },
        // Placeholder/disabled text
        'text-placeholder': '#9CA3AF',
        'text-disabled': '#CCCCCC',
      },
      // Spacing (matches CSS variables)
      spacing: {
        '4.5': '1.125rem',  // 18px
        '5.5': '1.375rem',  // 22px
        '18': '4.5rem',     // 72px
      },
      // Border radius
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      // Box shadows
      boxShadow: {
        'card': '0 2px 11px rgba(0, 0, 0, 0.08)',
        'sidebar': '0px 4px 7.2px rgba(0, 0, 0, 0.12)',
        'hover': '0 4px 20px rgba(0, 0, 0, 0.1)',
      },
      // Transitions - smooth animations
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      // Font sizes matching design system
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
      },
    },
  },
  plugins: [],
}

