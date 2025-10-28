/**
 * Breakpoint configuration interface
 */
export interface BreakpointConfig {
  /** Breakpoint values */
  values: {
    xs: number;   // 0px
    sm: number;   // 640px
    md: number;   // 768px
    lg: number;   // 1024px
    xl: number;   // 1280px
    '2xl': number; // 1536px
    '3xl': number; // 1920px
  };
  
  /** Breakpoint keys */
  keys: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'>;
  
  /** Media query functions */
  up: (key: keyof BreakpointConfig['values']) => string;
  down: (key: keyof BreakpointConfig['values']) => string;
  between: (start: keyof BreakpointConfig['values'], end: keyof BreakpointConfig['values']) => string;
  only: (key: keyof BreakpointConfig['values']) => string;
}

/**
 * Container configuration for responsive layouts
 */
export interface ContainerConfig {
  /** Container max widths */
  maxWidth: {
    xs: string;   // 100%
    sm: string;   // 640px
    md: string;   // 768px
    lg: string;   // 1024px
    xl: string;   // 1280px
    '2xl': string; // 1536px
    '3xl': string; // 1920px
  };
  
  /** Container padding */
  padding: {
    xs: string;   // 16px
    sm: string;   // 24px
    md: string;   // 32px
    lg: string;   // 40px
    xl: string;   // 48px
    '2xl': string; // 56px
    '3xl': string; // 64px
  };
}
