// Re-export all theme-related types from their respective files
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './breakpoints';
export * from './shadows';
export * from './shape';
export * from './transitions';

// Main theme configuration
import { ColorConfig } from './colors';
import { TypographyConfig, TypographyVariants } from './typography';
import { SpacingConfig } from './spacing';
import { BreakpointConfig, ContainerConfig } from './breakpoints';
import { ShadowConfig, ZIndexConfig } from './shadows';
import { ShapeConfig } from './shape';
import { TransitionConfig, AnimationConfig } from './transitions';

/**
 * Theme configuration interface for customizing the component library appearance
 * All properties are optional - defaults will be provided by the ThemeProvider
 * Colors are theme-specific, all other tokens are shared between themes
 */
export interface ThemeConfig {
  /** Color configuration (optional, theme-specific) */
  colors?: ColorConfig;
  
  /** Typography configuration (optional, shared) */
  typography?: TypographyConfig & {
    /** Typography variants for different text elements */
    variants?: TypographyVariants;
  };
  
  /** Spacing configuration (optional, shared) */
  spacing?: SpacingConfig;
  
  /** Breakpoint configuration (optional, shared) */
  breakpoints?: BreakpointConfig;
  
  /** Container configuration (optional, shared) */
  container?: ContainerConfig;
  
  /** Shadow configuration (optional, shared) */
  shadows?: ShadowConfig;
  
  /** Z-index configuration (optional, shared) */
  zIndex?: ZIndexConfig;
  
  /** Shape configuration (optional, shared) */
  shape?: ShapeConfig;
  
  /** Transition configuration (optional, shared) */
  transitions?: TransitionConfig;
  
  /** Animation configuration (optional, shared) */
  animations?: AnimationConfig;
  
  /** Component-specific configurations (optional, shared) */
  components?: {
    /** Button component configuration */
    button?: {
      variants: Record<string, any>;
      sizes: Record<string, any>;
    };
    /** Input component configuration */
    input?: {
      variants: Record<string, any>;
      sizes: Record<string, any>;
    };
    /** Card component configuration */
    card?: {
      variants: Record<string, any>;
      sizes: Record<string, any>;
    };
    /** Modal component configuration */
    modal?: {
      variants: Record<string, any>;
      sizes: Record<string, any>;
    };
  };
}

/**
 * Theme definition with optional display name
 */
export interface ThemeDefinition {
  /** Unique theme identifier */
  name: string;
  /** Theme configuration */
  config: ThemeConfig;
  /** Optional display name for UI */
  themeName?: string;
}

/**
 * Theme registry mapping theme names to configurations
 */
export interface ThemeRegistry {
  [themeName: string]: ThemeDefinition;
}

/**
 * Persistence callbacks for custom storage logic
 */
export interface PersistenceCallbacks {
  /** Custom function to persist theme (can be async) */
  persist?: (themeName: string) => void | Promise<void>;
  /** Custom function to restore theme (can be async) */
  restore?: () => string | null | Promise<string | null>;
}

/**
 * Theme context value interface
 */
export interface ThemeContextValue {
  /** Current theme name */
  currentTheme: string;
  /** All available themes in registry */
  themes: ThemeRegistry;
  /** Current theme configuration (includes shared tokens, always provided with defaults) */
  theme: Required<ThemeConfig>;
  /** Current color configuration (theme-specific, always provided with defaults) */
  colors: ColorConfig;
  /** Function to switch to a specific theme */
  updateTheme: (name: string) => void;
  /** Function to update current theme configuration (merges with existing) */
  updateConfig: (config: Partial<ThemeConfig>) => void;
  /** Function to toggle between light and dark themes */
  toggleTheme: () => void;
}
