// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchAccounts } from "../redux/features/accountsSlice";
// import { useNavigate } from "react-router-dom";
// import {
//     Table,
//     Input,
//     Button,
//     Space,
//     Modal,
//     Layout,
//     Menu,
//     Breadcrumb,
// } from "antd";
// import {
//     SearchOutlined,
//     EditOutlined,
//     DeleteOutlined,
//     EyeOutlined,
//     PieChartOutlined,
//     DesktopOutlined,
//     UserOutlined,
//     TeamOutlined,
//     FileOutlined,
//     HomeOutlined,
// } from "@ant-design/icons";

// const { Header, Content, Footer, Sider } = Layout;

// const Dashboard = () => {
//     const dispatch = useDispatch();
//     const { items } = useSelector((state) => state.accounts);
//     const [collapsed, setCollapsed] = useState(false);
//     const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
//     const [detailAccount, setDetailAccount] = useState({});
//     const navigate = useNavigate();
//     const navigateHome = () => {
//         navigate("/"); // Navigate to the home page route
//     };
//     useEffect(() => {
//         dispatch(fetchAccounts());
//     }, [dispatch]);
//     const handleMenuClick = (e) => {
//         switch (e.key) {
//             case "home":
//                 navigate("/");
//                 break;
//             // Add cases for other menu items if they have specific actions
//             default:
//                 break;
//         }
//     };
//     const onCollapse = (collapsed) => {
//         setCollapsed(collapsed);
//     };

//     const showDetailModal = (record) => {
//         setDetailAccount(record);
//         setIsDetailModalVisible(true);
//     };

//     const getColumnSearchProps = (dataIndex) => ({
//         filterDropdown: ({
//             setSelectedKeys,
//             selectedKeys,
//             confirm,
//             clearFilters,
//         }) => (
//             <div style={{ padding: 8 }}>
//                 <Input
//                     autoFocus
//                     placeholder={`Search ${dataIndex}`}
//                     value={selectedKeys[0]}
//                     onChange={(e) =>
//                         setSelectedKeys(e.target.value ? [e.target.value] : [])
//                     }
//                     onPressEnter={() => confirm()}
//                     style={{ marginBottom: 8, display: "block" }}
//                 />
//                 <Space>
//                     <Button
//                         type="primary"
//                         onClick={() => confirm()}
//                         icon={<SearchOutlined />}
//                         size="small"
//                         style={{ width: 90 }}
//                     >
//                         Search
//                     </Button>
//                     <Button
//                         onClick={() => clearFilters()}
//                         size="small"
//                         style={{ width: 90 }}
//                     >
//                         Reset
//                     </Button>
//                 </Space>
//             </div>
//         ),
//         filterIcon: (filtered) => (
//             <SearchOutlined
//                 style={{ color: filtered ? "#1890ff" : undefined }}
//             />
//         ),
//         onFilter: (value, record) =>
//             record[dataIndex]
//                 ? record[dataIndex]
//                       .toString()
//                       .toLowerCase()
//                       .includes(value.toLowerCase())
//                 : "",
//     });

//     const columns = [
//         {
//             title: "Email",
//             dataIndex: "email",
//             key: "email",
//             ...getColumnSearchProps("email"),
//         },
//         {
//             title: "Full Name",
//             dataIndex: "fullname",
//             key: "fullname",
//             ...getColumnSearchProps("fullname"),
//         },
//         {
//             title: "Role",
//             dataIndex: "role",
//             key: "role",
//             ...getColumnSearchProps("role"),
//         },
//         {
//             title: "Action",
//             key: "action",
//             render: (_, record) => (
//                 <Space size="middle">
//                     <Button
//                         icon={<EyeOutlined />}
//                         onClick={() => showDetailModal(record)}
//                     />
//                     <Button icon={<EditOutlined />} />
//                     <Button icon={<DeleteOutlined />} />
//                 </Space>
//             ),
//         },
//     ];

//     return (
//         <Layout style={{ minHeight: "100vh" }}>
//             <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
//                 <div className="logo" />
//                 <Menu
//                     theme="dark"
//                     defaultSelectedKeys={["1"]}
//                     mode="inline"
//                     onClick={handleMenuClick}
//                     items={[
//                         {
//                             key: "1",
//                             icon: <PieChartOutlined />,
//                             label: "Option 1",
//                         },
//                         {
//                             key: "2",
//                             icon: <DesktopOutlined />,
//                             label: "Manage Account",
//                         },
//                         {
//                             key: "sub1",
//                             icon: <UserOutlined />,
//                             label: "User",
//                             children: [
//                                 { key: "3", label: "Tom" },
//                                 { key: "4", label: "Bill" },
//                                 { key: "5", label: "Alex" },
//                             ],
//                         },
//                         {
//                             key: "sub2",
//                             icon: <TeamOutlined />,
//                             label: "Team",
//                             children: [
//                                 { key: "6", label: "Team 1" },
//                                 { key: "8", label: "Team 2" },
//                             ],
//                         },
//                         { key: "9", icon: <FileOutlined />, label: "Files" },
//                         {
//                             key: "home",
//                             icon: <HomeOutlined />,
//                             label: "Back to Home Page",
//                             onClick: navigateHome,
//                         },
//                     ]}
//                 />
//             </Sider>
//             <Layout className="site-layout">
//                 <Header
//                     className="site-layout-background"
//                     style={{ padding: 0 }}
//                 />
//                 <Content style={{ margin: "0 16px" }}>
//                     <Breadcrumb style={{ margin: "16px 0" }}>
//                         <Breadcrumb.Item>User</Breadcrumb.Item>
//                         <Breadcrumb.Item>Bill</Breadcrumb.Item>
//                     </Breadcrumb>
//                     <div
//                         style={{
//                             padding: 24,
//                             background: "#fff",
//                             minHeight: 360,
//                         }}
//                     >
//                         <Table columns={columns} dataSource={items} />
//                     </div>
//                 </Content>
//                 <Footer style={{ textAlign: "center" }}>
//                     4Rent ©{new Date().getFullYear()} Created by Mint
//                 </Footer>
//             </Layout>
//             <Modal
//                 title="Account Details"
//                 visible={isDetailModalVisible}
//                 onOk={() => setIsDetailModalVisible(false)}
//                 onCancel={() => setIsDetailModalVisible(false)}
//             >
//                 <p>Phone | {detailAccount.phoneNumber}</p>
//                 <p>Email | {detailAccount.email}</p>
//                 <p>Full Name | {detailAccount.fullname}</p>
//                 <p>Role | {detailAccount.role}</p>
//             </Modal>
//         </Layout>
//     );
// };

// export default Dashboard;

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

const App = () => {
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
            // Assuming '2' is the key for "Manage Account"
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
                <span
                    onClick={() => {
                        setIsDetailModalVisible(true);
                        setDetailAccount(record);
                    }}
                >
                    View Details
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

export default App;
