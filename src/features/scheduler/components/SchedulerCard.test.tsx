import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/tests/render';

import SchedulerCard from './SchedulerCard';

describe('SchedulerCard', () => {
  it('renders scheduler title', () => {
    // when
    const { container } = renderWithProviders(<SchedulerCard />);

    // then
    expect(container.textContent).toContain('Scheduler');
  });

  it('renders calendar', () => {
    // when
    const { container } = renderWithProviders(<SchedulerCard />);

    // then
    expect(container.querySelector('.ant-picker-calendar')).toBeInTheDocument();
  });
});
