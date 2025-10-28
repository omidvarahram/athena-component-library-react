import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo, useCallback, useRef } from 'react';
import { ThemeContextValue, ThemeConfig, ColorConfig, ThemeDefinition, ThemeRegistry, PersistenceCallbacks } from '../../types/theme';
import { lightColors, darkColors, colorsToCSSVariables } from '../../utils/themes';
import { persistToLocalStorage, restoreFromLocalStorage, setCookie, getCookie } from '../../utils/persistence';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  /** Child components to be wrapped by the theme provider */
  children: ReactNode;
  /** Array of custom themes (light/dark added automatically) */
  themes?: Array<{
    name: string;
    config: ThemeConfig;
    themeName?: string;
  }>;
  /** Active theme name - defaults to "light" */
  theme?: string;
  /** Callback when theme changes */
  onThemeChange?: (themeName: string) => void;
  /** SSR mode - enforces cookie-based persistence */
  ssr?: boolean;
  /** Persistence configuration */
  persistence?: {
    /** Enable persistence (default: true) */
    enabled?: boolean;
    /** Storage key (default: 'userPreferences') */
    key?: string;
    /** Custom persistence callbacks (overrides default storage) */
    callbacks?: PersistenceCallbacks;
  };
}

/**
 * Build theme registry with light/dark defaults and custom themes
 */
function buildThemeRegistry(customThemes?: Array<{ name: string; config: ThemeConfig; themeName?: string }>): ThemeRegistry {
  const registry: ThemeRegistry = {
    light: {
      name: 'light',
      config: { colors: lightColors },
      themeName: 'Light',
    },
    dark: {
      name: 'dark',
      config: { colors: darkColors },
      themeName: 'Dark',
    },
  };

  // Validate and add custom themes
  if (customThemes) {
    const names = new Set<string>(['light', 'dark']);
    
    for (const customTheme of customThemes) {
      if (names.has(customTheme.name)) {
        console.warn(`[ThemeProvider] Duplicate theme name "${customTheme.name}" detected. Skipping.`);
        continue;
      }
      
      if (!customTheme.name || customTheme.name.trim() === '') {
        console.warn('[ThemeProvider] Theme with empty name detected. Skipping.');
        continue;
      }
      
      names.add(customTheme.name);
      registry[customTheme.name] = {
        name: customTheme.name,
        config: customTheme.config,
        themeName: customTheme.themeName || customTheme.name,
      };
    }
  }

  return registry;
}

