import React from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { Avatar, Layout } from "antd";
import { UserOutlined } from '@ant-design/icons';
import ProfileDetail from "./ProfileDetail"
import "./styles.css"
import InvoiceHistory from "./InvoiceHistory";
import InvoiceDetail from "./InvoiceDetail";

ProfileFeature.propTypes = {};

function ProfileFeature(props) {
    const url = useRouteMatch();
    return (
    <div className="page-wrapper">
        <div className="profile-container">
            <div className="profile-left-part">
                <div className="profile-sidebar">
                    <Avatar
                        style={{width: "14vw", height: "14vw", lineHeight: "14vw", fontSize: "7vw"}}
                        icon={<UserOutlined />}
                    />
                    <ul>
                        <li>
                            <Link to="/profile">Hồ sơ của tôi</Link>
                        </li>
                        <li>
                            <Link to="/profile/history">Lịch sử đơn hàng</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="profile-right-part">
                <div className="profile-content">
                    <Layout>
                        <Switch>
                            <Route exact path={`${url.path}`} component={ProfileDetail}/>
                            <Route exact path={`${url.path}/history`} component={InvoiceHistory}/>
                            <Route path={`${url.path}/history/:id`} component={InvoiceDetail}/>
                        </Switch>
                    </Layout>
                </div>
            </div>
        </div>
    </div>);
}

export default ProfileFeature;
