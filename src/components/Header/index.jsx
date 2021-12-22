import { faHome, faShoppingCart, faUser, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.css"

AppHeader.propTypes = {};

function AppHeader(props) {
    const location = useLocation();
    const path = location.pathname.split("/");
    return (
        <div className="navigation-bar">
            <div className="navigation-left">
                <span><Link to="/menu/categories">ADB2_3 Project 2</Link></span>
                <Menu selectedKeys={path[1]} mode="horizontal">
                    <Menu.Item key="menu" icon={<FontAwesomeIcon icon={faHome} />}>
                        <Link to="/menu/categories">Sản phẩm</Link>
                    </Menu.Item>
                    <Menu.Item key="profile" icon={<FontAwesomeIcon icon={faUser} />}>
                        <Link to="/profile">Hồ sơ người dùng</Link>
                    </Menu.Item>
                    <Menu.Item key="cart" icon={<FontAwesomeIcon icon={faShoppingCart} />}>
                        <Link to="/cart">Giỏ hàng</Link>
                    </Menu.Item>
                </Menu>
            </div>
            <div className="navigation-right">
                <Menu mode="horizontal">
                    <Menu.Item key="login" icon={<FontAwesomeIcon icon={faSignInAlt} />}>
                        <Link to="/login">Đăng nhập</Link>
                    </Menu.Item>
                    <Menu.Item key="signup" icon={<FontAwesomeIcon icon={faSignOutAlt} />}>
                        <Link to="/register">Đăng ký</Link>
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    );
}

export default AppHeader;
