import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Select, Spin } from "antd";
import InvoiceTable from "../../../../components/InvoiceTable"
import moment from "moment";
import 'moment/locale/vi';
import "./styles.css"

InvoiceHistory.propTypes = {}

const { Option } = Select;

const sortBy = [
    {
        name: "Mặc định",
        key: "default"
    },
    {
        name: "Hoàn tất",
        key: "done"
    },
    {
        name: "Đang xử lý",
        key: "processing"
    },
    {
        name: "Đang giao hàng",
        key: "delivery"
    },
    {
        name: "Đã hủy",
        key: "cancel"
    }
];

function InvoiceHistory() {
    //1, 'hxiaob46', '697621414', '0706576651', N'Stuart Vi', '373-3720 Mi St.'
    moment.locale('vi');

    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState([]);

    const [sort, setSort] = useState(sortBy[0]);

    useEffect(() => {
        let fakeData = [];

        for (let i = 0; i < 20; i++) {
            fakeData.push({
                key: i, //invoice ID
                totalPrice: 10000000,
                createdAt: moment().format('llll'),
                status: sortBy[(Math.floor((Math.random() * 1000)) % (sortBy.length - 1) + 1)].key
            })
        }

        setData(fakeData);
    }, [])


    const handleChangeSortBy = (value) => {
        let status = sortBy.find(element => element.key === value);

        if (status) {
            setSort(status);
        }
    }

    const displayData = sort.key === "default" ? JSON.parse(JSON.stringify(data)) : data.filter(element => element.status === sort.key);

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
                <Spin
                    tip="Đang tải dữ liệu"
                    indicator={
                        <LoadingOutlined style={{ fontSize: 100, margin: 50 }} spin />
                    }
                />
            </div>
            ) : (<InvoiceTable data={displayData}/>)}
        </div>
    </div>);
}

export default InvoiceHistory;