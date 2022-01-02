import {
    UsergroupAddOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    AppstoreAddOutlined,
    AppstoreOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import {
    Link,
    Redirect,
    Route,
    Switch,
    useHistory,
    useLocation,
    useRouteMatch,
} from "react-router-dom";
import HRM from "./pages/HRM";
import PM from "./pages/PM";
import ProductDetail from "./pages/ProductDetail";
import CreateProduct from "./pages/PM/CreateProduct";
import CreateEmployee from "./pages/HRM/CreateEmployee";

AdminFeature.propTypes = {};

const { Header, Sider, Content, Footer } = Layout;

function AdminFeature(props) {
    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();

    const [collapsed, setCollapsed] = useState(false);

    const toggleSiderbar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout className="custom-site-dashboard">
            <Sider trigger={null} collapsible collapsed={collapsed} width="300px" breakpoint="md">
                {collapsed ? (
                    <div className="logo-collapsed">
                        <span></span>
                    </div>
                ) : (
                    <div className="logo">
                        <span></span>
                    </div>
                )}
                <Menu
                    defaultSelectedKeys={[`${match.path}/human-resource-management`]}
                    selectedKeys={[location.pathname]}
                    theme="dark"
                    mode="inline"
                >
                    <Menu.Item
                        key={`${match.path}/human-resource-management`}
                        icon={<UsergroupAddOutlined />}
                    >
                        <Link to={`${match.path}/human-resource-management`}>Quản lý nhân sự</Link>
                    </Menu.Item>
                    <Menu.Item
                        key={`${match.path}/product-management`}
                        icon={<AppstoreAddOutlined />}
                    >
                        <Link to={`${match.path}/product-management`}>Quản lý sản phẩm</Link>
                    </Menu.Item>
                    <Menu.Item key={`/menu/categories`} icon={<AppstoreOutlined />}>
                        <Link to={`/menu/categories`}>Về cửa hàng</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout className="custom-site-content">
                <Header className="custom-site-content-header">
                    {collapsed ? (
                        <MenuUnfoldOutlined className="trigger" onClick={toggleSiderbar} />
                    ) : (
                        <MenuFoldOutlined className="trigger" onClick={toggleSiderbar} />
                    )}

                    <div className="custom-site-content__user">
                        <UserOutlined style={{ fontSize: "1.25rem" }} id="dashboard-user" />
                        <div className="custom-site-content__dropdown">
                            <span
                                onClick={() => {
                                    localStorage.removeItem("user");
                                    history.push("/");
                                }}
                            >
                                Đăng xuất
                            </span>
                        </div>
                    </div>
                </Header>

                <Content className="custom-site-main">
                    <Switch>
                        <Redirect
                            exact
                            from={`${match.path}`}
                            to={`${match.path}/human-resource-management`}
                        />
                        <Route
                            exact
                            path={`${match.path}/human-resource-management`}
                            component={HRM}
                        />
                        <Route exact path={`${match.path}/product-management`} component={PM} />
                        <Route
                            exact
                            path={`${match.path}/product-management/create`}
                            component={CreateProduct}
                        />
                        <Route
                            exact
                            path={`${match.path}/human-resource-management/create`}
                            component={CreateEmployee}
                        />

                        <Route
                            path={`${match.path}/product-management/:productId`}
                            component={ProductDetail}
                        />

                        <Route>
                            <Redirect to="/404" />
                        </Route>
                    </Switch>
                </Content>

                <Footer
                    style={{
                        textAlign: "center",
                        color: "#000",
                    }}
                >
                    Admin dashboard ©2021 Created by ADB2_3
                </Footer>
            </Layout>
        </Layout>
    );
}

export default AdminFeature;
