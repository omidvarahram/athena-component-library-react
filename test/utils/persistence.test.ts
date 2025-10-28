import {
  getCookie,
  setCookie,
  persistToLocalStorage,
  restoreFromLocalStorage,
} from '../../src/utils/persistence';

// Mock console methods
const mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('persistence utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    mockConsoleWarn.mockClear();
  });

  afterAll(() => {
    mockConsoleWarn.mockRestore();
  });

  describe('setCookie', () => {
    it('should handle SSR (document undefined)', () => {
      const originalDocument = global.document;
      (global as any).document = undefined;

      // Should not throw error
      expect(() => setCookie('test-key', 'test-value')).not.toThrow();

      // Restore document
      (global as any).document = originalDocument;
    });

    it('should handle different expiration values', () => {
      // Test the function exists and can be called with different parameters
      expect(() => setCookie('key1', 'value1')).not.toThrow();
      expect(() => setCookie('key2', 'value2', 30)).not.toThrow();
      expect(() => setCookie('key3', 'value3', 0)).not.toThrow();
    });
  });

  describe('getCookie', () => {
    it('should handle SSR (document undefined)', () => {
      const originalDocument = global.document;
      (global as any).document = undefined;

      expect(getCookie('test-key')).toBeNull();

      // Restore document
      (global as any).document = originalDocument;
    });

    it('should return null for empty input', () => {
      // Test with various empty inputs
      expect(getCookie('')).toBeNull();
    });

    it('should handle cookie parsing logic with simple tests', () => {
      // Test that the function exists and handles various inputs
      expect(() => getCookie('test')).not.toThrow();
      expect(() => getCookie('')).not.toThrow();
      expect(() => getCookie('missing-key')).not.toThrow();
    });
  });

  describe('persistToLocalStorage', () => {
    it('should persist value to localStorage', () => {
      persistToLocalStorage('test-key', 'test-value');

      expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', 'test-value');
    });

    it('should handle localStorage errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });

      expect(() => persistToLocalStorage('test-key', 'test-value')).not.toThrow();
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        'Failed to persist theme to localStorage:',
        expect.any(Error)
      );
    });

    it('should handle SSR (window undefined)', () => {
      const originalWindow = global.window;
      (global as any).window = undefined;

      expect(() => persistToLocalStorage('test-key', 'test-value')).not.toThrow();

      // Restore window
      (global as any).window = originalWindow;
    });

    it('should persist complex values', () => {
      persistToLocalStorage('complex', JSON.stringify({ theme: 'dark', version: 1 }));

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'complex',
        '{"theme":"dark","version":1}'
      );
    });

    it('should persist empty values', () => {
      persistToLocalStorage('empty', '');

      expect(localStorageMock.setItem).toHaveBeenCalledWith('empty', '');
    });

    it('should persist special characters', () => {
      persistToLocalStorage('special', 'value with spaces & symbols!');

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'special',
        'value with spaces & symbols!'
      );
    });
  });

  describe('restoreFromLocalStorage', () => {
    it('should restore value from localStorage', () => {
      localStorageMock.getItem.mockReturnValue('stored-value');

      expect(restoreFromLocalStorage('test-key')).toBe('stored-value');
      expect(localStorageMock.getItem).toHaveBeenCalledWith('test-key');
    });

    it('should return null for non-existent key', () => {
      localStorageMock.getItem.mockReturnValue(null);

      expect(restoreFromLocalStorage('non-existent')).toBeNull();
    });

    it('should handle localStorage errors gracefully', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('Storage access denied');
      });

      expect(restoreFromLocalStorage('test-key')).toBeNull();
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        'Failed to restore theme from localStorage:',
        expect.any(Error)
      );
    });

    it('should handle SSR (window undefined)', () => {
      const originalWindow = global.window;
      (global as any).window = undefined;

      expect(restoreFromLocalStorage('test-key')).toBeNull();

      // Restore window
      (global as any).window = originalWindow;
    });

    it('should restore complex values', () => {
      const complexValue = JSON.stringify({ theme: 'dark', settings: { auto: true } });
      localStorageMock.getItem.mockReturnValue(complexValue);

      expect(restoreFromLocalStorage('complex')).toBe(complexValue);
    });

    it('should restore empty string values', () => {
      localStorageMock.getItem.mockReturnValue('');

      expect(restoreFromLocalStorage('empty')).toBe('');
    });

    it('should handle different key formats', () => {
      localStorageMock.getItem.mockReturnValue('value');

      expect(restoreFromLocalStorage('simple-key')).toBe('value');
      expect(restoreFromLocalStorage('key.with.dots')).toBe('value');
      expect(restoreFromLocalStorage('key_with_underscores')).toBe('value');
    });
  });

  describe('Error handling edge cases', () => {
    it('should handle localStorage setItem with special error types', () => {
      // Test different types of errors
      localStorageMock.setItem.mockImplementation(() => {
        const error = new Error('QuotaExceededError');
        error.name = 'QuotaExceededError';
        throw error;
      });

      expect(() => persistToLocalStorage('test', 'value')).not.toThrow();
      expect(mockConsoleWarn).toHaveBeenCalled();
    });

    it('should handle localStorage getItem with special error types', () => {
      localStorageMock.getItem.mockImplementation(() => {
        const error = new Error('SecurityError');
        error.name = 'SecurityError';
        throw error;
      });

      expect(restoreFromLocalStorage('test')).toBeNull();
      expect(mockConsoleWarn).toHaveBeenCalled();
    });
  });
});
