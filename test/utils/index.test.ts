import * as Utils from '../../src/utils/index';

describe('Utils Exports', () => {
  it('should export cn utility', () => {
    expect(Utils.cn).toBeDefined();
    expect(typeof Utils.cn).toBe('function');
  });

  it('should export cva utility', () => {
    expect(Utils.cva).toBeDefined();
    expect(typeof Utils.cva).toBe('function');
  });

  it('should export theme utilities', () => {
    expect(Utils.lightColors).toBeDefined();
    expect(Utils.darkColors).toBeDefined();
    expect(Utils.colorsToCSSVariables).toBeDefined();
    expect(typeof Utils.colorsToCSSVariables).toBe('function');
  });

  it('should export persistence utilities', () => {
    expect(Utils.getCookie).toBeDefined();
    expect(Utils.setCookie).toBeDefined();
    expect(Utils.persistToLocalStorage).toBeDefined();
    expect(Utils.restoreFromLocalStorage).toBeDefined();
    expect(typeof Utils.getCookie).toBe('function');
    expect(typeof Utils.setCookie).toBe('function');
    expect(typeof Utils.persistToLocalStorage).toBe('function');
    expect(typeof Utils.restoreFromLocalStorage).toBe('function');
  });
});