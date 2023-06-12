import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import HeaderComponents from '../../Components/Header'
import {
    MenuFoldOutlined,
    AuditOutlined,
    UserOutlined,
    BookOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import AdminProtected from "../../route/AdminProtected";
const { Header, Sider, Content } = Layout;


function AdminTemplate() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <div>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        items={[
                            {
                                key: "1",
                                icon: <UserOutlined />,
                                label: "Quản Lý Người Dùng",
                                children: [
                                    {
                                        key: "1.1",
                                        label: (
                                            <Link to="/user-management">Danh Sách Người Dùng</Link>
                                        ),
                                    },
                                ],
                            },
                            {
                                key: "2",
                                icon: <BookOutlined />,
                                label: "Quản Lý Khóa Học",
                                children: [
                                    {
                                        key: "2.1",
                                        label: <Link to="/course-management">Danh Sách Khóa Học</Link>,
                                    },
                                ],
                            },
                            {
                                key: "3",
                                icon: <AuditOutlined />,
                                label: "Quản Lý Ghi Danh",
                                children: [
                                    {
                                        key: "3.1",
                                        label: (
                                            <Link to="/courseRegister-management">
                                                Danh Sách Ghi Danh
                                            </Link>
                                        ),
                                    },
                                ],
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: "16px",
                                width: 64,
                                height: 64,
                            }}
                        />
                        <HeaderComponents />
                    </Header>
                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <AdminProtected>
                            <Outlet />
                        </AdminProtected>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default AdminTemplate;
