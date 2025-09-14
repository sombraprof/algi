
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '.theme-dark'],
  content: [
    "./index.html",
    "./aulas/**/*.html",
    "./js/**/*.js",
    "./politica_uso/politica-uso.html",
    "./views/**/*.vue",
    "./components/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        // Material Design 3 Color Tokens
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3', // Primary
          600: '#1e88e5',
          700: '#1976d2',
          800: '#1565c0',
          900: '#0d47a1',
        },
        secondary: {
          50: '#fce4ec',
          100: '#f8bbd9',
          200: '#f48fb1',
          300: '#f06292',
          400: '#ec407a',
          500: '#e91e63', // Secondary
          600: '#d81b60',
          700: '#c2185b',
          800: '#ad1457',
          900: '#880e4f',
        },
        tertiary: {
          50: '#f3e5f5',
          100: '#e1bee7',
          200: '#ce93d8',
          300: '#ba68c8',
          400: '#ab47bc',
          500: '#9c27b0', // Tertiary
          600: '#8e24aa',
          700: '#7b1fa2',
          800: '#6a1b9a',
          900: '#4a148c',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        'neutral-variant': {
          50: '#f5f5f5',
          100: '#e0e0e0',
          200: '#c2c2c2',
          300: '#a3a3a3',
          400: '#858585',
          500: '#676767',
          600: '#4e4e4e',
          700: '#3a3a3a',
          800: '#2a2a2a',
          900: '#1c1c1c',
        },
        error: {
          50: '#ffebee',
          100: '#ffcdd2',
          200: '#ef9a9a',
          300: '#e57373',
          400: '#ef5350',
          500: '#f44336',
          600: '#e53935',
          700: '#d32f2f',
          800: '#c62828',
          900: '#b71c1c',
        },
        success: {
          50: '#e8f5e8',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4caf50',
          600: '#43a047',
          700: '#388e3c',
          800: '#2e7d32',
          900: '#1b5e20',
        },
        warning: {
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#ffc107',
          600: '#ffb300',
          700: '#ffa000',
          800: '#ff8f00',
          900: '#ff6f00',
        },
        info: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3',
          600: '#1e88e5',
          700: '#1976d2',
          800: '#1565c0',
          900: '#0d47a1',
        },
        // Surface colors for light and dark themes
        surface: {
          light: {
            50: '#ffffff',
            100: '#fafafa',
            200: '#f5f5f5',
            300: '#f0f0f0',
            400: '#e0e0e0',
            500: '#cccccc',
          },
          dark: {
            50: '#2a2a2a',
            100: '#1e1e1e',
            200: '#121212',
            300: '#0a0a0a',
            400: '#030303',
            500: '#000000',
          }
        }
      },
      // Material Design 3 Typography Scale
      fontSize: {
        'display-large': ['3.5rem', { lineHeight: '4rem', fontWeight: '400' }],
        'display-medium': ['2.8125rem', { lineHeight: '3.25rem', fontWeight: '400' }],
        'display-small': ['2.25rem', { lineHeight: '2.75rem', fontWeight: '400' }],
        'headline-large': ['2rem', { lineHeight: '2.5rem', fontWeight: '400' }],
        'headline-medium': ['1.75rem', { lineHeight: '2.25rem', fontWeight: '400' }],
        'headline-small': ['1.5rem', { lineHeight: '2rem', fontWeight: '400' }],
        'title-large': ['1.375rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        'title-medium': ['1rem', { lineHeight: '1.5rem', fontWeight: '500' }],
        'title-small': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
        'body-large': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'body-medium': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'body-small': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
        'label-large': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
        'label-medium': ['0.75rem', { lineHeight: '1rem', fontWeight: '500' }],
        'label-small': ['0.6875rem', { lineHeight: '0.875rem', fontWeight: '500' }],
      },
      // Material Design 3 Spacing Scale
      spacing: {
        '0.5': '0.125rem', // 2px
        '1.5': '0.375rem', // 6px
        '2.5': '0.625rem', // 10px
        '3.5': '0.875rem', // 14px
        '4.5': '1.125rem', // 18px
      },
      // Material Design 3 Border Radius
      borderRadius: {
        '4xl': '1.5rem', // 24px
        '5xl': '2rem',   // 32px
      },
      // Material Design 3 Elevation (shadows)
      boxShadow: {
        'elevation-1': '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
        'elevation-2': '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
        'elevation-3': '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
        'elevation-4': '0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
        'elevation-5': '0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
