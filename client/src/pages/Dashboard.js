import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccounts, deleteAccount } from "../redux/features/accountsSlice"; // Import action deleteAccount
import { fetchTransactions } from "../redux/features/transactionsSlice";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Table, Modal, Button } from "antd";
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
    const transactions = useSelector((state) => state.transactions.items);
    const [collapsed, setCollapsed] = useState(false);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [showTransactionsTable, setShowTransactionsTable] = useState(false);
    const [detailAccount, setDetailAccount] = useState({});
    const [showUserTable, setShowUserTable] = useState(false);
    const [estates, setEstates] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchAccounts());
        dispatch(fetchTransactions());
    }, [dispatch]);

    const handleMenuClick = (e) => {
        if (e.key === "2") {
            setShowUserTable(true);
            setShowTransactionsTable(false); // Hide transaction table when switching to user table
        } else if (e.key === "1") {
            setShowUserTable(false);
            setShowTransactionsTable(true); // Show transaction table when clicking on "Thống kê lợi nhuận"
        } else {
            setShowUserTable(false);
            setShowTransactionsTable(false);
        }

        if (e.key === "sub2") {
            navigate("/");
        }
    };

    // Thay thế phần xóa tài khoản bằng action deleteAccount
    const handleDeleteAccount = async (accountId) => {
        try {
            await dispatch(deleteAccount(accountId)); // Dispatch action deleteAccount
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    const columns = [
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Họ và Tên",
            dataIndex: "fullname",
            key: "fullname",
        },
        {
            title: "Số Điện Thoại",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Vai Trò",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Button
                    type="primary"
                    onClick={() => {
                        setIsDetailModalVisible(true);
                        setDetailAccount(record);
                    }}
                >
                    Xem Chi Tiết
                </Button>
            ),
        },
        {
            title: "Xóa",
            key: "delete",
            render: (_, record) => (
                <Button
                    type="primary"
                    danger
                    onClick={() => handleDeleteAccount(record.id)}
                >
                    Xóa
                </Button>
            ),
        },
    ];

    const transactionColumns = [
        {
            title: "Giá Trị",
            dataIndex: "value",
            key: "value",
        },
        {
            title: "ID Tài Khoản Gửi",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Vai Trò Người Gửi",
            dataIndex: "user.role",
            key: "user.role",
        },
        {
            title: "Ngày Tạo",
            dataIndex: "createAt",
            key: "createAt",
            render: (text) => {
                // Format the date here if needed
                return <span>{text}</span>;
            },
        },
        // Add other columns as needed
    ];
    const estateColumns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },
        // Add more columns based on your data structure
    ];

    const items = [
        { key: "1", icon: <PieChartOutlined />, label: "Thống Kê Lợi Nhuận" },
        { key: "2", icon: <DesktopOutlined />, label: "Quản Lý Tài Khoản" },
        { key: "10", icon: <FileOutlined />, label: "Duyệt Bài Đăng" },
        {
            key: "sub2",
            icon: <TeamOutlined />,
            label: "Trở về Trang Chính",
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
                    {showTransactionsTable && (
                        <Table
                            dataSource={transactions}
                            columns={transactionColumns}
                        /> // Render transactions table when showTransactionsTable is true
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
