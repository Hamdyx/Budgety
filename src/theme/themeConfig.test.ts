import { theme } from 'antd';
import { describe, expect, it } from 'vitest';

import { getThemeConfig } from './themeConfig';

describe('getThemeConfig', () => {
  it('returns dark algorithm for dark mode', () => {
    // when
    const config = getThemeConfig('dark');

    // then
    expect(config.algorithm).toBe(theme.darkAlgorithm);
    expect(config.token?.colorBgBase).toBe('#1a1d2e');
  });

  it('returns default algorithm for light mode', () => {
    // when
    const config = getThemeConfig('light');

    // then
    expect(config.algorithm).toBe(theme.defaultAlgorithm);
    expect(config.token?.colorBgBase).toBe('#f7f8fa');
  });

  it('includes shared base tokens in both modes', () => {
    // when
    const dark = getThemeConfig('dark');
    const light = getThemeConfig('light');

    // then
    expect(dark.token?.colorPrimary).toBe('#21bf73');
    expect(light.token?.colorPrimary).toBe('#21bf73');
    expect(dark.token?.borderRadius).toBe(8);
    expect(light.token?.borderRadius).toBe(8);
  });

  it('includes component overrides', () => {
    // when
    const config = getThemeConfig('dark');

    // then
    expect(config.components?.Typography).toEqual({
      titleMarginBottom: 0,
      titleMarginTop: 0,
    });
    expect(config.components?.Layout).toBeDefined();
    expect(config.components?.Menu).toBeDefined();
  });
});
