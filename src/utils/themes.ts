import { ColorConfig } from '../types/theme';

/**
 * Default light color configuration (Professional Minimalist)
 */
export const lightColors: ColorConfig = {
  // Core colors
  bg: '#FFFFFF',
  bgAlt: '#F6F7F9',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  text: '#111827',
  textSecondary: '#4B5563',

  // Accent colors (Elegant Blue)
  accent: '#2563EB',
  accentHover: '#1E40AF',
  accentLight: '#E0E7FF',

  // Semantic colors
  success: '#15803D',
  warning: '#D97706',
  error: '#B91C1C',

  // Interactive states
  hoverBg: '#F3F4F6',
  activeBg: '#E5E7EB',
  inputBg: '#FFFFFF',
  inputBorder: '#D1D5DB',
  inputFocus: '#2563EB',

  // Shadows & overlays
  shadow: 'rgba(0, 0, 0, 0.05)',
  overlay: 'rgba(0, 0, 0, 0.4)',

  // Typography
  codeBg: '#F3F4F6',
  codeText: '#1F2937',

  // Buttons
  buttonBg: '#2563EB',
  buttonBgHover: '#1E40AF',
  buttonText: '#FFFFFF',

  // Links
  linkColor: '#2563EB',
  linkHover: '#1E40AF',
};

/**
 * Default dark color configuration (Executive Noir)
 */
export const darkColors: ColorConfig = {
  // Core colors
  bg: '#0F1115',
  bgAlt: '#16181D',
  surface: '#1C1E24',
  border: '#2A2D33',
  text: '#F3F4F6',
  textSecondary: '#9CA3AF',

  // Accent colors (Elegant Blue)
  accent: '#3B82F6',
  accentHover: '#60A5FA',
  accentLight: '#1E3A8A',

  // Semantic colors
  success: '#22C55E',
  warning: '#EAB308',
  error: '#EF4444',

  // Interactive states
  hoverBg: '#1E1F25',
  activeBg: '#2A2D33',
  inputBg: '#111317',
  inputBorder: '#3F3F46',
  inputFocus: '#3B82F6',

  // Shadows & overlays
  shadow: 'rgba(0, 0, 0, 0.3)',
  overlay: 'rgba(255, 255, 255, 0.05)',

  // Typography
  codeBg: '#1E1F25',
  codeText: '#E5E7EB',

  // Buttons
  buttonBg: '#3B82F6',
  buttonBgHover: '#60A5FA',
  buttonText: '#FFFFFF',

  // Links
  linkColor: '#3B82F6',
  linkHover: '#60A5FA',
};

/**
 * Converts color configuration to CSS custom properties
 */
export function colorsToCSSVariables(colors: ColorConfig): Record<string, string> {
  return {
    '--color-bg': colors.bg,
    '--color-bg-alt': colors.bgAlt,
    '--color-surface': colors.surface,
    '--color-border': colors.border,
    '--color-text': colors.text,
    '--color-text-secondary': colors.textSecondary,
    '--color-accent': colors.accent,
    '--color-accent-hover': colors.accentHover,
    '--color-accent-light': colors.accentLight,
    '--color-success': colors.success,
    '--color-warning': colors.warning,
    '--color-error': colors.error,
    '--color-hover-bg': colors.hoverBg,
    '--color-active-bg': colors.activeBg,
    '--color-input-bg': colors.inputBg,
    '--color-input-border': colors.inputBorder,
    '--color-input-focus': colors.inputFocus,
    '--color-shadow': colors.shadow,
    '--color-overlay': colors.overlay,
    '--color-code-bg': colors.codeBg,
    '--color-code-text': colors.codeText,
    '--button-bg': colors.buttonBg,
    '--button-bg-hover': colors.buttonBgHover,
    '--button-text': colors.buttonText,
    '--link-color': colors.linkColor,
    '--link-hover': colors.linkHover,
  };
}
