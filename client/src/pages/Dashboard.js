import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccounts } from "../redux/features/accountsSlice";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Table, Modal } from "antd";
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
    const accounts = useSelector((state) => state.accounts.items); // Adjust based on your state structure
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
                <span
                    onClick={() => {
                        setIsDetailModalVisible(true);
                        setDetailAccount(record);
                    }}
                    style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "inline-block",
                        textDecoration: "none",
                    }}
                >
                    Xem Chi Tiết
                </span>

            ),
        },
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
