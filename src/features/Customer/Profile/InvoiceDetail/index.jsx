import {
    CheckCircleOutlined, LoadingOutlined, MinusCircleOutlined, SyncOutlined
} from "@ant-design/icons";
import { Descriptions, Skeleton, Spin, Tag } from "antd";
import moment from "moment";
import "moment/locale/vi";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";
import ProductTable from "../../../../components/ProductTable";
import "./styles.css";

InvoiceDetail.propTypes = {};

const statusList = [
    {
        name: "Hoàn tất",
        key: "done",
    },
    {
        name: "Đang xử lý",
        key: "processing",
    },
    {
        name: "Đang giao hàng",
        key: "delivery",
    },
    {
        name: "Đã hủy",
        key: "cancel",
    },
];

function InvoiceDetail() {
    const { id } = useParams();

    moment.locale("vi");

    const tags = {
        done: (
            <Tag icon={<CheckCircleOutlined />} color="success">
                Hoàn tất
            </Tag>
        ),
        processing: (
            <Tag icon={<SyncOutlined spin />} color="processing">
                Đang xử lý
            </Tag>
        ),
        delivery: (
            <Tag icon={<SyncOutlined spin />} color="warning">
                Đang giao hàng
            </Tag>
        ),
        cancel: (
            <Tag icon={<MinusCircleOutlined />} color="error">
                Đã hủy
            </Tag>
        ),
    };

    const [data, setData] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Chi tiết đơn hàng";
        setIsLoading(true);
        let fakeData = {
            invoiceInfo: {
                key: id, //invoice ID
                totalPrice: 10000000,
                createdAt: moment().format("llll"),
                status: statusList[Math.floor(Math.random() * 1000) % statusList.length].key,
            },
            invoiceDetail: [],
        };

        for (let i = 0; i < 10; i++)
            fakeData.invoiceDetail.push({
                key: i,
                productName: `Sản phẩm ${i}`,
                srcImage: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
                price: 10000000,
                quantity: 1,
            });

        setData(fakeData);
        setIsLoading(false);
    }, [id]);

    console.log(data);

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
                        {isLoading ? <Skeleton active /> : data.invoiceInfo.key}
                    </Descriptions.Item>
                    <Descriptions.Item label="Giá trị đơn hàng" span={1}>
                        {isLoading ? (
                            <Skeleton active />
                        ) : (
                            <>
                                <NumberFormat
                                    value={data.invoiceInfo.totalPrice}
                                    displayType="text"
                                    thousandSeparator
                                />
                                <span style={{ fontSize: "0.75em" }}> VNĐ</span>
                            </>
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày lập" span={1}>
                        {isLoading ? <Skeleton active /> : data.invoiceInfo.createdAt}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái đơn hàng" span={2}>
                        {isLoading ? <Skeleton active /> : tags[data.invoiceInfo.status]}
                    </Descriptions.Item>
                    <Descriptions.Item label="Thao tác" span={1}>
                        {isLoading ? (
                            <Skeleton active />
                        ) : (
                            <div className="action-block">
                                <button
                                    className="cancel-btn"
                                    disabled={
                                        data.invoiceInfo.status === "processing" ? false : true
                                    }
                                >
                                    Hủy đơn
                                </button>
                            </div>
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
                    <ProductTable data={data.invoiceDetail} pagination={3} infoOnly />
                )}
            </div>
        </div>
    );
}

export default InvoiceDetail;
