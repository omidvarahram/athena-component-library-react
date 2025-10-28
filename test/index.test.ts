import * as ComponentLibrary from '../src/index';

describe('Component Library Exports', () => {
  it('should export ThemeProvider', () => {
    expect(ComponentLibrary.ThemeProvider).toBeDefined();
    expect(typeof ComponentLibrary.ThemeProvider).toBe('function');
  });

  it('should export useTheme hook', () => {
    expect(ComponentLibrary.useTheme).toBeDefined();
    expect(typeof ComponentLibrary.useTheme).toBe('function');
  });

  it('should have all expected exports', () => {
    const expectedExports = [
      'ThemeProvider',
      'useTheme',
    ];

    expectedExports.forEach(exportName => {
      expect(ComponentLibrary).toHaveProperty(exportName);
    });
  });
});
