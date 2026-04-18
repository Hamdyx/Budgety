import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockToken } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import CategoryMain from './CategoryMain';

describe('CategoryMain', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
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
      expect(screen.getByDisplayValue('Salary')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Food')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Rent')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Freelance')).toBeInTheDocument();
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
    expect(document.querySelector('.anticon-plus')).toBeInTheDocument();
  });
});
