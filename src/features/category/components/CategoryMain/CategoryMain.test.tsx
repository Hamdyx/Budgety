import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import CategoryMain from './CategoryMain';

describe('CategoryMain', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
  });

  it('shows spinner while loading', () => {
    // when
    renderWithProviders(<CategoryMain />);

    // then
    expect(document.querySelector('.ant-spin')).toBeInTheDocument();
  });

  it('renders categories header', async () => {
    // when
    renderWithProviders(<CategoryMain />);

    // then
    await waitFor(() => {
      expect(screen.getByText('Categories')).toBeInTheDocument();
    });
  });

  it('renders category boxes for each category', async () => {
    // when
    renderWithProviders(<CategoryMain />);

    // then
    await waitFor(() => {
      expect(screen.getByText('Salary')).toBeInTheDocument();
      expect(screen.getByText('Food')).toBeInTheDocument();
      expect(screen.getByText('Rent')).toBeInTheDocument();
      expect(screen.getByText('Freelance')).toBeInTheDocument();
    });
  });

  it('renders add category button', async () => {
    // when
    renderWithProviders(<CategoryMain />);

    // then
    await waitFor(() => {
      expect(screen.getByText('Categories')).toBeInTheDocument();
    });
    // PlusOutlined button for adding category
    expect(screen.getByRole('button', { name: 'Add category' })).toBeInTheDocument();
  });
});
