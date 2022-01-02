import {
    CheckCircleOutlined,
    FilterOutlined,
    MinusCircleOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Divider, Form, message, Select, Table, Tag, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { Link, useHistory } from "react-router-dom";
import ClientAPI from "../../../../service/ClientAPI";
import EmployeeConst from "../../shared/EmployeeConst";

moment.locale("vi");

OrderListPage.propTypes = {};

function OrderListPage(props) {
    const [loading, setLoading] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const history = useHistory();
    const [filterForm] = useForm();
    const [filter, setFilter] = useState({
        status: EmployeeConst.ORDER_STATUS.NEW,
        date: {
            fromDate: moment(new Date(), "DD/MM/YYYY"),
            toDate: moment(new Date(), "DD/MM/YYYY"),
        },
    });

    const columnsConfig = [
        {
            title: "#",
            dataIndex: "no",
            key: "no",
            fixed: "left",
            width: 50,
        },
        {
            title: "Mã đơn hàng",
            dataIndex: "orderId",
            key: "orderId",
            fixed: "left",
            width: 100,
        },
        {
            title: "Ngày lập",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => {
                return moment(date).utcOffset(0).format("DD/MM/YYYY HH:mm:ss");
            },
        },
        {
            title: "Phương thức thanh toán",
            dataIndex: "paymentMethod",
            key: "paymentMethod",
            render: (paymentMethod) => {
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
            },
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                if (status === EmployeeConst.ORDER_STATUS.NEW) {
                    return (
                        <Tag icon={<SyncOutlined spin />} color="warning">
                            Đơn mới
                        </Tag>
                    );
                }

                if (status === EmployeeConst.ORDER_STATUS.DELIVERING) {
                    return (
                        <Tag icon={<SyncOutlined spin />} color="processing">
                            Đang giao
                        </Tag>
                    );
                }

                if (status === EmployeeConst.ORDER_STATUS.SUCCESS) {
                    return (
                        <Tag icon={<CheckCircleOutlined />} color="success">
                            Hoàn tất
                        </Tag>
                    );
                }

                return (
                    <Tag icon={<MinusCircleOutlined />} color="error">
                        Đã hủy
                    </Tag>
                );
            },
        },
        {
            title: "Giá giảm",
            dataIndex: "discount",
            key: "discount",
            render: (discount) => {
                return (
                    <>
                        <NumberFormat value={discount} displayType="text" thousandSeparator />
                        <span style={{ fontSize: "0.75em" }}> VNĐ</span>
                    </>
                );
            },
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (totalPrice) => {
                return (
                    <>
                        <NumberFormat value={totalPrice} displayType="text" thousandSeparator />
                        <span style={{ fontSize: "0.75em" }}> VNĐ</span>
                    </>
                );
            },
        },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            fixed: "right",
            width: 125,
            render: (link) => {
                return (
                    <Button type="primary">
                        <Link to={link}>Chi tiết</Link>
                    </Button>
                );
            },
        },
    ];

    const handleFilterOrder = (form) => {
        setFilter({ status: form.status, date: { fromDate: form.date[0], toDate: form.date[1] } });
    };

    useEffect(() => {
        document.title = "Nhân viên | Danh sách đơn hàng";
        const fetchOrder = async () => {
            setLoading(true);

            try {
                console.log(filter.date.fromDate);
                const mappedDate = {
                    fromDate: filter.date.fromDate.format("YYYY-MM-DD"),
                    toDate: filter.date.toDate.format("YYYY-MM-DD"),
                };
                const res = await ClientAPI.get(
                    `/employee/orders?status=${filter.status}&fromDate=${mappedDate.fromDate}&toDate=${mappedDate.toDate}`
                );
                setLoading(false);

                if (res.status === 200) {
                    setOrderList(res.data);
                } else if (res.status === 500) {
                    message.error("Không thể lấy danh sách đơn hàng", 1);
                } else {
                    message.error("Phiên hết hạn hoặc có lỗi xảy ra", 1);
                    history.push("/login");
                }
            } catch (error) {
                console.log(error);
                message.error("Không thể lấy danh sách đơn hàng", 1);
            }
        };

        fetchOrder();
    }, [filter, history]);

    const dataSource = orderList.map((item, index) => {
        return {
            key: item.orderId,
            no: index + 1,
            orderId: item.orderId,
            createdAt: item.createdAt,
            paymentMethod: item.paymentMethod,
            status: item.status,
            discount: item.discount,
            totalPrice: item.totalPrice,
            action: `/employee/orders/${item.orderId}`,
        };
    });

    return (
        <div style={{ padding: "20px" }}>
            <Form
                layout="inline"
                form={filterForm}
                initialValues={{
                    status: filter.status,
                    date: [filter.date.fromDate, filter.date.toDate],
                }}
                onFinish={handleFilterOrder}
            >
                <Form.Item
                    label={<Typography.Text strong>Trạng thái</Typography.Text>}
                    name="status"
                >
                    <Select style={{ width: 200 }}>
                        <Select.Option value={EmployeeConst.ORDER_STATUS.NEW}>
                            Đơn mới
                        </Select.Option>
                        <Select.Option value={EmployeeConst.ORDER_STATUS.DELIVERING}>
                            Đang vận chuyển
                        </Select.Option>
                        <Select.Option value={EmployeeConst.ORDER_STATUS.SUCCESS}>
                            Đã hoàn tất
                        </Select.Option>
                        <Select.Option value={EmployeeConst.ORDER_STATUS.CANCEL}>
                            Đã hủy
                        </Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<Typography.Text strong>Giới hạn ngày lập</Typography.Text>}
                    name="date"
                    rules={[{ required: true, message: "Date cannot empty" }]}
                >
                    <DatePicker.RangePicker></DatePicker.RangePicker>
                </Form.Item>

                <Button type="primary" htmlType="submit" icon={<FilterOutlined />}>
                    Lọc
                </Button>
            </Form>

            <Divider orientation="left">Danh sách đơn hàng</Divider>

            <Table
                bordered
                loading={loading}
                dataSource={dataSource}
                columns={columnsConfig}
                pagination={{
                    position: ["bottomCenter"],
                    pageSize: 15,
                    total: orderList.length,
                }}
                scroll={{ x: 1000, y: 500 }}
            />
        </div>
    );
}

export default OrderListPage;
