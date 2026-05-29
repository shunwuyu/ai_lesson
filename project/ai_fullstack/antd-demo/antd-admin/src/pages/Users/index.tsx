// src/components/Users.tsx
import React, { useEffect } from 'react';
import { Table, Spin, Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useUserStore  from '../../store/userStore';
import type { User } from '../../types/index';

const columns: ColumnsType<User> = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
];

const Users: React.FC = () => {
  const { users , total, loading, currentPage, pageSize, fetchUsers, setPage } = useUserStore();
  // console.log(JSON.stringify(users), '|||||||||||||||||||||/////' );
  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  return (
    <Spin spinning={loading}>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={false} // 我们用外部 Pagination 控制
      />
      <Pagination
        style={{ marginTop: 16, textAlign: 'right' }}
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={(page) => setPage(page)}
        showSizeChanger={false}
      />
    </Spin>
  );
};

export default Users;