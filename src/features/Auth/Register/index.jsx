import { faAddressCard, faLock, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../../../service/AuthService";
import ClientAPI from "../../../service/ClientAPI";
import "./styles.css";

RegisterFeature.propTypes = {};

function RegisterFeature(props) {
    const history = useHistory();

    const onSubmitRegister = async (form) => {
        const { password, confirmPassword } = form;
        if (password !== confirmPassword) {
            alert("Mật khẩu không trùng khớp");
            return;
        }

        try {
            const res = await ClientAPI.post("/auth/signup", form);

            if (res.status === 201) {
                alert("Đăng kí thành công, vui lòng đăng nhập để xác nhận");
                history.push("/login");
            } else if (res.status === 400) {
                alert(res.message);
            } else {
                throw new Error("Lỗi hệ thống, vui lòng thử lại sau giây lát");
            }
        } catch (error) {
            console.log(error);
            alert("Đã có lỗi xảy ra");
        }
    };

    useEffect(() => {
        document.title = "Đăng kí";
        AuthService.removeUser();
    }, []);

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
                                        message: "Họ và tên không được bỏ trống",
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
                                        message: "Số điện thoại không được bỏ trống",
                                    },
                                    {
                                        len: 10,
                                        message: "Số điện thoại phải đúng 10 chữ số",
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
                                message: "Tên đăng nhập không được bỏ trống",
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
                                        message: "Mật khẩu không được bỏ trống",
                                    },
                                    {
                                        min: 6,
                                        message: "Mật khẩu phải có tối thiểu 6 kí tự",
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
