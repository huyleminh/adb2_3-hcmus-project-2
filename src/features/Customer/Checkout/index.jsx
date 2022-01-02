import { Form, Input, message, PageHeader, Select, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";
import ProductTable from "../../../components/ProductTable/index";
import ClientAPI from "../../../service/ClientAPI";
import "./styles.css";

CheckoutFeature.propTypes = {};

const { Option } = Select;
// const shippingFee = Math.floor(Math.random() * 40000) + 10000;

function CheckoutFeature(props) {
    const history = useHistory();
    const [checkoutInfo, setCheckoutInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = "Thanh toán";

        const fetchCheckoutInfo = async () => {
            const productInfo = JSON.parse(localStorage.getItem("cart"));
            localStorage.removeItem("cart")
            setIsLoading(true);

            try {
                const res = await ClientAPI.get("/customer/shipping-info");
                setIsLoading(false);

                if (res.status === 200) {
                    setCheckoutInfo({
                        ...res.data,
                        productInfo,
                        extra: { paymentMethod: 1, discount: "" },
                    });
                } else {
                    message.error("Phiên hết hạn hoặc có lỗi xảy ra", 1);
                    history.push("/login");
                }
            } catch (error) {
                console.log(error);
                message.error("Không thể lấy thông tin khách hàng", 1);
            }
        };

        fetchCheckoutInfo();
    }, [history]);

    const formItemLayout = {
        labelCol: {
            span: 9,
        },
        wrapperCol: {
            span: 17,
        },
    };

    const onFinish = async () => {
        const checkoutData = {
            shippingAddress: checkoutInfo.shippingAddress,
            productList: checkoutInfo.productInfo.list,
            extra: {
                paymentMethod: checkoutInfo.extra.paymentMethod,
                discount: calculateDiscountFee(),
            },
        };

        console.log(checkoutData);

        try {
            const res = await ClientAPI.post("/customer/order/checkout", checkoutData);
            if (res.status === 201) {
                history.push("/profile/history");
                return;
            }
            if (res.status === 403 || res.status === 401) {
                message.warning("Phiên hết hạn", 1);
                history.push("/login");
                return;
            }

            message.error("Không thể thực hiện mua hàng", 1);
        } catch (error) {
            console.log(error);
            message.error("Không thể thực hiện mua hàng", 1);
        }
    };

    const onChangeExtraPayment = (value) => {
        const infoClone = { ...checkoutInfo };
        infoClone.extra.paymentMethod = value;
        setCheckoutInfo(infoClone);
    };

    const onChangeExtraDiscount = (value) => {
        const infoClone = { ...checkoutInfo };
        infoClone.extra.discount = value;
        setCheckoutInfo(infoClone);
    };

    const onChangeAddress = (e) => {
        const target = e.target;
        setCheckoutInfo({ ...checkoutInfo, shippingAddress: target.value });
    };

    const calculateDiscountFee = () => {
        if (!checkoutInfo.extra) {
            return 0;
        }

        if (checkoutInfo.extra.discount === "") {
            return 0;
        }

        switch (checkoutInfo.extra.discount) {
            case "":
                return 0;
            case "discount20": {
                const discountFee = checkoutInfo.productInfo.total * 0.2;
                return discountFee > 100000 ? 100000 : discountFee;
            }
            case "discount10":
                return checkoutInfo.productInfo.total * 0.1;
            default:
                return 0;
        }
    };

    return (
        <div className="page-wrapper">
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
                    {isLoading ? (
                        <Skeleton active />
                    ) : (
                        <ProductTable
                            data={checkoutInfo.productInfo?.list}
                            pagination={3}
                            infoOnly
                        />
                    )}
                </div>
                <div className="right-part">
                    <div className="user-info">
                        {isLoading ? (
                            <Skeleton active />
                        ) : (
                            <>
                                <Form {...formItemLayout}>
                                    <Form.Item label="Tên khách hàng">
                                        <Input
                                            name="name"
                                            value={checkoutInfo.customerName}
                                            placeholder="Nhập tên"
                                            disabled
                                        ></Input>
                                    </Form.Item>
                                    <Form.Item label="Số điện thoại">
                                        <Input
                                            name="phone"
                                            value={checkoutInfo.phoneNumber}
                                            placeholder="Nhập số điện thoại"
                                            disabled
                                        ></Input>
                                    </Form.Item>
                                    <Form.Item label="Địa chỉ">
                                        <Input
                                            name="address"
                                            value={checkoutInfo.shippingAddress}
                                            placeholder="Nhập địa chỉ"
                                            onChange={onChangeAddress}
                                        ></Input>
                                    </Form.Item>
                                    <Form.Item label="Phương thức thanh toán">
                                        <Select
                                            placeholder="Chọn phương thức thanh toán"
                                            value={checkoutInfo.extra?.paymentMethod}
                                            onChange={onChangeExtraPayment}
                                        >
                                            <Option key="cod" value={1}>
                                                Tiền mặt
                                            </Option>
                                            <Option key="online" value={2}>
                                                Thanh toán trực tuyến
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Voucher">
                                        <Select
                                            placeholder="Chọn voucher"
                                            value={checkoutInfo.extra?.discount}
                                            onChange={onChangeExtraDiscount}
                                        >
                                            <Option key="discount20" value="discount20">
                                                Giảm 20% tối đa 100K
                                            </Option>
                                            <Option key="discount10" value="discount10">
                                                Giảm 10%
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                </Form>
                                <div className="summary">
                                    <span>Giá trị hóa đơn:</span>
                                    <span>
                                        <>
                                            <NumberFormat
                                                value={checkoutInfo.productInfo?.total}
                                                displayType="text"
                                                thousandSeparator
                                            />
                                            <span style={{ fontSize: "0.75em" }}> VNĐ</span>
                                        </>
                                    </span>
                                    <span>Tiền giảm:</span>
                                    <span>
                                        <>
                                            <NumberFormat
                                                value={calculateDiscountFee()}
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
                                                value={
                                                    checkoutInfo.productInfo?.total -
                                                    calculateDiscountFee()
                                                }
                                                displayType="text"
                                                thousandSeparator
                                            />
                                            <span style={{ fontSize: "0.75em" }}> VNĐ</span>
                                        </>
                                    </span>
                                </div>
                            </>
                        )}

                        <div className="btn-area">
                            <button className="checkout-btn" onClick={onFinish}>
                                Thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutFeature;
