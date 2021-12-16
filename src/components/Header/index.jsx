import { faHome, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";

AppHeader.propTypes = {};

function AppHeader(props) {
    const location = useLocation();
    const path = location.pathname.split("/");
    return (
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
    );
}

export default AppHeader;