/**
 * ThemeProvider component that provides theme context to all child components
 * 
 * @example
 * ```tsx
 * // Basic usage with default light theme
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * 
 * // With custom themes
 * <ThemeProvider 
 *   themes={[
 *     { name: 'corporate', config: { colors: corporateColors }, themeName: 'Corporate' }
 *   ]}
 * >
 *   <App />
 * </ThemeProvider>
 * 
 * // With SSR (enforces cookies)
 * <ThemeProvider 
 *   ssr={true}
 *   theme="dark"
 * >
 *   <App />
 * </ThemeProvider>
 * 
 * // With custom persistence
 * <ThemeProvider 
 *   persistence={{
 *     callbacks: {
 *       persist: async (name) => await saveToBackend(name),
 *       restore: async () => await loadFromBackend()
 *     }
 *   }}
 * >
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  themes: customThemes,
  theme: initialTheme,
  onThemeChange,
  ssr = false,
  persistence = { enabled: true, key: 'userPreferences' },
}: ThemeProviderProps) {
  // Build theme registry once
  const themeRegistry = useMemo(() => buildThemeRegistry(customThemes), [customThemes]);
  
  // Track if this is first mount
  const isFirstMount = useRef(true);
  
  // Determine default theme
  const getDefaultTheme = useCallback((): string => {
    return initialTheme || 'light';
  }, [initialTheme]);

  const [currentTheme, setCurrentTheme] = useState<string>(getDefaultTheme());
  const [themeUpdates, setThemeUpdates] = useState<Partial<ThemeConfig>>({});
  const [isHydrated, setIsHydrated] = useState(!ssr);

  // Persistence helpers
  const persistTheme = useCallback(async (themeName: string) => {
    if (!persistence.enabled) return;

    if (persistence.callbacks?.persist) {
      try {
        await persistence.callbacks.persist(themeName);
      } catch (error) {
        console.error('[ThemeProvider] Custom persist callback failed:', error);
      }
    } else {
      const key = persistence.key || 'userPreferences';
      // Default to cookies for better cross-browser persistence
      setCookie(key, themeName);
    }
  }, [persistence]);

  const restoreTheme = useCallback(async (): Promise<string | null> => {
    if (!persistence.enabled) return null;

    if (persistence.callbacks?.restore) {
      try {
        const result = await persistence.callbacks.restore();
        return result;
      } catch (error) {
        console.error('[ThemeProvider] Custom restore callback failed:', error);
        return null;
      }
    } else {
      const key = persistence.key || 'userPreferences';
      // Default to cookies for better cross-browser persistence
      return getCookie(key);
    }
  }, [persistence]);

  // Restore theme on mount
  useEffect(() => {
    if (!isFirstMount.current) return;
    isFirstMount.current = false;

    const restoreThemeFromStorage = async () => {
      const savedTheme = await restoreTheme();
      if (savedTheme && themeRegistry[savedTheme]) {
        setCurrentTheme(savedTheme);
      }
      setIsHydrated(true);
    };

    restoreThemeFromStorage();
  }, [restoreTheme, themeRegistry]);

  // Persist theme when it changes
  useEffect(() => {
    if (!isHydrated) return;
    persistTheme(currentTheme);
    onThemeChange?.(currentTheme);
  }, [currentTheme, persistTheme, onThemeChange, isHydrated]);

  // Get current theme definition
  const currentThemeDefinition = useMemo(() => {
    return themeRegistry[currentTheme] || themeRegistry.light;
  }, [currentTheme, themeRegistry]);

  // Get current colors
  const currentColors = useMemo(() => {
    const mergedConfig = { ...currentThemeDefinition.config, ...themeUpdates };
    return mergedConfig.colors || lightColors;
  }, [currentThemeDefinition, themeUpdates]);

  // Build complete theme configuration
  const theme = useMemo((): Required<ThemeConfig> => {
    return {
      ...currentThemeDefinition.config,
      ...themeUpdates,
      colors: currentColors,
    } as Required<ThemeConfig>;
  }, [currentThemeDefinition, themeUpdates, currentColors]);

  // Apply CSS variables
  useEffect(() => {
    if (typeof document === 'undefined' || !isHydrated) return;

    const root = document.documentElement;
    
    // Remove existing theme classes
    Object.keys(themeRegistry).forEach(name => {
      root.classList.remove(`${name}-theme`);
    });
    
    // Add current theme class
    root.classList.add(`${currentTheme}-theme`);
    
    // Apply CSS variables for colors
    const cssVariables = colorsToCSSVariables(currentColors);
    Object.entries(cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, [currentTheme, currentColors, themeRegistry, isHydrated]);

  // Update theme function
  const updateTheme = useCallback((name: string) => {
    if (!themeRegistry[name]) {
      console.warn(`[ThemeProvider] Theme "${name}" not found in registry. Available themes: ${Object.keys(themeRegistry).join(', ')}`);
      return;
    }
    setCurrentTheme(name);
    // Clear any config updates when switching themes
    setThemeUpdates({});
  }, [themeRegistry]);

  // Update config function (merges with existing)
  const updateConfig = useCallback((config: Partial<ThemeConfig>) => {
    setThemeUpdates(prev => {
      // Deep merge for nested objects
      const merged = { ...prev };
      Object.keys(config).forEach(key => {
        const typedKey = key as keyof ThemeConfig;
        if (typeof config[typedKey] === 'object' && config[typedKey] !== null && !Array.isArray(config[typedKey])) {
          merged[typedKey] = { ...merged[typedKey], ...config[typedKey] } as any;
        } else {
          merged[typedKey] = config[typedKey] as any;
        }
      });
      return merged;
    });
  }, []);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
  }, [currentTheme, updateTheme]);

  const value: ThemeContextValue = {
    currentTheme,
    themes: themeRegistry,
    theme,
    colors: currentColors,
    updateTheme,
    updateConfig,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { 
 *     currentTheme, 
 *     themes, 
 *     theme, 
 *     colors,
 *     updateTheme,
 *     updateConfig,
 *     toggleTheme
 *   } = useTheme();
 *   
 *   return (
 *     <div>
 *       <p>Current theme: {currentTheme}</p>
 *       <button onClick={() => updateTheme('dark')}>Dark</button>
 *       <button onClick={() => updateConfig({ typography: {...} })}>
 *         Update Typography
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
