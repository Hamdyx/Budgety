import { Alert, Button, Form, Input } from 'antd';
import { Link } from 'react-router';

import { ApiRequestError } from '@/api/client';

import { useRegister } from '../../hooks';
import AuthLayout from '../AuthLayout';
import styles from '../AuthLayout.module.css';

function RegisterPage() {
  const { mutate, isPending, error } = useRegister();
  const [form] = Form.useForm();

  const handleFinish = (values: { email: string; username: string; password: string }) => {
    mutate({ email: values.email, username: values.username, password: values.password });
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
        <Form.Item
          name="username"
          label="Username"
          rules={[
            { required: true, message: 'Please enter a username' },
            { min: 3, message: 'Username must be at least 3 characters' },
          ]}
        >
          <Input placeholder="Username" size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please enter a password' },
            { min: 8, message: 'Password must be at least 8 characters' },
          ]}
        >
          <Input.Password placeholder="Password" size="large" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" size="large" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={isPending}>
            Register
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.footer}>
        Already have an account? <Link to="/login">Sign In</Link>
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;
