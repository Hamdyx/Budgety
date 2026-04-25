import { Button, Form, Input, Modal, Select, Typography } from 'antd';
import { useState } from 'react';

import { SectionHeader } from '@/components/SectionHeader';
import { useAuthStore } from '@/stores/authStore';

import { useChangePassword, useDeleteAccount, useUpdateProfile } from '../../hooks';

import styles from './SettingsPage.module.css';

const { Text, Title } = Typography;

const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD — US Dollar' },
  { value: 'EUR', label: 'EUR — Euro' },
  { value: 'GBP', label: 'GBP — British Pound' },
  { value: 'JPY', label: 'JPY — Japanese Yen' },
  { value: 'CAD', label: 'CAD — Canadian Dollar' },
  { value: 'AUD', label: 'AUD — Australian Dollar' },
  { value: 'CHF', label: 'CHF — Swiss Franc' },
  { value: 'EGP', label: 'EGP — Egyptian Pound' },
];

export default function SettingsPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const user = useAuthStore(state => state.user);

  const { mutate: deleteAccount, isPending: isDeletePending } = useDeleteAccount();
  const { mutate: updateProfile, isPending: isProfilePending } = useUpdateProfile();
  const { mutate: changePassword, isPending: isPasswordPending } = useChangePassword();

  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  function handleProfileSubmit(values: { username: string; email: string; currency: string }) {
    updateProfile(values);
  }

  function handlePasswordSubmit(values: { currentPassword: string; newPassword: string }) {
    changePassword(
      { currentPassword: values.currentPassword, newPassword: values.newPassword },
      {
        onSuccess: () => {
          passwordForm.resetFields();
        },
      }
    );
  }

  return (
    <div className={styles.container}>
      <SectionHeader title="Settings" />

      <div className={styles.section}>
        <Title level={5}>Profile</Title>
        <Text type="secondary" className={styles.sectionDescription}>
          Update your account information.
        </Text>
        <Form
          form={profileForm}
          layout="vertical"
          className={styles.form}
          initialValues={{
            username: user?.username ?? '',
            email: user?.email ?? '',
            currency: user?.currency ?? 'USD',
          }}
          onFinish={handleProfileSubmit}
        >
          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter your username' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Currency" name="currency">
            <Select options={CURRENCY_OPTIONS} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isProfilePending}>
              Save Profile
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className={styles.section}>
        <Title level={5}>Security</Title>
        <Text type="secondary" className={styles.sectionDescription}>
          Change your account password.
        </Text>
        <Form form={passwordForm} layout="vertical" className={styles.form} onFinish={handlePasswordSubmit}>
          <Form.Item label="Current Password" name="currentPassword" rules={[{ required: true, message: 'Please enter your current password' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: 'Please enter a new password' },
              { min: 8, message: 'Password must be at least 8 characters' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your new password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isPasswordPending}>
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className={styles.dangerZone}>
        <Text className={styles.dangerDescription}>Permanently delete your account and all associated data. This action cannot be undone.</Text>
        <Button danger onClick={() => setIsDeleteModalOpen(true)}>
          Delete Account
        </Button>
      </div>

      <Modal
        title="Delete Account"
        open={isDeleteModalOpen}
        onOk={() => deleteAccount()}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="Delete"
        okButtonProps={{ danger: true, loading: isDeletePending }}
        cancelButtonProps={{ disabled: isDeletePending }}
      >
        <Text>Are you sure you want to delete your account? This action is irreversible.</Text>
      </Modal>
    </div>
  );
}
