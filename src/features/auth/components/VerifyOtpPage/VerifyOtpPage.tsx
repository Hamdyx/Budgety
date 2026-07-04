import { Alert, Button, Form, Input } from 'antd';
import { Navigate, useLocation } from 'react-router';

import { ApiRequestError } from '@/api/client';

import { useVerifyResetOtp } from '../../hooks';
import AuthLayout from '../AuthLayout';
import styles from '../AuthLayout.module.css';

function VerifyOtpPage() {
  const location = useLocation();
  const email = (location.state as { email?: string })?.email;
  const { mutate, isPending, error } = useVerifyResetOtp();
  const [form] = Form.useForm();

  if (!email) {
    return <Navigate to="/forgot-password" replace />;
  }

  const handleFinish = (values: { otp: string }) => {
    mutate({ email, otp: values.otp });
  };

  const errorMessage = error instanceof ApiRequestError ? error.message : error ? 'Something went wrong' : null;

  return (
    <AuthLayout>
      {errorMessage && <Alert type="error" title={errorMessage} showIcon className={styles.error} />}
      <Form form={form} layout="vertical" onFinish={handleFinish} requiredMark={false}>
        <Form.Item
          name="otp"
          label="Verification Code"
          rules={[
            { required: true, message: 'Please enter the verification code' },
            { len: 6, message: 'Code must be 6 digits' },
          ]}
        >
          <Input placeholder="Enter 6-digit code" size="large" maxLength={6} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={isPending}>
            Verify Code
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
}

export default VerifyOtpPage;
