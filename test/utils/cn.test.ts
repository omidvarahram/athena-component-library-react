import { cn } from '../../src/utils/cn';

describe('cn utility', () => {
  it('should merge simple class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should handle empty strings', () => {
    expect(cn('', 'class1', '')).toBe('class1');
  });

  it('should handle undefined and null values', () => {
    expect(cn(undefined, 'class1', null)).toBe('class1');
  });

  it('should handle boolean conditions', () => {
    expect(cn('class1', true && 'class2', false && 'class3')).toBe('class1 class2');
  });

  it('should handle object-style class names', () => {
    expect(cn({
      'class1': true,
      'class2': false,
      'class3': true
    })).toBe('class1 class3');
  });

  it('should handle array of class names', () => {
    expect(cn(['class1', 'class2'])).toBe('class1 class2');
  });

  it('should merge and deduplicate Tailwind classes', () => {
    // twMerge should handle Tailwind class conflicts
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('should handle complex mixed inputs', () => {
    expect(cn(
      'base-class',
      { 'conditional-class': true, 'hidden-class': false },
      ['array-class1', 'array-class2'],
      undefined,
      null,
      ''
    )).toBe('base-class conditional-class array-class1 array-class2');
  });

  it('should handle no arguments', () => {
    expect(cn()).toBe('');
  });

  it('should handle only falsy values', () => {
    expect(cn(false, null, undefined, '')).toBe('');
  });

  it('should handle nested arrays and objects', () => {
    expect(cn(
      'base',
      [
        'array1',
        { 'nested-true': true, 'nested-false': false },
        ['deeply-nested']
      ]
    )).toBe('base array1 nested-true deeply-nested');
  });
});
