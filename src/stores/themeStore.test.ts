import { afterEach, describe, expect, it } from 'vitest';

import { useThemeStore } from './themeStore';

describe('themeStore', () => {
  afterEach(() => {
    useThemeStore.setState({ mode: 'dark' });
  });

  it('defaults to dark mode', () => {
    // then
    expect(useThemeStore.getState().mode).toBe('dark');
  });

  it('toggleMode switches from dark to light', () => {
    // when
    useThemeStore.getState().toggleMode();

    // then
    expect(useThemeStore.getState().mode).toBe('light');
  });

  it('toggleMode switches from light to dark', () => {
    // given
    useThemeStore.setState({ mode: 'light' });

    // when
    useThemeStore.getState().toggleMode();

    // then
    expect(useThemeStore.getState().mode).toBe('dark');
  });
});
