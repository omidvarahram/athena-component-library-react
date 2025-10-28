# Athena Theme System - Developer Guide

## Installation

```bash
npm install @athena/component-library-react
# or
yarn add @athena/component-library-react
```

## Quick Start

```tsx
import { ThemeProvider } from '@athena/component-library-react';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Basic Usage

### 1. Wrap Your App

```tsx
import { ThemeProvider } from '@athena/component-library-react';

function App() {
  return (
    <ThemeProvider theme="dark">
      <YourApp />
    </ThemeProvider>
  );
}
```

### 2. Use Theme in Components

```tsx
import { useTheme } from '@athena/component-library-react';

function MyComponent() {
  const { currentTheme, theme, colors, updateTheme, toggleTheme } = useTheme();
  
  return (
    <div style={{ backgroundColor: colors.bg, color: colors.text }}>
      <h1>Current theme: {currentTheme}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

## API Reference

### ThemeProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components to wrap |
| `themes` | `ThemeDefinition[]` | `[]` | Custom theme definitions |
| `theme` | `string` | `"light"` | Initial active theme |
| `onThemeChange` | `(name: string) => void` | - | Theme change callback |
| `ssr` | `boolean` | `false` | Enable SSR mode (uses cookies) |
| `persistence` | `PersistenceConfig` | `{ enabled: true }` | Persistence settings |

### ThemeDefinition

```typescript
interface ThemeDefinition {
  name: string;           // Unique identifier
  config: ThemeConfig;    // Theme configuration
  themeName?: string;     // Display name for UI
}
```

### PersistenceConfig

```typescript
interface PersistenceConfig {
  enabled?: boolean;      // Enable persistence (default: true)
  key?: string;          // Storage key (default: 'athena-theme')
  callbacks?: {
    persist?: (themeName: string) => void | Promise<void>;
    restore?: () => string | null | Promise<string | null>;
  };
}
```

### useTheme Hook

```typescript
interface ThemeContextValue {
  currentTheme: string;                // Current theme name
  themes: ThemeRegistry;              // All available themes
  theme: Required<ThemeConfig>;       // Current theme configuration
  colors: ColorConfig;                // Current colors
  updateTheme: (name: string) => void;
  updateConfig: (config: Partial<ThemeConfig>) => void;
  toggleTheme: () => void;
}
```

## Advanced Usage

### Custom Themes

```tsx
const customThemes = [
  {
    name: 'corporate',
    config: {
      colors: {
        primary: '#1e40af',
        secondary: '#059669',
        bg: '#ffffff',
        text: '#1f2937',
        // ... other colors
      }
    },
    themeName: 'Corporate Theme'
  }
];

<ThemeProvider 
  themes={customThemes}
  theme="corporate"
>
  <App />
</ThemeProvider>
```

### Dynamic Theme Configuration

```tsx
function ThemeCustomizer() {
  const { updateConfig, theme } = useTheme();
  
  const updateTypography = () => {
    updateConfig({
      typography: {
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif']
        },
        fontSize: {
          sm: '14px',
          md: '16px',
          lg: '18px'
        }
      }
    });
  };
  
  return (
    <button onClick={updateTypography}>
      Update Typography
    </button>
  );
}
```

### Custom Persistence

```tsx
<ThemeProvider 
  persistence={{
    callbacks: {
      persist: async (themeName) => {
        // Encrypt and save to backend
        const encrypted = await encrypt(themeName);
        await fetch('/api/theme', {
          method: 'POST',
          body: JSON.stringify({ theme: encrypted })
        });
      },
      restore: async () => {
        // Decrypt and load from backend
        const response = await fetch('/api/theme');
        const { theme: encrypted } = await response.json();
        return await decrypt(encrypted);
      }
    }
  }}
>
  <App />
</ThemeProvider>
```

### SSR Support

```tsx
// Next.js example
function App({ initialTheme }) {
  return (
    <ThemeProvider 
      ssr={true}
      theme={initialTheme}
    >
      <YourApp />
    </ThemeProvider>
  );
}

// In getServerSideProps
export async function getServerSideProps({ req }) {
  const theme = getThemeFromCookies(req);
  return { props: { initialTheme: theme } };
}
```

## CSS Variables

The theme system automatically applies CSS variables to the document root:

```css
/* Available CSS variables */
.my-component {
  background-color: var(--athena-color-bg);
  color: var(--athena-color-text);
  padding: var(--athena-spacing-4);
  border-radius: var(--athena-shape-border-radius-md);
  font-size: var(--athena-typography-font-size-sm);
  font-family: var(--athena-typography-font-family-sans);
}
```

### With Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--athena-color-primary-500)',
        secondary: 'var(--athena-color-secondary-500)',
        bg: 'var(--athena-color-bg)',
        text: 'var(--athena-color-text)',
      },
      spacing: {
        '4': 'var(--athena-spacing-4)',
        '8': 'var(--athena-spacing-8)',
      }
    }
  }
}
```

## Theme Configuration

### Color Configuration

```typescript
const colors = {
  // Core colors
  bg: '#ffffff',
  bgAlt: '#f8fafc',
  surface: '#ffffff',
  border: '#e2e8f0',
  text: '#1a202c',
  textSecondary: '#4a5568',
  
  // Semantic colors
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  primaryContrast: '#ffffff',
  
  // State colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Neutral colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    // ... more gray shades
  }
};
```

### Typography Configuration

```typescript
const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    serif: ['Georgia', 'serif'],
    mono: ['Fira Code', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  }
};
```

## Import Paths

The package supports multiple import paths for tree-shaking:

```typescript
// Main package
import { ThemeProvider, useTheme } from '@athena/component-library-react';

// Specific modules
import { ThemeProvider } from '@athena/component-library-react/providers/theme';
import { ThemeConfig } from '@athena/component-library-react/types';
import { cn } from '@athena/component-library-react/utils';
```

## Built-in Themes

The package automatically provides two built-in themes:

- **`light`** - Professional minimalist design
- **`dark`** - Executive noir design

## Best Practices

### 1. Theme Organization
- Use semantic naming for custom themes
- Keep themes focused on specific use cases
- Document theme purposes clearly

### 2. Performance
- Minimize theme changes during runtime
- Use CSS variables for efficient updates
- Memoize expensive theme-dependent calculations

### 3. Accessibility
- Ensure sufficient color contrast ratios
- Provide theme switching controls
- Test with screen readers

### 4. Testing
```typescript
import { render } from '@testing-library/react';
import { ThemeProvider } from '@athena/component-library-react';

const renderWithTheme = (component, theme = 'light') => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

test('component respects theme', () => {
  renderWithTheme(<MyComponent />, 'dark');
  expect(screen.getByTestId('component')).toHaveClass('dark-theme');
});
```

## Troubleshooting

### Common Issues

**Theme not applying**
- Ensure ThemeProvider wraps your app
- Check theme name exists in registry
- Verify CSS variables are defined

**Persistence not working**
- Check if persistence is enabled
- Verify storage permissions
- Test custom persistence callbacks

**SSR hydration mismatch**
- Use `ssr={true}` for server-side rendering
- Ensure initial theme matches server
- Check cookie handling

### Debug Mode

```tsx
<ThemeProvider 
  onThemeChange={(theme) => console.log('Theme changed to:', theme)}
>
  <App />
</ThemeProvider>
```

## Migration from v0.x

No breaking changes in v0.1.0 - this is the initial release.

## Support

For issues and feature requests, please visit the [GitHub repository](https://github.com/yourusername/athena-component-library-react).
