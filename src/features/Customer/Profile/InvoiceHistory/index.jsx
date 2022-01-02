import { message, Select, Spin } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import InvoiceTable from "../../../../components/InvoiceTable";
import ClientAPI from "../../../../service/ClientAPI";
import "./styles.css";

InvoiceHistory.propTypes = {};

const { Option } = Select;

const sortBy = [
    {
        name: "Mặc định",
        key: "default",
    },
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

moment.locale("vi");

function InvoiceHistory() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [sort, setSort] = useState(sortBy[0]);
    const history = useHistory();

    useEffect(() => {
        const fetchOrderHistory = async () => {
            setIsLoading(true);

            try {
                const res = await ClientAPI.get("/customer/orders");
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

        fetchOrderHistory();
    }, [history]);

    const handleChangeSortBy = (value) => {
        let status = sortBy.find((element) => element.key === value);

        if (status) {
            setSort(status);
        }
    };

    const displayData =
        sort.key === "default"
            ? JSON.parse(JSON.stringify(data))
            : data.filter((element) => element.status === sort.key);

    return (
        <div className="invoice-history-container">
            <div className="invoice-history-filterbar">
                <span>Bộ lọc</span>
                <Select
                    disabled={isLoading}
                    value={sort.name}
                    style={{ width: 150 }}
                    onChange={handleChangeSortBy}
                >
                    {sortBy.map((record, index) => {
                        return (
                            <Option key={index} value={record.key}>
                                {record.name}
                            </Option>
                        );
                    })}
                </Select>
            </div>
            <div className="invoice-history-container-table">
                {isLoading ? (
                    <div className="invoice-history-loading">
                        <Spin tip="Đang tải dữ liệu, vui lòng đợi trong giây lát" size="default" />
                    </div>
                ) : (
                    <InvoiceTable data={displayData} />
                )}
            </div>
        </div>
    );
}

export default InvoiceHistory;
