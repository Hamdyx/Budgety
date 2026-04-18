import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useThemeStore } from '@/stores/themeStore';
import { renderWithProviders } from '@/tests/render';

import ThemeProvider from './ThemeProvider';

describe('ThemeProvider', () => {
  it('sets data-theme attribute on document element', () => {
    // given
    useThemeStore.setState({ mode: 'dark' });

    // when
    renderWithProviders(
      <ThemeProvider>
        <div>child</div>
      </ThemeProvider>
    );

    // then
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('updates data-theme when mode changes', () => {
    // given
    useThemeStore.setState({ mode: 'light' });

    // when
    renderWithProviders(
      <ThemeProvider>
        <div>child</div>
      </ThemeProvider>
    );

    // then
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('renders children', () => {
    // when
    renderWithProviders(
      <ThemeProvider>
        <span data-testid="theme-child">Hello</span>
      </ThemeProvider>
    );

    // then
    expect(screen.getByTestId('theme-child')).toBeInTheDocument();
  });
});
