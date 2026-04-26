import { describe, expect, it } from 'vitest';

import { toCamelCase, toSnakeCase } from './caseConverter';

describe('toCamelCase', () => {
  it('converts snake_case keys to camelCase', () => {
    // then
    expect(toCamelCase({ foo_bar: 1, baz_qux: 2 })).toEqual({ fooBar: 1, bazQux: 2 });
  });

  it('handles nested objects', () => {
    // then
    expect(toCamelCase({ outer_key: { inner_key: 'val' } })).toEqual({ outerKey: { innerKey: 'val' } });
  });

  it('handles arrays of objects', () => {
    // then
    expect(toCamelCase([{ some_key: 1 }, { other_key: 2 }])).toEqual([{ someKey: 1 }, { otherKey: 2 }]);
  });

  it('returns primitives unchanged', () => {
    // then
    expect(toCamelCase('hello')).toBe('hello');
    expect(toCamelCase(42)).toBe(42);
    expect(toCamelCase(null)).toBeNull();
    expect(toCamelCase(undefined)).toBeUndefined();
  });

  it('handles empty objects and arrays', () => {
    // then
    expect(toCamelCase({})).toEqual({});
    expect(toCamelCase([])).toEqual([]);
  });

  it('handles nested arrays', () => {
    // then
    expect(toCamelCase([{ list_items: [{ nested_key: 'v' }] }])).toEqual([{ listItems: [{ nestedKey: 'v' }] }]);
  });
});

describe('toSnakeCase', () => {
  it('converts camelCase keys to snake_case', () => {
    // then
    expect(toSnakeCase({ fooBar: 1, bazQux: 2 })).toEqual({ foo_bar: 1, baz_qux: 2 });
  });

  it('handles nested objects', () => {
    // then
    expect(toSnakeCase({ outerKey: { innerKey: 'val' } })).toEqual({ outer_key: { inner_key: 'val' } });
  });

  it('handles arrays of objects', () => {
    // then
    expect(toSnakeCase([{ someKey: 1 }])).toEqual([{ some_key: 1 }]);
  });

  it('returns primitives unchanged', () => {
    // then
    expect(toSnakeCase('hello')).toBe('hello');
    expect(toSnakeCase(42)).toBe(42);
    expect(toSnakeCase(null)).toBeNull();
  });
});
