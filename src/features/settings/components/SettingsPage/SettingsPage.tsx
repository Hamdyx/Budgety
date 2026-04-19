import { Button, Modal, Typography } from 'antd';
import { useState } from 'react';

import { SectionHeader } from '@/components/SectionHeader';

import { useDeleteAccount } from '../../hooks';

import styles from './SettingsPage.module.css';

const { Text } = Typography;

export default function SettingsPage() {
  const [open, setOpen] = useState(false);
  const { mutate: deleteAccount, isPending } = useDeleteAccount();

  return (
    <div className={styles.container}>
      <SectionHeader title="Settings" />

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
