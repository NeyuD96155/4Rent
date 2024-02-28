// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchAccounts } from '../redux/features/accountsSlice';

// const AccountsComponent = () => {
//   const dispatch = useDispatch();
//   const { items, status, error } = useSelector((state) => state.accounts);

//   useEffect(() => {
//     dispatch(fetchAccounts());
//   }, [dispatch]);

//   if (status === 'loading') return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h2>Accounts List</h2>
//       <ul>
//         {items.map((account) => (
//           <li key={account.id}>
//             <div>Email: {account.email}</div>
//             <div>Full Name: {account.fullname}</div>
//             <div>Date of Birth: {account.dateOfBirth}</div>
//             <div>Gender: {account.gender}</div>
//             <div>Phone Number: {account.phoneNumber}</div>
//             <div>Address: {account.address}</div>
//             <div>Role: {account.role}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AccountsComponent;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAccounts } from '../redux/features/accountsSlice';
import { Table, Input, Button, Space, Highlighter, message,Modal } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const DashBoard = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.accounts);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [pagination, setPagination] = useState({ pageSize: 10, current: 1 });
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [detailAccount, setDetailAccount] = useState({});
  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          autoFocus
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toLowerCase()
        .split('@')[0] // Chia địa chỉ email thành phần trước và sau dấu '@' và lấy phần trước
        .includes(value.toLowerCase()),
  });

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Name',
      dataIndex: 'fullname',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Admin', value: 'ADMIN' },
        { text: 'Member', value: 'MEMBER' },
        { text: 'Renter', value: 'RENTER' },
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: 'Creation Date',
      dataIndex: 'creationDate',
      key: 'creationDate',
      sorter: (a, b) => new Date(a.creationDate) - new Date(b.creationDate),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => viewDetails(record.id)} />
          <Button icon={<EditOutlined />} onClick={() => editAccount(record.id)} />
          <Button icon={<DeleteOutlined />} onClick={() => deleteAccount(record.id)} />
        </Space>
      ),
    },
  ];

  const viewDetails = id => {
    const accountDetails = items.find(account => account.id === id);
    if (accountDetails) {
      setDetailAccount(accountDetails);
      setIsDetailModalVisible(true);
    } else {
      message.error('Account details not found.');
    }
  };

  const editAccount = id => {
    // Implement edit account functionality
    message.info('Editing account id: ' + id);
  };

  const deleteAccount = id => {
    // Implement delete account functionality
    message.info('Deleting account id: ' + id);
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Table
        columns={columns}
        dataSource={items}
        pagination={pagination}
        onChange={(pagination) => setPagination(pagination)}
      />
       <Modal
        title="Account Details"
        visible={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsDetailModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        <p>Email: {detailAccount.email}</p>
        <p>Full Name: {detailAccount.fullname}</p>
        <p>Role: {detailAccount.role}</p>
        <p>Date of Birth: {detailAccount.dateOfBirth}</p>
        <p>Gender: {detailAccount.gender}</p>
        <p>Phone Number: {detailAccount.phoneNumber}</p>
        <p>Address: {detailAccount.address}</p>
      </Modal>
    </div>
    
  );
};

export default DashBoard;
