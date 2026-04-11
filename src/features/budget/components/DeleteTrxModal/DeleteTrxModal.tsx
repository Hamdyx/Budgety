import { DeleteOutlined } from '@ant-design/icons';
import { Button, Modal, Typography } from 'antd';
import { useState } from 'react';

import { useDeleteTransaction } from '../../hooks';

export const DeleteTrxModal = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const deleteMutation = useDeleteTransaction();

  const handleDelete = () => {
    deleteMutation.mutate(id, { onSuccess: () => setOpen(false) });
  };

  return (
    <>
      <Button
        type="text"
        size="small"
        danger
        icon={<DeleteOutlined />}
        title="Delete transaction"
        aria-label="Delete transaction"
        onClick={() => setOpen(true)}
      />
      <Modal title="Delete Transaction" open={open} onCancel={() => setOpen(false)} onOk={handleDelete} okText="Delete" okButtonProps={{ danger: true }}>
        <Typography.Paragraph>Are you sure you want to delete this transaction?</Typography.Paragraph>
        <Typography.Paragraph type="secondary">If deleted you can't recover it again.</Typography.Paragraph>
      </Modal>
    </>
  );
};
