import { Button, Divider, Select, Space, Table, Tag, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployeeConst from "../../shared/EmployeeConst";

OrderListPage.propTypes = {};

function OrderListPage(props) {
    const [loading, setLoading] = useState(false);

    const columnsConfig = [
        {
            title: "#",
            dataIndex: "no",
            key: "no",
            fixed: "left",
            width: 50,
        },
        {
            title: "Tên khách hàng",
            dataIndex: "customerName",
            key: "customerName",
            fixed: "left",
            width: 180,
        },
        {
            title: "Ngày lập",
            dataIndex: "createdDate",
            key: "createdDate",
        },
        {
            title: "Phương thức thanh toán",
            dataIndex: "paymentMethod",
            key: "paymentMethod",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                if (status === EmployeeConst.ORDER_STATUS.NEW) {
                    return <Tag color="#2db7f5">Đơn mới</Tag>;
                }

                if (status === EmployeeConst.ORDER_STATUS.DELIVERING) {
                    return <Tag color="#991dbe">Đang chờ giao</Tag>;
                }

                if (status === EmployeeConst.ORDER_STATUS.SUCCESS) {
                    return <Tag color="#87d068">Hoàn thành</Tag>;
                }

                return <Tag color="#f50">Không xác định</Tag>;
            },
        },
        {
            title: "Giá giảm",
            dataIndex: "discount",
            key: "discount",
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalMoney",
            key: "totalMoney",
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

    let dataSource = [];
    for (let i = 0; i < 50; ++i) {
        dataSource.push({
            key: i,
            no: i + 1,
            customerName: "test",
            createdDate: "date",
            paymentMethod: "COD",
            status: i % 3 === 2 ? "new" : i % 3 === 1 ? "delivering" : "success",
            discount: 15000,
            totalMoney: 50000,
            action: `/employee/orders/${i + 1}`,
        });
    }

    const handlePageChange = (page) => {
        console.log(page);
    };

    const handleStatusChange = (value) => {
        console.log(value);
    }

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        };

        fetchOrder();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <Space direction="horizontal" size="middle" onChange={handleStatusChange}>
                <Select defaultValue={EmployeeConst.ORDER_STATUS.NEW} style={{ width: 200 }}>
                    <Select.Option value={EmployeeConst.ORDER_STATUS.NEW}>
                        Đơn hàng mới
                    </Select.Option>
                    <Select.Option value={EmployeeConst.ORDER_STATUS.DELIVERING}>
                        Đơn chờ vận chuyển
                    </Select.Option>
                    <Select.Option value={EmployeeConst.ORDER_STATUS.SUCCESS}>
                        Đơn đã giao
                    </Select.Option>
                </Select>

                <DatePicker.RangePicker></DatePicker.RangePicker>
            </Space>

            <Divider orientation="left">
                Danh sách đơn hàng
            </Divider>

            <Table
                bordered
                loading={loading}
                dataSource={dataSource}
                columns={columnsConfig}
                pagination={{
                    position: ["bottomCenter"],
                    pageSize: 20,
                    total: 50,
                    onChange: handlePageChange,
                }}
                scroll={{ x: 1000, y: 500 }}
            />
        </div>
    );
}

export default OrderListPage;
