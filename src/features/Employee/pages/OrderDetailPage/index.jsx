import {
    CheckCircleOutlined,
    LoadingOutlined,
    MinusCircleOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import { Button, Descriptions, message, Skeleton, Space, Spin, Tag } from "antd";
import moment from "moment";
import "moment/locale/vi";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useHistory, useParams } from "react-router-dom";
import ProductTable from "../../../../components/ProductTable";
import ClientAPI from "../../../../service/ClientAPI";
import EmployeeConst from "../../shared/EmployeeConst";
import "./styles.css";

OrderDetailPage.propTypes = {};

moment.locale("vi");

const tags = {
    1: (
        <Tag icon={<SyncOutlined spin />} color="warning">
            Đơn mới
        </Tag>
    ),
    2: (
        <Tag icon={<SyncOutlined spin />} color="processing">
            Đang giao
        </Tag>
    ),
    3: (
        <Tag icon={<CheckCircleOutlined />} color="success">
            Hoàn tất
        </Tag>
    ),

    4: (
        <Tag icon={<MinusCircleOutlined />} color="error">
            Đã hủy
        </Tag>
    ),
};

function OrderDetailPage(props) {
    const { orderId } = useParams();
    const [order, setOrder] = useState({});
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Nhân viên | Chi tiết đơn hàng";

        const fetchOrderDetail = async () => {
            setIsLoading(true);
            try {
                const res = await ClientAPI.get(`/employee/order-detail/${orderId}`);
                setIsLoading(false);

                if (res.status === 200) {
                    setOrder(res.data);
                } else if (res.status === 400) {
                    message.error(res.message, 1);
                    setTimeout(() => {
                        history.push("../");
                    }, 500);
                } else if (res.status === 500) {
                    message.error("Không thể lấy chi tiết đơn hàng", 1);
                } else {
                    message.error("Phiên hết hạn hoặc có lỗi xảy ra", 1);
                    history.push("/login");
                }
            } catch (error) {
                console.log(error);
                message.error("Không thể lấy chi tiết đơn hàng", 1);
            }
        };

        fetchOrderDetail();
    }, [orderId, history]);

    const handleCancelOrder = async () => {
        try {
            const res = await ClientAPI.post("/employee/order/confirm", {
                orderId: order.orderInfo.orderId,
                status: 4,
            });

            console.log(res);
            if (res.status === 201) {
                message.success("Hủy đơn hàng thành công", 1);
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else if (res.status === 500) {
                message.error("Không thể hủy đơn hàng", 1);
            } else {
                message.error("Phiên hết hạn hoặc có lỗi xảy ra", 1);
                history.push("/login");
            }
        } catch (error) {
            console.log(error);
            message.error("Không thể hủy đơn hàng", 1);
        }
    };

    const handleVerifyOrder = async () => {
        try {
            const res = await ClientAPI.post("/employee/order/confirm", {
                orderId: order.orderInfo.orderId,
                status: 2,
            });

            console.log(res);
            if (res.status === 201) {
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else if (res.status === 500) {
                message.error("Không thể xác nhận đơn hàng", 1);
            } else {
                message.error("Phiên hết hạn hoặc có lỗi xảy ra", 1);
                history.push("/login");
            }
        } catch (error) {
            console.log(error);
            message.error("Không thể xác nhận đơn hàng", 1);
        }
    };

    const handleFinishOrder = async () => {
        try {
            const res = await ClientAPI.post("/employee/order/confirm", {
                orderId: order.orderInfo.orderId,
                status: 3,
            });

            console.log(res);
            if (res.status === 201) {
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else if (res.status === 500) {
                message.error("Không thể hoàn thành đơn hàng", 1);
            } else {
                message.error("Phiên hết hạn hoặc có lỗi xảy ra", 1);
                history.push("/login");
            }
        } catch (error) {
            console.log(error);
            message.error("Không thể hoàn thành đơn hàng", 1);
        }
    };

    const mappedPaymentMethod = (paymentMethod) => {
        switch (paymentMethod) {
            case 1:
                return <Tag color="success">COD</Tag>;
            case 2:
                return <Tag color="processing">Thanh toán Online</Tag>;
            case 3:
                return <Tag color="warning">Khác</Tag>;
            default:
                return <Tag color="error">Lỗi</Tag>;
        }
    };

    const mappedButtons = (status) => {
        switch (status) {
            case EmployeeConst.ORDER_STATUS.NEW:
                return (
                    <Space direction="horizontal">
                        <Button type="primary" onClick={handleVerifyOrder}>
                            Xác nhận và giao hàng
                        </Button>
                        <Button type="primary" danger onClick={handleCancelOrder}>
                            Hủy đơn
                        </Button>
                    </Space>
                );
            case EmployeeConst.ORDER_STATUS.DELIVERING:
                return (
                    <Button type="primary" onClick={handleFinishOrder}>
                        Xác nhận đã giao
                    </Button>
                );
            case EmployeeConst.ORDER_STATUS.SUCCESS:
            case EmployeeConst.ORDER_STATUS.CANCEL:
                return <></>;
            default:
                return <Tag color="warning">Lỗi</Tag>;
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <div className="invoice-information">
                <Descriptions
                    title="Chi tiết đơn hàng"
                    bordered
                    column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 3 }}
                    layout="vertical"
                >
                    <Descriptions.Item label="Mã đơn hàng" span={1}>
                        {isLoading ? <Skeleton active /> : order.orderInfo?.orderId}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tên khách hàng" span={1}>
                        {isLoading ? <Skeleton active /> : order.orderInfo?.customerName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phương thức thanh toán" span={1}>
                        {isLoading ? (
                            <Skeleton active />
                        ) : (
                            order.orderInfo?.paymentMethod &&
                            mappedPaymentMethod(order.orderInfo.paymentMethod)
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày lập" span={1}>
                        {isLoading ? (
                            <Skeleton active />
                        ) : (
                            order.orderInfo?.createdAt &&
                            moment(order.orderInfo.createdAt)
                                .utcOffset(0)
                                .format("DD/MM/YYYY HH:mm:ss")
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Giá trị đơn hàng" span={1}>
                        {isLoading ? (
                            <Skeleton active />
                        ) : (
                            <>
                                <NumberFormat
                                    value={order.orderInfo?.totalPrice}
                                    displayType="text"
                                    thousandSeparator
                                />
                                <span style={{ fontSize: "0.75em" }}> VNĐ</span>
                            </>
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Giá giảm" span={1}>
                        {isLoading ? (
                            <Skeleton active />
                        ) : (
                            <>
                                <NumberFormat
                                    value={order.orderInfo?.discount}
                                    displayType="text"
                                    thousandSeparator
                                />
                                <span style={{ fontSize: "0.75em" }}> VNĐ</span>
                            </>
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái đơn hàng" span={2}>
                        {isLoading ? <Skeleton active /> : tags[order.orderInfo?.status]}
                    </Descriptions.Item>
                    <Descriptions.Item label="Thao tác" span={1}>
                        {isLoading ? (
                            <Skeleton active />
                        ) : (
                            order.orderInfo?.status && mappedButtons(order.orderInfo?.status)
                        )}
                    </Descriptions.Item>
                </Descriptions>
            </div>
            <div className="invoice-detail-table">
                {isLoading ? (
                    <div className="loading">
                        <Spin
                            tip="Đang tải dữ liệu"
                            indicator={
                                <LoadingOutlined style={{ fontSize: 100, margin: 50 }} spin />
                            }
                        />
                    </div>
                ) : (
                    <ProductTable data={order.orderDetail} pagination={3} infoOnly />
                )}
            </div>
        </div>
    );
}

export default OrderDetailPage;
