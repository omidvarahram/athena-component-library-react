import * as ContainersIndex from '../../../src/components/containers';

describe('Containers Index', () => {
  it('should export Screen component', () => {
    expect(ContainersIndex.Screen).toBeDefined();
    expect(typeof ContainersIndex.Screen).toBe('function');
  });

  it('should export all expected components', () => {
    const expectedExports = ['Screen'];

    expectedExports.forEach(exportName => {
      expect(ContainersIndex).toHaveProperty(exportName);
      expect(typeof (ContainersIndex as any)[exportName]).toBe('function');
    });
  });

  it('should not have unexpected exports', () => {
    const actualExports = Object.keys(ContainersIndex);
    const expectedExports = ['Screen'];

    // Check that we don't have more exports than expected
    expect(actualExports.length).toBe(expectedExports.length);

    // Check that all actual exports are expected
    actualExports.forEach(exportName => {
      expect(expectedExports).toContain(exportName);
    });
  });
});
