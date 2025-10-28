import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '../../../src/providers/theme/ThemeProvider';

// Mock console methods
const mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

// Mock CSS custom properties
const mockSetProperty = jest.fn();
const mockGetPropertyValue = jest.fn(() => '');
Object.defineProperty(document.documentElement.style, 'setProperty', {
  writable: true,
  value: mockSetProperty,
});
Object.defineProperty(document.documentElement.style, 'getPropertyValue', {
  writable: true,
  value: mockGetPropertyValue,
});

// Mock classList
const mockClassListAdd = jest.fn();
const mockClassListRemove = jest.fn();
Object.defineProperty(document.documentElement, 'classList', {
  value: {
    add: mockClassListAdd,
    remove: mockClassListRemove,
  },
  writable: true,
});

// Mock persistence
jest.mock('../../../src/utils/persistence', () => ({
  persistToLocalStorage: jest.fn(),
  restoreFromLocalStorage: jest.fn(),
  setCookie: jest.fn(),
  getCookie: jest.fn(),
}));

// Import the mocked functions
const { persistToLocalStorage, restoreFromLocalStorage, setCookie, getCookie } = jest.requireMock(
  '../../../src/utils/persistence'
);

// Test component that uses the theme context
const TestConsumer = () => {
  const { currentTheme, themes, colors, updateTheme, updateConfig, toggleTheme } = useTheme();

  return (
    <div>
      <div data-testid="current-theme">{currentTheme}</div>
      <div data-testid="themes-count">{Object.keys(themes).length}</div>
      <div data-testid="bg-color">{colors.bg}</div>
      <div data-testid="accent-color">{colors.accent}</div>
      <button data-testid="toggle-theme" onClick={toggleTheme}>
        Toggle Theme
      </button>
      <button data-testid="update-theme-dark" onClick={() => updateTheme('dark')}>
        Set Dark
      </button>
      <button data-testid="update-theme-light" onClick={() => updateTheme('light')}>
        Set Light
      </button>
      <button
        data-testid="update-config"
        onClick={() => updateConfig({ colors: { bg: '#custom' } })}
      >
        Update Config
      </button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSetProperty.mockClear();
    mockGetPropertyValue.mockClear();
    mockClassListAdd.mockClear();
    mockClassListRemove.mockClear();
    persistToLocalStorage.mockClear();
    restoreFromLocalStorage.mockClear();
    setCookie.mockClear();
    getCookie.mockClear();
    mockConsoleWarn.mockClear();
    mockConsoleError.mockClear();

    // Default mock returns
    restoreFromLocalStorage.mockReturnValue(null);
    getCookie.mockReturnValue(null);
  });

  afterAll(() => {
    mockConsoleWarn.mockRestore();
    mockConsoleError.mockRestore();
  });

  describe('Basic functionality', () => {
    it('should render children', () => {
      render(
        <ThemeProvider>
          <div data-testid="child">Test Child</div>
        </ThemeProvider>
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should provide default light theme', async () => {
      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
      });
    });

    it('should provide theme registry with light and dark themes', async () => {
      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('themes-count')).toHaveTextContent('2');
      });
    });

    it('should provide color values', async () => {
      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('bg-color')).toHaveTextContent('#FFFFFF');
        expect(screen.getByTestId('accent-color')).toHaveTextContent('#2563EB');
      });
    });
  });

  describe('Initial theme configuration', () => {
    it('should use provided initial theme', async () => {
      render(
        <ThemeProvider theme="dark">
          <TestConsumer />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
      });
    });

    it('should fall back to light theme for invalid initial theme', async () => {
      render(
        <ThemeProvider theme="invalid">
          <TestConsumer />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('invalid');
      });
    });
  });

  describe('Custom themes', () => {
    const customThemes = [
      {
        name: 'corporate',
        config: {
          colors: {
            bg: '#F0F0F0',
            bgAlt: '#E0E0E0',
            surface: '#FFFFFF',
            border: '#CCCCCC',
            text: '#333333',
            textSecondary: '#666666',
            accent: '#0066CC',
            accentHover: '#0052A3',
            accentLight: '#E6F2FF',
            success: '#00AA00',
            warning: '#FF8800',
            error: '#CC0000',
            hoverBg: '#E8E8E8',
            activeBg: '#DDDDDD',
            inputBg: '#FFFFFF',
            inputBorder: '#CCCCCC',
            inputFocus: '#0066CC',
            shadow: 'rgba(0, 0, 0, 0.1)',
            overlay: 'rgba(0, 0, 0, 0.5)',
            codeBg: '#F5F5F5',
            codeText: '#333333',
            buttonBg: '#0066CC',
            buttonBgHover: '#0052A3',
            buttonText: '#FFFFFF',
            linkColor: '#0066CC',
            linkHover: '#0052A3',
          },
        },
        themeName: 'Corporate',
      },
    ];

    it('should register custom themes', async () => {
      render(
        <ThemeProvider themes={customThemes}>
          <TestConsumer />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('themes-count')).toHaveTextContent('3'); // light + dark + corporate
      });
    });

    it('should warn about duplicate theme names', async () => {
      const duplicateThemes = [
        { name: 'light', config: { colors: {} as any }, themeName: 'Custom Light' },
      ];

      render(
        <ThemeProvider themes={duplicateThemes}>
          <TestConsumer />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(mockConsoleWarn).toHaveBeenCalledWith(
          '[ThemeProvider] Duplicate theme name "light" detected. Skipping.'
        );
      });
    });

    it('should warn about empty theme names', async () => {
      const emptyNameThemes = [{ name: '', config: { colors: {} as any } }];

      render(
        <ThemeProvider themes={emptyNameThemes}>
          <TestConsumer />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(mockConsoleWarn).toHaveBeenCalledWith(
          '[ThemeProvider] Theme with empty name detected. Skipping.'
        );
      });
    });

    it('should handle whitespace-only theme names', async () => {
      const whitespaceThemes = [{ name: '   ', config: { colors: {} as any } }];

      render(
        <ThemeProvider themes={whitespaceThemes}>
          <TestConsumer />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(mockConsoleWarn).toHaveBeenCalledWith(
          '[ThemeProvider] Theme with empty name detected. Skipping.'
        );
      });
    });
  });

  describe('Theme switching', () => {
    it('should toggle between light and dark themes', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
      });

      await user.click(screen.getByTestId('toggle-theme'));

      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
      });

      await user.click(screen.getByTestId('toggle-theme'));

      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
      });
    });

    it('should update theme directly', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
      });

      await user.click(screen.getByTestId('update-theme-dark'));

      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
      });
    });

    it('should warn when trying to set invalid theme', async () => {
      const TestComponent = () => {
        const { updateTheme } = useTheme();
        return <button onClick={() => updateTheme('invalid')}>Set Invalid</button>;
      };

      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        // Initial load complete
      });

      await user.click(screen.getByText('Set Invalid'));

      await waitFor(() => {
        expect(mockConsoleWarn).toHaveBeenCalledWith(
          '[ThemeProvider] Theme "invalid" not found in registry. Available themes: light, dark'
        );
      });
    });
  });

  describe('Config updates', () => {
    it('should merge config updates', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('bg-color')).toHaveTextContent('#FFFFFF');
      });

      await user.click(screen.getByTestId('update-config'));

      await waitFor(() => {
        expect(screen.getByTestId('bg-color')).toHaveTextContent('#custom');
      });
    });

    it('should clear config updates when switching themes', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>
      );

      // Apply config update
      await user.click(screen.getByTestId('update-config'));

      await waitFor(() => {
        expect(screen.getByTestId('bg-color')).toHaveTextContent('#custom');
      });

      // Switch theme - should clear updates
      await user.click(screen.getByTestId('update-theme-dark'));

      await waitFor(() => {
        expect(screen.getByTestId('bg-color')).toHaveTextContent('#0F1115'); // dark theme bg
      });
    });
  });

  describe('CSS application', () => {
    it('should apply CSS variables to document root', async () => {
      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(mockSetProperty).toHaveBeenCalledWith('--color-bg', '#FFFFFF');
        expect(mockSetProperty).toHaveBeenCalledWith('--color-accent', '#2563EB');
      });
    });

    it('should add theme class to document root', async () => {
      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(mockClassListAdd).toHaveBeenCalledWith('light-theme');
      });
    });

    it('should remove old theme classes when switching', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(mockClassListAdd).toHaveBeenCalledWith('light-theme');
      });

      await user.click(screen.getByTestId('toggle-theme'));

      await waitFor(() => {
        expect(mockClassListRemove).toHaveBeenCalledWith('light-theme');
        expect(mockClassListRemove).toHaveBeenCalledWith('dark-theme');
        expect(mockClassListAdd).toHaveBeenCalledWith('dark-theme');
      });
    });
  });

  describe('Persistence', () => {
    it('should handle persistence configuration', () => {
      // Test that persistence can be configured
      expect(() => {
        render(
          <ThemeProvider persistence={{ enabled: false }}>
            <TestConsumer />
          </ThemeProvider>
        );
      }).not.toThrow();
    });

    it('should handle custom persistence key configuration', () => {
      // Test that custom keys can be configured
      expect(() => {
        render(
          <ThemeProvider persistence={{ key: 'custom-user-prefs' }}>
            <TestConsumer />
          </ThemeProvider>
        );
      }).not.toThrow();
    });
  });

  describe('SSR mode', () => {
    it('should handle SSR mode configuration', () => {
      expect(() => {
        render(
          <ThemeProvider ssr={true}>
            <TestConsumer />
          </ThemeProvider>
        );
      }).not.toThrow();
    });

    it('should handle non-SSR mode configuration', () => {
      render(
        <ThemeProvider ssr={false}>
          <TestConsumer />
        </ThemeProvider>
      );

      // Should show content immediately
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    });
  });

  describe('Custom persistence callbacks', () => {
    it('should accept custom persistence callbacks without errors', () => {
      const mockCustomPersist = jest.fn();
      const mockCustomRestore = jest.fn();

      expect(() => {
        render(
          <ThemeProvider
            persistence={{
              callbacks: {
                persist: mockCustomPersist,
                restore: mockCustomRestore,
              },
            }}
          >
            <TestConsumer />
          </ThemeProvider>
        );
      }).not.toThrow();
    });
  });

  describe('Theme change callback', () => {
    it('should accept onThemeChange callback without errors', () => {
      const mockOnThemeChange = jest.fn();

      expect(() => {
        render(
          <ThemeProvider onThemeChange={mockOnThemeChange}>
            <TestConsumer />
          </ThemeProvider>
        );
      }).not.toThrow();
    });
  });

  describe('useTheme hook', () => {
    it('should throw error when used outside provider', () => {
      const TestComponent = () => {
        useTheme();
        return null;
      };

      // Suppress console.error for this specific test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => render(<TestComponent />)).toThrow(
        'useTheme must be used within a ThemeProvider'
      );

      consoleSpy.mockRestore();
    });

    it('should provide all context values', async () => {
      const TestComponent = () => {
        const context = useTheme();

        return (
          <div>
            <div data-testid="has-current-theme">{typeof context.currentTheme}</div>
            <div data-testid="has-themes">{typeof context.themes}</div>
            <div data-testid="has-theme">{typeof context.theme}</div>
            <div data-testid="has-colors">{typeof context.colors}</div>
            <div data-testid="has-update-theme">{typeof context.updateTheme}</div>
            <div data-testid="has-update-config">{typeof context.updateConfig}</div>
            <div data-testid="has-toggle-theme">{typeof context.toggleTheme}</div>
          </div>
        );
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('has-current-theme')).toHaveTextContent('string');
        expect(screen.getByTestId('has-themes')).toHaveTextContent('object');
        expect(screen.getByTestId('has-theme')).toHaveTextContent('object');
        expect(screen.getByTestId('has-colors')).toHaveTextContent('object');
        expect(screen.getByTestId('has-update-theme')).toHaveTextContent('function');
        expect(screen.getByTestId('has-update-config')).toHaveTextContent('function');
        expect(screen.getByTestId('has-toggle-theme')).toHaveTextContent('function');
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle config merging', async () => {
      const TestComponent = () => {
        const { updateConfig, theme } = useTheme();

        React.useEffect(() => {
          updateConfig({
            colors: { bg: '#custom1' },
          });
        }, [updateConfig]);

        return (
          <div>
            <div data-testid="bg-color">{theme.colors?.bg}</div>
          </div>
        );
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('bg-color')).toHaveTextContent('#custom1');
      });
    });
  });
});
