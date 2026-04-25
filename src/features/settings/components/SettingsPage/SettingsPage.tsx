import { Button, Modal, Select, Typography } from 'antd';
import { useState } from 'react';

import { SectionHeader } from '@/components/SectionHeader';
import { useCurrencyStore } from '@/stores/currencyStore';

import { useDeleteAccount } from '../../hooks';

import styles from './SettingsPage.module.css';

const { Text } = Typography;

export default function SettingsPage() {
  const [open, setOpen] = useState(false);
  const { mutate: deleteAccount, isPending } = useDeleteAccount();
  const { currency, setCurrency } = useCurrencyStore();

  return (
    <div className={styles.container}>
      <SectionHeader title="Settings" />

      <div className={styles.section}>
        <Text strong>Currency</Text>
        <br />
        <Text type="secondary" className={styles.sectionDescription}>
          Choose the currency used to display all monetary values.
        </Text>
        <Select
          value={currency}
          onChange={setCurrency}
          className={styles.currencySelect}
          options={[
            { value: 'USD', label: 'USD — US Dollar' },
            { value: 'EUR', label: 'EUR — Euro' },
            { value: 'GBP', label: 'GBP — British Pound' },
            { value: 'JPY', label: 'JPY — Japanese Yen' },
            { value: 'CAD', label: 'CAD — Canadian Dollar' },
            { value: 'AUD', label: 'AUD — Australian Dollar' },
            { value: 'CHF', label: 'CHF — Swiss Franc' },
            { value: 'EGP', label: 'EGP — Egyptian Pound' },
          ]}
        />
      </div>

      <div className={styles.dangerZone}>
        <Text className={styles.dangerDescription}>Permanently delete your account and all associated data. This action cannot be undone.</Text>
        <Button danger onClick={() => setOpen(true)}>
          Delete Account
        </Button>
      </div>

      <Modal
        title="Delete Account"
        open={open}
        onOk={() => deleteAccount()}
        onCancel={() => setOpen(false)}
        okText="Delete"
        okButtonProps={{ danger: true, loading: isPending }}
        cancelButtonProps={{ disabled: isPending }}
      >
        <Text>Are you sure you want to delete your account? This action is irreversible.</Text>
      </Modal>
    </div>
  );
}
