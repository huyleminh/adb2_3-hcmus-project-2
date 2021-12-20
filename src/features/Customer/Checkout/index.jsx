import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PageHeader, Form, Input, Select } from "antd";
import NumberFormat from "react-number-format";
import ProductTable from "../../../components/Table/index"
import "./styles.css"

CheckoutFeature.propTypes = {};

const { Option } = Select;

function CheckoutFeature(props) {
    const history = useHistory();

    const data = JSON.parse(localStorage.getItem("cart"));

    const shippingFee = Math.floor(Math.random() * 40000) + 10000;

    const [shippingInfo, setShippingInfo] = useState({});

    useEffect(() => {
        document.title = "Thanh toán";
    }, [])

    const formItemLayout = {
        labelCol: {
            span: 9
        },
        wrapperCol: {
            span: 17
        },
    };

    const onFinish = () => {
        console.log(shippingInfo);
    }

    const onChange = (form) => {
        let info = JSON.parse(JSON.stringify(shippingInfo));

        form.target ? info[form.target.name] = form.target.value : info.paymentMethod = form;

        setShippingInfo(info);
    }

    return (<div className="page-wrapper">
        <div className="header">
                <PageHeader
                    className="site-page-header"
                    onBack={() => {
                        history.push("/cart");
                    }}
                    title="Về giỏ hàng"
                />
        </div>
        <div className="container">
            <div className="left-part">
                <ProductTable
                    data={data.list}
                    pagination={3}
                    infoOnly
                />
            </div>
            <div className="right-part">
                <div className="user-info">
                    <Form {...formItemLayout}>
                        <Form.Item label="Tên khách hàng">
                            <Input name="name" placeholder="Nhập vào đây" onChange={onChange}></Input>
                        </Form.Item>
                        <Form.Item label="Số điện thoại">
                            <Input name="phone" placeholder="Nhập vào đây" onChange={onChange}></Input>
                        </Form.Item>
                        <Form.Item label="Địa chỉ">
                            <Input name="address" placeholder="Nhập vào đây" onChange={onChange}></Input>
                        </Form.Item>
                        <Form.Item label="Phương thức thanh toán">
                            <Select placeholder="Chọn phương thức thanh toán" onChange={onChange}>
                                <Option key="cod" value="COD">Tiền mặt</Option>
                                <Option key="online" value="Online Payment">Thanh toán trực tuyến</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Voucher">
                            <Input name="voucher" placeholder="Nhập vào đây" onChange={onChange}></Input>
                        </Form.Item>
                    </Form>
                    <div className="summary">
                        <span>Giá trị hóa đơn:</span>
                        <span>
                            <>
                                <NumberFormat
                                    value={data.total}
                                    displayType="text"
                                    thousandSeparator
                                />
                                <span style={{ fontSize: "0.75em" }}> VNĐ</span>
                            </>
                        </span>
                        <span>Phí giao hàng:</span>
                        <span>
                            <>
                                <NumberFormat
                                    value={shippingFee}
                                    displayType="text"
                                    thousandSeparator
                                />
                                <span style={{ fontSize: "0.75em" }}> VNĐ</span>
                            </>
                        </span>
                        <span>Tổng Tiền:</span>
                        <span>
                            <>
                                <NumberFormat
                                    value={data.total + shippingFee}
                                    displayType="text"
                                    thousandSeparator
                                />
                                <span style={{ fontSize: "0.75em" }}> VNĐ</span>
                            </>
                        </span>
                    </div>
                    <div className="btn-area">
                        <button className="checkout-btn" onClick={onFinish}>Thanh toán</button>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default CheckoutFeature;
