import { CheckCircleOutlined, MinusCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { ORDER_PAYMENT_ENUM, ORDER_STATUS_ENUM } from "./OrderEnum";

export const ORDER_STATUS_TAGS = {
    [ORDER_STATUS_ENUM.NEW]: (
        <Tag icon={<SyncOutlined spin />} color="warning">
            Đơn mới
        </Tag>
    ),
    [ORDER_STATUS_ENUM.DELIVERING]: (
        <Tag icon={<SyncOutlined spin />} color="processing">
            Đang giao hàng
        </Tag>
    ),
    [ORDER_STATUS_ENUM.SUCCESS]: (
        <Tag icon={<CheckCircleOutlined />} color="success">
            Hoàn tất
        </Tag>
    ),
    [ORDER_STATUS_ENUM.CANCELED]: (
        <Tag icon={<MinusCircleOutlined />} color="error">
            Đã hủy
        </Tag>
    ),
};

export const ORDER_PAYMENT_TAGS = {
    [ORDER_PAYMENT_ENUM.COD]: <Tag color="success">COD</Tag>,
    [ORDER_PAYMENT_ENUM.ONLINE]: <Tag color="processing">Thanh toán Online</Tag>,
    [ORDER_PAYMENT_ENUM.OTHERS]: <Tag color="warning">Khác</Tag>,
};
