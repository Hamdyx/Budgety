import { Alert, Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

import { ApiRequestError } from '@/api/client';

import { useLogin } from '../../hooks';
import AuthLayout from '../AuthLayout';
import styles from '../AuthLayout.module.css';

function LoginPage() {
  const { mutate, isPending, error } = useLogin();
  const [form] = Form.useForm();

  const handleFinish = (values: { email: string; password: string }) => {
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
        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password placeholder="Password" size="large" />
        </Form.Item>
        <Form.Item>
          <Link to="/forgot-password">Forgot password?</Link>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={isPending}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.footer}>
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
