import {
    CheckCircleOutlined,
    LoadingOutlined,
    MinusCircleOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import { Button, Descriptions, message, Skeleton, Spin, Tag } from "antd";
import moment from "moment";
import "moment/locale/vi";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useHistory, useParams } from "react-router-dom";
import ProductTable from "../../../../components/ProductTable";
import ClientAPI from "../../../../service/ClientAPI";
import "./styles.css";

InvoiceDetail.propTypes = {};

moment.locale("vi");

const tags = {
    1: (
        <Tag icon={<SyncOutlined spin />} color="warning">
            Đang xử lý
        </Tag>
    ),
    2: (
        <Tag icon={<SyncOutlined spin />} color="processing">
            Đang giao hàng
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

function InvoiceDetail() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        document.title = "Chi tiết đơn hàng";

        const fetchOrderHistoryDetail = async () => {
            setIsLoading(true);
            try {
                const res = await ClientAPI.get(`/customer/order-detail/${id}`);
                setIsLoading(false);

                if (res.status === 200) {
                    setData(res.data);
                } else if (res.status === 500) {
                    message.error("Không thể lấy thông tin lịch sử", 1);
                } else {
                    message.error("Phiên hết hạn hoặc có lỗi xảy ra", 1);
                    history.push("/login");
                }
            } catch (error) {
                console.log(error);
                message.error("Không thể lấy thông tin lịch sử", 1);
            }
        };

        fetchOrderHistoryDetail();
    }, [id, history]);

    const handleCancelOrder = async () => {
        try {
            const res = await ClientAPI.post("/customer/order/change-status", {
                orderId: data.orderInfo.orderId,
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
    }

    return (
        <div className="invoice-detail-container">
            <div className="invoice-information">
                <Descriptions
                    title="Chi tiết đơn hàng"
                    bordered
                    column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 3 }}
                    layout="vertical"
                >
                    <Descriptions.Item label="Mã đơn hàng" span={1}>
                        {isLoading ? <Skeleton active /> : data.orderInfo?.orderId}
                    </Descriptions.Item>
                    <Descriptions.Item label="Giá trị đơn hàng" span={1}>
                        {isLoading ? (
                            <Skeleton active />
                        ) : (
                            <>
                                <NumberFormat
                                    value={data.orderInfo?.totalPrice}
                                    displayType="text"
                                    thousandSeparator
                                />
                                <span style={{ fontSize: "0.75em" }}> VNĐ</span>
                            </>
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày lập" span={1}>
                        {isLoading ? <Skeleton active /> : data.orderInfo?.createdAt}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái đơn hàng" span={2}>
                        {isLoading ? <Skeleton active /> : tags[data.orderInfo?.status]}
                    </Descriptions.Item>
                    <Descriptions.Item label="Thao tác" span={1}>
                        {isLoading ? (
                            <Skeleton active />
                        ) : (
                            data.orderInfo?.status === 1 && <Button type="primary" danger onClick={handleCancelOrder} >Hủy đơn</Button>
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
                    <ProductTable data={data.orderDetail} pagination={3} infoOnly />
                )}
            </div>
        </div>
    );
}

export default InvoiceDetail;
