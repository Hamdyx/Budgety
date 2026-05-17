import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

import AdminUsersPage from './AdminUsersPage';

const API = import.meta.env.VITE_API_URL;

const adminUser = { ...mockUser, isAdmin: true };

describe('AdminUsersPage', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, adminUser);
  });

  it('renders the page title', async () => {
    // when
    renderWithProviders(<AdminUsersPage />);

    // then
    expect(screen.getByText('Admin — Users')).toBeInTheDocument();
  });

  it('renders users in a table', async () => {
    // when
    renderWithProviders(<AdminUsersPage />);

    // then
    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
    });

    // and - admin user should also be listed
    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('admin@example.com')).toBeInTheDocument();
  });

  it('shows Admin tag for admin users', async () => {
    // when
    renderWithProviders(<AdminUsersPage />);

    // then
    await waitFor(() => {
      expect(screen.getByText('Admin')).toBeInTheDocument();
    });
  });

  it('shows User tag for non-admin users', async () => {
    // when
    renderWithProviders(<AdminUsersPage />);

    // then
    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
    });

    // and - should have User tag
    const userTags = screen.getAllByText('User');
    expect(userTags.length).toBeGreaterThanOrEqual(1);
  });

  it('disables delete button for current user', async () => {
    // when
    renderWithProviders(<AdminUsersPage />);

    // then
    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
    });

    // and - the delete buttons should exist: own is disabled, other is enabled
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    const selfButton = deleteButtons.find(btn => btn.closest('tr')?.textContent?.includes('testuser'));
    const otherButton = deleteButtons.find(btn => btn.closest('tr')?.textContent?.includes('admin'));
    expect(selfButton).toBeDisabled();
    expect(otherButton).not.toBeDisabled();
  });

  it('shows confirmation modal on delete click', async () => {
    // given
    const user = userEvent.setup();

    // when
    renderWithProviders(<AdminUsersPage />);

    // then
    await waitFor(() => {
      expect(screen.getByText('admin')).toBeInTheDocument();
    });

    // and - click delete button for another user (not self)
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    const otherButton = deleteButtons.find(btn => btn.closest('tr')?.textContent?.includes('admin'));
    await user.click(otherButton!);

    // and - confirmation modal should appear
    await waitFor(() => {
      expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    });
  });

  it('deletes user on confirm', async () => {
    // given
    const user = userEvent.setup();

    // when
    renderWithProviders(<AdminUsersPage />);

    // then
    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
    });

    // and - click delete button for another user (not self)
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    const otherButton = deleteButtons.find(btn => btn.closest('tr')?.textContent?.includes('admin'));
    await user.click(otherButton!);

    // and - confirmation modal should appear
    await waitFor(() => {
      expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    });

    // and - modal's OK button has okText="Delete" inside the confirm dialog
    const modalFooter = document.querySelector('.ant-modal-confirm-btns');
    const modalDeleteBtn = modalFooter!.querySelector('button.ant-btn-dangerous')!;
    await user.click(modalDeleteBtn);

    // and - should not throw — successful 204 response
    await waitFor(() => {
      expect(screen.queryByText(/are you sure/i)).not.toBeInTheDocument();
    });
  });

  it('handles API error gracefully', async () => {
    // given
    server.use(http.get(`${API}/admin/users`, () => HttpResponse.json({ detail: 'Forbidden' }, { status: 403 })));

    // when
    renderWithProviders(<AdminUsersPage />);

    // and - table should render but be empty (no crash)
    await waitFor(() => {
      expect(screen.getByText('Admin — Users')).toBeInTheDocument();
    });
  });

  it('shows error message when delete user fails', async () => {
    // given
    server.use(http.delete('*/admin/users/*', () => HttpResponse.json({ detail: 'error' }, { status: 500 })));
    const user = userEvent.setup();

    // when
    renderWithProviders(<AdminUsersPage />);

    // then
    await waitFor(() => {
      expect(screen.getByText('admin')).toBeInTheDocument();
    });

    // and - click delete for another user (not self)
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    const otherButton = deleteButtons.find(btn => btn.closest('tr')?.textContent?.includes('admin'));
    await user.click(otherButton!);

    await waitFor(() => {
      expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    });

    const modalFooter = document.querySelector('.ant-modal-confirm-btns');
    const modalDeleteBtn = modalFooter!.querySelector('button.ant-btn-dangerous')!;
    await user.click(modalDeleteBtn);

    // and
    await waitFor(() => {
      expect(screen.getByText('Failed to delete user')).toBeInTheDocument();
    });
  });
});
