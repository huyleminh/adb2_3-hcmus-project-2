import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Form, Input, Typography } from "antd";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../../../service/AuthService";
import ClientAPI from "../../../service/ClientAPI";
import "./styles.css";

LoginFeature.propTypes = {};

function LoginFeature(props) {
    const history = useHistory();

    const onSubmitLogin = async (form) => {
        try {
            const res = await ClientAPI.post("/auth/login", form);

            if (res.status === 200) {
                const data = res.data;
                AuthService.setUser(data);
                history.push("/");
            } else if (res.status === 400) {
                alert("Vui lòng nhập tài khoản và mật khẩu hợp lệ");
            } else if (res.status === 401) {
                alert("Tài khoản hoặc mật khẩu không đúng");
            } else {
                throw new Error("Lỗi hệ thống, vui lòng thử lại sau giây lát");
            }
        } catch (error) {
            console.log(error);
            alert("Đã có lỗi xảy ra");
        }
    };

    useEffect(() => {
        AuthService.removeUser();
        document.title = "Đăng nhập";
    }, []);

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
                            {
                                min: 6,
                                message: "Mật khẩu phải có tối thiểu 6 kí tự",
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
