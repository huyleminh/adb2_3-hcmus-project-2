import { faAddressCard, faLock, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import React from "react";
import "./styles.css";

RegisterFeature.propTypes = {};

function RegisterFeature(props) {
    const onSubmitRegister = (form) => {
        console.log(form);
    };

    return (
        <div className="register-wrapper">
            <div className="register-form">
                <Typography.Title level={3} style={{ textAlign: "center" }}>
                    Đăng ký
                </Typography.Title>

                <Form
                    name="register-form"
                    layout="vertical"
                    onFinish={onSubmitRegister}
                    autoComplete="off"
                >
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                label="Họ và tên"
                                name="fullname"
                                rules={[
                                    {
                                        required: true,
                                        message: "Họ và tên không được bỏ trống!",
                                    },
                                ]}
                            >
                                <Input prefix={<FontAwesomeIcon icon={faUser} />} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Số điện thoại"
                                name="phoneNumber"
                                rules={[
                                    {
                                        required: true,
                                        message: "Số điện thoại không được bỏ trống!",
                                    },
                                ]}
                            >
                                <Input prefix={<FontAwesomeIcon icon={faPhone} />} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label="Địa chỉ" name="address" rules={[]}>
                        <Input prefix={<FontAwesomeIcon icon={faAddressCard} />} />
                    </Form.Item>

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

                    <Row gutter={[16, 16]}>
                        <Col span={12}>
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
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Xác nhận mật khẩu"
                                name="confirmPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: "Xác nhận mật khẩu không được bỏ trống!",
                                    },
                                ]}
                            >
                                <Input.Password prefix={<FontAwesomeIcon icon={faLock} />} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Button type="primary" htmlType="submit" block>
                        Đăng ký
                    </Button>

                    <Divider type="horizontal" orientation="center" plain>
                        Đã có tài khoản?
                    </Divider>

                    <Button href="/login" type="default" htmlType="button" block>
                        Đăng nhập tại đây!
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default RegisterFeature;
