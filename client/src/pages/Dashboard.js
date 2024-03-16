import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccounts, deleteAccount } from "../redux/features/accountsSlice"; // Import action deleteAccount
import { fetchTransactions } from "../redux/features/transactionsSlice";

import {
    fetchEstates,
    deleteEstate,
    approveEstate,
    rejectEstate,
} from "../redux/features/EstatesSlice"; // Import action deleteEstate

import { useNavigate } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Table, Modal, Button } from "antd";
import { formatDistance } from "date-fns";
import {
    PieChartOutlined,
    DesktopOutlined,
    HomeOutlined,
    FileOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const DashBoard = () => {
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.accounts.items);
    const transactions = useSelector((state) => state.transactions.items);
    const estates = useSelector((state) => state.estates.estates);
    const [collapsed, setCollapsed] = useState(false);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [showTransactionsTable, setShowTransactionsTable] = useState(false);
    const [detailAccount, setDetailAccount] = useState({});
    const [showUserTable, setShowUserTable] = useState(false);
    const [showWalletPage, setShowWalletPage] = useState(false); // Add state for showing WalletPage

    const navigate = useNavigate();

    useEffect(() => {
        setShowTransactionsTable(true);
        dispatch(fetchAccounts());
        dispatch(fetchTransactions());
        dispatch(fetchEstates());
    }, [dispatch]);

    const handleMenuClick = (e) => {
        if (e.key === "2") {
            setShowUserTable(true);
            setShowTransactionsTable(false);
            setShowWalletPage(false); // Hide WalletPage when switching to user table
        } else if (e.key === "1") {
            setShowUserTable(false);
            setShowTransactionsTable(true);
            setShowWalletPage(false); // Hide WalletPage when clicking on "Thống kê lợi nhuận"
        } else if (e.key === "10") {
            // Show WalletPage when clicking on "Duyệt Bài Đăng"
            setShowUserTable(false);
            setShowTransactionsTable(false);
            setShowWalletPage(true);
        } else {
            setShowUserTable(false);
            setShowTransactionsTable(false);
            setShowWalletPage(false);
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
            console.error("Có lỗi khi xóa tài khoản:", error);
        }
    };

    const handleApproveEstate = async (estateId) => {
        try {
            await dispatch(approveEstate(estateId)); // Dispatch action to approve estate
        } catch (error) {
            console.error("Xảy ra lỗi trong quá trình duyệt bài đăng:", error);
        }
    };

    const handleRejectEstate = async (estateId) => {
        try {
            await dispatch(rejectEstate(estateId)); // Dispatch action to reject estate
        } catch (error) {
            console.error("Có lỗi trong quá trình từ chối bài đăng:", error);
        }
    };
    // Xóa Estate
    const handleDeleteEstate = async (estateId) => {
        try {
            await dispatch(deleteEstate(estateId)); // Dispatch action deleteEstate
        } catch (error) {
            console.error("Có lỗi trong quá trình xóa bài:", error);
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
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Value",
            dataIndex: "value",
            key: "value",
        },
        {
            title: "Create At",
            dataIndex: "createAt",
            key: "createAt",
            render: (value) =>
                formatDistance(new Date(value), new Date(), {
                    addSuffix: true,
                }),
        },
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
        {
            title: "Duyệt",
            key: "approve",
            render: (_, record) => (
                <Button
                    type="primary"
                    onClick={() => handleApproveEstate(record.id)}
                >
                    Duyệt
                </Button>
            ),
        },
        {
            title: "Từ Chối",
            key: "reject",
            render: (_, record) => (
                <Button
                    type="primary"
                    danger
                    onClick={() => handleRejectEstate(record.id)}
                >
                    Từ Chối
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
                    onClick={() => handleDeleteEstate(record.id)}
                >
                    Xóa
                </Button>
            ),
        },
    ];

    const items = [
        { key: "1", icon: <PieChartOutlined />, label: "Thống Kê Lợi Nhuận" },
        { key: "2", icon: <DesktopOutlined />, label: "Quản Lý Tài Khoản" },
        { key: "10", icon: <FileOutlined />, label: "Duyệt Bài Đăng" },
        {
            key: "sub2",
            icon: <HomeOutlined />,
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
                    mode="vertical"
                    items={items}
                    onClick={handleMenuClick}
                />
            </Sider>
            <Layout>
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
                        />
                    )}

                    {showWalletPage && ( // Render estates table when showWalletPage is true
                        <Table dataSource={estates} columns={estateColumns} />
                    )}
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    4Rent ©{new Date().getFullYear()} Thiết kế sử dụng Ant
                    Design
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
