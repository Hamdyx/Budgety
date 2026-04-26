import type { User } from '@/types/types';
import type { ColumnsType } from 'antd/es/table';

import { ExclamationCircleFilled } from '@ant-design/icons';
import { App, Button, Table, Tag, Tooltip } from 'antd';

import { SectionHeader } from '@/components/SectionHeader';
import { useAuthStore } from '@/stores/authStore';

import { useDeleteUser, useUsers } from '../../hooks';

import styles from './AdminUsersPage.module.css';

const AdminUsersPage = () => {
  const { data: users = [], isLoading } = useUsers();
  const { mutate: deleteUser, isPending } = useDeleteUser();
  const { modal } = App.useApp();
  const currentUser = useAuthStore(state => state.user);

  const confirmDelete = (user: User) => {
    modal.confirm({
      title: 'Delete user',
      icon: <ExclamationCircleFilled />,
      content: `Are you sure you want to delete "${user.username}"?`,
      okText: 'Delete',
      okType: 'danger',
      onOk: () => deleteUser(user.id),
    });
  };

  const columns: ColumnsType<User> = [
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Role',
      key: 'role',
      render: (_, record) => (record.isAdmin ? <Tag color="gold">Admin</Tag> : <Tag>User</Tag>),
    },
    {
      title: 'Actions',
      key: 'actions',
      className: styles.actions,
      render: (_, record) => {
        const isSelf = record.id === currentUser?.id;
        return (
          <Tooltip title={isSelf ? 'Cannot delete your own account' : undefined}>
            <Button danger size="small" loading={isPending} disabled={isSelf} onClick={() => confirmDelete(record)}>
              Delete
            </Button>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <>
      <SectionHeader title="Admin — Users" />
      <Table rowKey="id" columns={columns} dataSource={users} loading={isLoading} pagination={false} />
    </>
  );
};

export default AdminUsersPage;
