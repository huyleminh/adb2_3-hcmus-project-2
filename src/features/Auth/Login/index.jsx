import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Form, Input, Typography } from "antd";
import React from "react";
import "./styles.css";

LoginFeature.propTypes = {};

function LoginFeature(props) {
    const onSubmitLogin = (form) => {
        console.log(form);
    };

    return (
        <div className="login-wrapper">
            <div className="login-form">
                <Typography.Title level={3} style={{ textAlign: "center" }}>
                    Đăng nhập
                </Typography.Title>
                <Form
                    name="login-form"
                    layout="vertical"
                    size="large"
                    onFinish={onSubmitLogin}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên đăng nhập"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Tên đăng nhập không được bỏ trống!",
                            },
                        ]}
                    >
                        <Input prefix={<FontAwesomeIcon icon={faUser} />} />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Mật khẩu không được bỏ trống!",
                            },
                        ]}
                    >
                        <Input.Password prefix={<FontAwesomeIcon icon={faLock} />} />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                        Đăng nhập
                    </Button>

                    <Divider type="horizontal" orientation="center" plain>
                        Hoặc
                    </Divider>

                    <Button href="/register" type="default" htmlType="button" block>
                        Đăng ký tại đây!
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default LoginFeature;
