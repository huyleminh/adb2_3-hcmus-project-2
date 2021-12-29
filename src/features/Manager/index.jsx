import {
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
import BestSellingPage from "./pages/BestSelling";
import RevenuePage from "./pages/Revenue";

const { Header, Sider, Content, Footer } = Layout;

ManagerFeature.propTypes = {};

function ManagerFeature(props) {
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
                    defaultSelectedKeys={[`${match.path}/statistic`]}
                    selectedKeys={[location.pathname]}
                    theme="dark"
                    mode="inline"
                >
                    <Menu.Item
                        key={`${match.path}/statistic/revenue`}
                        icon={<UnorderedListOutlined />}
                    >
                        <Link to={`${match.path}/statistic/revenue`}>Thống kê doanh thu</Link>
                    </Menu.Item>
                    <Menu.Item
                        key={`${match.path}/statistic/best-selling`}
                        icon={<CheckSquareOutlined />}
                    >
                        <Link to={`${match.path}/statistic/best-selling`}>
                            Thống kê sản phẩm bán chạy
                        </Link>
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
                            to={`${match.path}/statistic/revenue`}
                        />

                        <Route
                            exact
                            path={`${match.path}/statistic/revenue`}
                            component={RevenuePage}
                        />

                        <Route
                            exact
                            path={`${match.path}/statistic/best-selling`}
                            component={BestSellingPage}
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
                    Employee dashboard ©2021 Created by ADB2_3
                </Footer>
            </Layout>
        </Layout>
    );
}

export default ManagerFeature;
