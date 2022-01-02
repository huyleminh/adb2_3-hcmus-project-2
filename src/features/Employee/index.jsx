import {
    AppstoreOutlined,
    CheckSquareOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UnorderedListOutlined,
    UserOutlined
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
    useRouteMatch
} from "react-router-dom";
import CheckinPage from "./pages/CheckinPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import OrderListPage from "./pages/OrderListPage";

const { Header, Sider, Content, Footer } = Layout;

EmployeeFeature.propTypes = {};

function EmployeeFeature(props) {
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
                    defaultSelectedKeys={[`${match.path}/orders`]}
                    selectedKeys={[location.pathname]}
                    theme="dark"
                    mode="inline"
                >
                    <Menu.Item key={`${match.path}/orders`} icon={<UnorderedListOutlined />}>
                        <Link to={`${match.path}/orders`}>Danh sách đơn hàng</Link>
                    </Menu.Item>
                    <Menu.Item key={`${match.path}/checkin`} icon={<CheckSquareOutlined />}>
                        <Link to={`${match.path}/checkin`}>Điểm danh</Link>
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
                        <Redirect exact from={`${match.path}`} to={`${match.path}/orders`} />
                        <Route path={`${match.path}/orders/:orderId`} component={OrderDetailPage} />
                        <Route exact path={`${match.path}/orders`} component={OrderListPage} />
                        <Route exact path={`${match.path}/checkin`} component={CheckinPage} />

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
                    Employee dashboard ©2021 Created by ADB2_3
                </Footer>
            </Layout>
        </Layout>
    );
}

export default EmployeeFeature;
