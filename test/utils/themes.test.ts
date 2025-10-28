import { lightColors, darkColors, colorsToCSSVariables } from '../../src/utils/themes';

describe('Theme Colors', () => {
  describe('lightColors', () => {
    it('should be defined', () => {
      expect(lightColors).toBeDefined();
      expect(typeof lightColors).toBe('object');
    });

    it('should have all required color properties', () => {
      // Core colors
      expect(lightColors.bg).toBeDefined();
      expect(lightColors.bgAlt).toBeDefined();
      expect(lightColors.surface).toBeDefined();
      expect(lightColors.border).toBeDefined();
      expect(lightColors.text).toBeDefined();
      expect(lightColors.textSecondary).toBeDefined();

      // Accent colors
      expect(lightColors.accent).toBeDefined();
      expect(lightColors.accentHover).toBeDefined();
      expect(lightColors.accentLight).toBeDefined();

      // Semantic colors
      expect(lightColors.success).toBeDefined();
      expect(lightColors.warning).toBeDefined();
      expect(lightColors.error).toBeDefined();

      // Interactive states
      expect(lightColors.hoverBg).toBeDefined();
      expect(lightColors.activeBg).toBeDefined();
      expect(lightColors.inputBg).toBeDefined();
      expect(lightColors.inputBorder).toBeDefined();
      expect(lightColors.inputFocus).toBeDefined();

      // Shadows & overlays
      expect(lightColors.shadow).toBeDefined();
      expect(lightColors.overlay).toBeDefined();

      // Typography
      expect(lightColors.codeBg).toBeDefined();
      expect(lightColors.codeText).toBeDefined();

      // Buttons
      expect(lightColors.buttonBg).toBeDefined();
      expect(lightColors.buttonBgHover).toBeDefined();
      expect(lightColors.buttonText).toBeDefined();

      // Links
      expect(lightColors.linkColor).toBeDefined();
      expect(lightColors.linkHover).toBeDefined();
    });

    it('should have proper color values', () => {
      // Check specific expected values
      expect(lightColors.bg).toBe('#FFFFFF');
      expect(lightColors.bgAlt).toBe('#F6F7F9');
      expect(lightColors.text).toBe('#111827');
      expect(lightColors.accent).toBe('#2563EB');
      expect(lightColors.success).toBe('#15803D');
      expect(lightColors.warning).toBe('#D97706');
      expect(lightColors.error).toBe('#B91C1C');
    });

    it('should have all colors as strings', () => {
      Object.values(lightColors).forEach(color => {
        expect(typeof color).toBe('string');
        expect(color.length).toBeGreaterThan(0);
      });
    });
  });

  describe('darkColors', () => {
    it('should be defined', () => {
      expect(darkColors).toBeDefined();
      expect(typeof darkColors).toBe('object');
    });

    it('should have all required color properties', () => {
      // Core colors
      expect(darkColors.bg).toBeDefined();
      expect(darkColors.bgAlt).toBeDefined();
      expect(darkColors.surface).toBeDefined();
      expect(darkColors.border).toBeDefined();
      expect(darkColors.text).toBeDefined();
      expect(darkColors.textSecondary).toBeDefined();

      // Accent colors
      expect(darkColors.accent).toBeDefined();
      expect(darkColors.accentHover).toBeDefined();
      expect(darkColors.accentLight).toBeDefined();

      // Semantic colors
      expect(darkColors.success).toBeDefined();
      expect(darkColors.warning).toBeDefined();
      expect(darkColors.error).toBeDefined();

      // Interactive states
      expect(darkColors.hoverBg).toBeDefined();
      expect(darkColors.activeBg).toBeDefined();
      expect(darkColors.inputBg).toBeDefined();
      expect(darkColors.inputBorder).toBeDefined();
      expect(darkColors.inputFocus).toBeDefined();

      // Shadows & overlays
      expect(darkColors.shadow).toBeDefined();
      expect(darkColors.overlay).toBeDefined();

      // Typography
      expect(darkColors.codeBg).toBeDefined();
      expect(darkColors.codeText).toBeDefined();

      // Buttons
      expect(darkColors.buttonBg).toBeDefined();
      expect(darkColors.buttonBgHover).toBeDefined();
      expect(darkColors.buttonText).toBeDefined();

      // Links
      expect(darkColors.linkColor).toBeDefined();
      expect(darkColors.linkHover).toBeDefined();
    });

    it('should have proper color values', () => {
      // Check specific expected values
      expect(darkColors.bg).toBe('#0F1115');
      expect(darkColors.bgAlt).toBe('#16181D');
      expect(darkColors.text).toBe('#F3F4F6');
      expect(darkColors.accent).toBe('#3B82F6');
      expect(darkColors.success).toBe('#22C55E');
      expect(darkColors.warning).toBe('#EAB308');
      expect(darkColors.error).toBe('#EF4444');
    });

    it('should have all colors as strings', () => {
      Object.values(darkColors).forEach(color => {
        expect(typeof color).toBe('string');
        expect(color.length).toBeGreaterThan(0);
      });
    });
  });

  describe('colorsToCSSVariables', () => {
    it('should convert color config to CSS variables', () => {
      const result = colorsToCSSVariables(lightColors);

      // Check that it returns an object
      expect(typeof result).toBe('object');
      expect(result).not.toBeNull();

      // Check specific CSS variable mappings
      expect(result['--color-bg']).toBe(lightColors.bg);
      expect(result['--color-bg-alt']).toBe(lightColors.bgAlt);
      expect(result['--color-surface']).toBe(lightColors.surface);
      expect(result['--color-border']).toBe(lightColors.border);
      expect(result['--color-text']).toBe(lightColors.text);
      expect(result['--color-text-secondary']).toBe(lightColors.textSecondary);
      expect(result['--color-accent']).toBe(lightColors.accent);
      expect(result['--color-accent-hover']).toBe(lightColors.accentHover);
      expect(result['--color-accent-light']).toBe(lightColors.accentLight);
      expect(result['--color-success']).toBe(lightColors.success);
      expect(result['--color-warning']).toBe(lightColors.warning);
      expect(result['--color-error']).toBe(lightColors.error);
      expect(result['--color-hover-bg']).toBe(lightColors.hoverBg);
      expect(result['--color-active-bg']).toBe(lightColors.activeBg);
      expect(result['--color-input-bg']).toBe(lightColors.inputBg);
      expect(result['--color-input-border']).toBe(lightColors.inputBorder);
      expect(result['--color-input-focus']).toBe(lightColors.inputFocus);
      expect(result['--color-shadow']).toBe(lightColors.shadow);
      expect(result['--color-overlay']).toBe(lightColors.overlay);
      expect(result['--color-code-bg']).toBe(lightColors.codeBg);
      expect(result['--color-code-text']).toBe(lightColors.codeText);
      expect(result['--button-bg']).toBe(lightColors.buttonBg);
      expect(result['--button-bg-hover']).toBe(lightColors.buttonBgHover);
      expect(result['--button-text']).toBe(lightColors.buttonText);
      expect(result['--link-color']).toBe(lightColors.linkColor);
      expect(result['--link-hover']).toBe(lightColors.linkHover);
    });

    it('should handle dark colors', () => {
      const result = colorsToCSSVariables(darkColors);

      expect(result['--color-bg']).toBe(darkColors.bg);
      expect(result['--color-text']).toBe(darkColors.text);
      expect(result['--color-accent']).toBe(darkColors.accent);
    });

    it('should handle partial color config', () => {
      const partialColors = {
        bg: '#FFFFFF',
        text: '#000000',
        accent: '#0000FF',
      } as any;

      const result = colorsToCSSVariables(partialColors);

      expect(result['--color-bg']).toBe('#FFFFFF');
      expect(result['--color-text']).toBe('#000000');
      expect(result['--color-accent']).toBe('#0000FF');
      // Undefined values should be passed through
      expect(result['--color-success']).toBeUndefined();
    });

    it('should handle empty color config', () => {
      const emptyColors = {} as any;
      const result = colorsToCSSVariables(emptyColors);

      // Should return object with undefined values
      expect(typeof result).toBe('object');
      expect(result['--color-bg']).toBeUndefined();
      expect(result['--color-text']).toBeUndefined();
    });

    it('should maintain all expected CSS variable keys', () => {
      const result = colorsToCSSVariables(lightColors);
      
      const expectedKeys = [
        '--color-bg',
        '--color-bg-alt',
        '--color-surface',
        '--color-border',
        '--color-text',
        '--color-text-secondary',
        '--color-accent',
        '--color-accent-hover',
        '--color-accent-light',
        '--color-success',
        '--color-warning',
        '--color-error',
        '--color-hover-bg',
        '--color-active-bg',
        '--color-input-bg',
        '--color-input-border',
        '--color-input-focus',
        '--color-shadow',
        '--color-overlay',
        '--color-code-bg',
        '--color-code-text',
        '--button-bg',
        '--button-bg-hover',
        '--button-text',
        '--link-color',
        '--link-hover',
      ];

      expectedKeys.forEach(key => {
        expect(result).toHaveProperty(key);
      });

      // Should have exactly the expected number of keys
      expect(Object.keys(result)).toHaveLength(expectedKeys.length);
    });

    it('should handle color values with different formats', () => {
      const mixedColors = {
        bg: '#FFFFFF',
        bgAlt: 'rgb(255, 255, 255)',
        surface: 'hsl(0, 0%, 100%)',
        border: 'rgba(0, 0, 0, 0.1)',
        text: 'white',
      } as any;

      const result = colorsToCSSVariables(mixedColors);

      expect(result['--color-bg']).toBe('#FFFFFF');
      expect(result['--color-bg-alt']).toBe('rgb(255, 255, 255)');
      expect(result['--color-surface']).toBe('hsl(0, 0%, 100%)');
      expect(result['--color-border']).toBe('rgba(0, 0, 0, 0.1)');
      expect(result['--color-text']).toBe('white');
    });
  });
});