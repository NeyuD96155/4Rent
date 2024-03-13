import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccounts, deleteAccount } from "../redux/features/accountsSlice"; // Thêm hàm deleteAccount từ Redux action
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Table, Modal, Button, message } from "antd";
import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const DashBoard = () => {
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.accounts.items);
    const [collapsed, setCollapsed] = useState(false);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [detailAccount, setDetailAccount] = useState({});
    const [showUserTable, setShowUserTable] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchAccounts());
    }, [dispatch]);

    const handleMenuClick = (e) => {
        if (e.key === "2") {
            setShowUserTable(true);
        } else {
            setShowUserTable(false);
        }

        if (e.key === "sub2") {
            navigate("/");
        }
    };

    const handleDeleteAccount = async (record) => {
        try {
            await dispatch(deleteAccount(record.id));
            message.success('Account deleted successfully');
        } catch (error) {
            console.error('Error deleting account:', error);
            message.error('Failed to delete account');
        }
    };

    const columns = [
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Full Name",
            dataIndex: "fullname",
            key: "fullname",
        },
        {
            title: "Phone",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <span>
                    <span style={{ marginRight: 8, color: 'blue', cursor: 'pointer' }}
                        onClick={() => {
                            setIsDetailModalVisible(true);
                            setDetailAccount(record);
                        }}
                    >
                        View Details
                    </span>

                    <Button type="link" danger onClick={() => handleDeleteAccount(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const items = [
        { key: "1", icon: <PieChartOutlined />, label: "Profit Statistic" },
        { key: "2", icon: <DesktopOutlined />, label: "Manage Account" },
        {
            key: "sub1",
            icon: <UserOutlined />,
            label: "User",
            children: [
                { key: "3", label: "Tom" },
                { key: "4", label: "Bill" },
                { key: "5", label: "Alex" },
            ],
        },
        { key: "9", icon: <FileOutlined />, label: "Files" },
        { key: "10", icon: <FileOutlined />, label: "Manage Post" },
        {
            key: "sub2",
            icon: <TeamOutlined />,
            label: "Back to Homepage",
            onClick: () => navigate("/"),
        },
    ];

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                    items={items}
                    onClick={handleMenuClick}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0 }} />
                <Content style={{ margin: "0 16px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    {showUserTable && (
                        <Table dataSource={accounts} columns={columns} />
                    )}
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
            <Modal
                title="Account Details"
                visible={isDetailModalVisible}
                onOk={() => setIsDetailModalVisible(false)}
                onCancel={() => setIsDetailModalVisible(false)}
            >
                <p>Email: {detailAccount.email}</p>
                <p>Full Name: {detailAccount.fullname}</p>
                <p>Phone: {detailAccount.phoneNumber}</p>
                <p>Role: {detailAccount.role}</p>
            </Modal>
        </Layout>
    );
};

export default DashBoard;
