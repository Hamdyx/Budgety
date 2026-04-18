import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/tests/render';

import SectionHeader from './SectionHeader';

describe('SectionHeader', () => {
  it('renders the title', () => {
    // when
    renderWithProviders(<SectionHeader title="My Section" />);

    // then
    expect(screen.getByText('My Section')).toBeInTheDocument();
  });

  it('renders extra content when provided', () => {
    // when
    renderWithProviders(<SectionHeader title="Section" extra={<button>Add</button>} />);

    // then
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('does not render extra when not provided', () => {
    // when
    renderWithProviders(<SectionHeader title="Section" />);

    // then
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
