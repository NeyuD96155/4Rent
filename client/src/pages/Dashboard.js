import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchAccounts, deleteAccount } from "../redux/features/accountsSlice"; // Import action deleteAccount
import { fetchTransactions } from "../redux/features/transactionsSlice";

import {
    fetchEstates,
    deleteEstate,
    approveEstate,
    rejectEstate,
} from "../redux/features/estatesSlice"; // Import action deleteEstate

import { useNavigate } from "react-router-dom";
import {
    Layout,
    Menu,
    Breadcrumb,
    Table,
    Modal,
    Button,
    Avatar,
    Switch,
} from "antd";
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
    const [estateData, setEstateData] = useState([]); // Khởi tạo state estateData

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

    useEffect(() => {
        setEstateData(estates);
    }, [estates]);

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
            toast.success("Xóa tài khoản thành công!");
        } catch (error) {
            console.error("Có lỗi khi xóa tài khoản:", error);
        }
    };

    const handleApproveEstate = async (estateId) => {
        try {
            await dispatch(approveEstate(estateId));
            setEstateData((prevState) =>
                prevState.map((estate) =>
                    estate.id === estateId
                        ? { ...estate, estateStatus: "APPROVED" }
                        : estate
                )
            );
            toast.success("Duyệt timeshare thành công!");
        } catch (error) {
            console.error("Xảy ra lỗi trong quá trình duyệt timeshare:", error);
        }
    };

    const handleRejectEstate = async (estateId) => {
        try {
            await dispatch(rejectEstate(estateId));
            setEstateData((prevState) =>
                prevState.map((estate) =>
                    estate.id === estateId
                        ? { ...estate, estateStatus: "REJECTED" }
                        : estate
                )
            );
            toast.success("Đã từ chối duyệt timeshare!");
        } catch (error) {
            console.error("Có lỗi trong quá trình từ chối timeshare:", error);
        }
    };

    const handleDeleteEstate = async (estateId) => {
        try {
            await dispatch(deleteEstate(estateId));
            toast.success("Xóa timeshare thành công!");
            setEstateData((prevState) =>
                prevState.filter((estate) => estate.id !== estateId)
            );
        } catch (error) {
            console.error("Có lỗi trong quá trình xóa timeshare:", error);
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
            title: "Người đặt",
            dataIndex: "to",
            key: "username",
            render: (user) => user.users.fullname,
        },
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
            title: "Tên TimeShare",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Ảnh",
            key: "avatar",
            render: (_, record) => <Avatar src={record.resources[0].url} />,
        },

        {
            title: "Mô Tả",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Số Người",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Trạng Thái",
            dataIndex: "estateStatus",
            key: "estateStatus",
        },
        {
            title: "Duyệt/Từ Chối",
            key: "switch",
            render: (_, record) => (
                <Switch
                    checkedChildren=""
                    unCheckedChildren=""
                    checked={record.estateStatus === "APPROVED"}
                    onChange={(checked) => {
                        if (checked) {
                            handleApproveEstate(record.id);
                        } else {
                            handleRejectEstate(record.id);
                        }
                    }}
                />
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
                        <Table
                            dataSource={estateData}
                            columns={estateColumns}
                        />
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
