import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/tests/render';

import OverviewCard from './OverviewCard';

describe('OverviewCard', () => {
  it('renders title and children', () => {
    // when
    renderWithProviders(
      <OverviewCard title="Test Card">
        <p>Content</p>
      </OverviewCard>
    );

    // then
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders add button when onAdd is provided', async () => {
    const onAdd = vi.fn();

    // when
    const { user } = renderWithProviders(
      <OverviewCard title="Card" onAdd={onAdd}>
        Body
      </OverviewCard>
    );
    const addBtn = screen.getByRole('button');

    // then
    await user.click(addBtn);
    expect(onAdd).toHaveBeenCalledOnce();
  });

  it('does not render add button when no onAdd', () => {
    // when
    renderWithProviders(<OverviewCard title="Card">Body</OverviewCard>);

    // then
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders custom extra instead of add button', () => {
    // when
    renderWithProviders(
      <OverviewCard title="Card" extra={<span data-testid="custom-extra">Extra</span>} onAdd={() => {}}>
        Body
      </OverviewCard>
    );

    // then
    expect(screen.getByTestId('custom-extra')).toBeInTheDocument();
  });
});
