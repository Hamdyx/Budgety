import { Alert, Button, Form, Input } from 'antd';
import { Navigate, useLocation } from 'react-router-dom';

import { ApiRequestError } from '@/api/client';

import { useResetPassword } from '../../hooks';
import AuthLayout from '../AuthLayout';
import styles from '../AuthLayout.module.css';

function ResetPasswordPage() {
  const location = useLocation();
  const resetToken = (location.state as { resetToken?: string })?.resetToken;
  const { mutate, isPending, error } = useResetPassword();
  const [form] = Form.useForm();

  if (!resetToken) {
    return <Navigate to="/forgot-password" replace />;
  }

  const handleFinish = (values: { newPassword: string }) => {
    mutate({ token: resetToken, password: values.newPassword });
  };

  const errorMessage = error instanceof ApiRequestError ? error.message : error ? 'Something went wrong' : null;

  return (
    <AuthLayout>
      {errorMessage && <Alert type="error" title={errorMessage} showIcon className={styles.error} />}
      <Form form={form} layout="vertical" onFinish={handleFinish} requiredMark={false}>
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            { required: true, message: 'Please enter a new password' },
            { min: 8, message: 'Password must be at least 8 characters' },
          ]}
        >
          <Input.Password placeholder="New password" size="large" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm your password' },
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
          <Input.Password placeholder="Confirm new password" size="large" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={isPending}>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
}

export default ResetPasswordPage;
