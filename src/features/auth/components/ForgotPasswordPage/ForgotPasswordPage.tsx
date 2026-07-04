import { Alert, Button, Form, Input } from 'antd';
import { Link } from 'react-router';

import { ApiRequestError } from '@/api/client';

import { useForgotPassword } from '../../hooks';
import AuthLayout from '../AuthLayout';
import styles from '../AuthLayout.module.css';

function ForgotPasswordPage() {
  const { mutate, isPending, error } = useForgotPassword();
  const [form] = Form.useForm();

  const handleFinish = (values: { email: string }) => {
    mutate(values);
  };

  const errorMessage = error instanceof ApiRequestError ? error.message : error ? 'Something went wrong' : null;

  return (
    <AuthLayout>
      {errorMessage && <Alert type="error" title={errorMessage} showIcon className={styles.error} />}
      <Form form={form} layout="vertical" onFinish={handleFinish} requiredMark={false}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input placeholder="you@example.com" size="large" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={isPending}>
            Send Reset Code
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.footer}>
        Remember your password? <Link to="/login">Sign In</Link>
      </div>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
