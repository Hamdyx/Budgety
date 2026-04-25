import type { ReactElement } from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, afterEach } from 'vitest';

import { renderWithProviders } from '@/tests/render';

import { ErrorBoundary } from './index';

function Bomb(): ReactElement {
  throw new Error('Test error');
}

describe('ErrorBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    // given / when
    renderWithProviders(
      <ErrorBoundary>
        <span>Safe content</span>
      </ErrorBoundary>
    );

    // then
    expect(screen.getByText('Safe content')).toBeInTheDocument();
  });

  it('renders error fallback when a child throws', () => {
    // given
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // when
    renderWithProviders(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    // then
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload/i })).toBeInTheDocument();
  });

  it('calls window.location.reload when reload button is clicked', async () => {
    // given
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const reloadSpy = vi.fn();
    vi.stubGlobal('location', { ...globalThis.location, reload: reloadSpy });

    renderWithProviders(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    // when
    await userEvent.click(screen.getByRole('button', { name: /reload/i }));

    // then
    expect(reloadSpy).toHaveBeenCalledOnce();
  });
});
