import {
    faHome,
    faShoppingCart,
    faSignInAlt,
    faSignOutAlt,
    faUser,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Menu } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import AuthService from "../../service/AuthService";
import "./styles.css";

AppHeader.propTypes = {};

function AppHeader(props) {
    const location = useLocation();
    const path = location.pathname.split("/");

    const role = AuthService.getUserRole();
    const isLogin = AuthService.isLogin();

    return (
        <div className="navigation-bar">
            <div className="navigation-left">
                <span>
                    <Link to="/menu/categories">ADB2_3 Project 2</Link>
                </span>
                <Menu selectedKeys={path[1]} mode="horizontal">
                    <Menu.Item key="menu" icon={<FontAwesomeIcon icon={faHome} />}>
                        <Link to="/menu/categories">Sản phẩm</Link>
                    </Menu.Item>
                    <Menu.Item key="cart" icon={<FontAwesomeIcon icon={faShoppingCart} />}>
                        <Link to="/cart">Giỏ hàng</Link>
                    </Menu.Item>
                </Menu>
            </div>
            <div className="navigation-right">
                <Menu selectedKeys={path[1]} mode="horizontal">
                    {isLogin && role === 1 && (
                        <Menu.Item key="admin" icon={<FontAwesomeIcon icon={faUser} />}>
                            <Link to="/admin">Trang quản trị</Link>
                        </Menu.Item>
                    )}

                    {isLogin && role === 2 && (
                        <Menu.Item key="manager" icon={<FontAwesomeIcon icon={faUser} />}>
                            <Link to="/manager">Trang quản lý</Link>
                        </Menu.Item>
                    )}

                    {isLogin && role === 3 && (
                        <Menu.Item key="employee" icon={<FontAwesomeIcon icon={faUser} />}>
                            <Link to="/employee">Trang nhân viên</Link>
                        </Menu.Item>
                    )}

                    {isLogin && (
                        <>
                            <Menu.Item key="profile" icon={<FontAwesomeIcon icon={faUser} />}>
                                <Link to="/profile">Hồ sơ người dùng</Link>
                            </Menu.Item>

                            <Menu.Item key="logout">
                                <Button
                                    icon={<FontAwesomeIcon icon={faSignOutAlt} />}
                                    onClick={() => {
                                        localStorage.removeItem("user");
                                        window.location.reload();
                                    }}
                                    type="text"
                                >
                                    Đăng xuất
                                </Button>
                            </Menu.Item>
                        </>
                    )}

                    {!isLogin && (
                        <>
                            <Menu.Item key="login" icon={<FontAwesomeIcon icon={faSignInAlt} />}>
                                <Link to="/login">Đăng nhập</Link>
                            </Menu.Item>
                            <Menu.Item key="signup" icon={<FontAwesomeIcon icon={faUserPlus} />}>
                                <Link to="/register">Đăng ký</Link>
                            </Menu.Item>
                        </>
                    )}
                </Menu>
            </div>
        </div>
    );
}

export default AppHeader;
