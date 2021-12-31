import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spin, Input, Tooltip } from "antd";
import PMTable from "../../../../components/PMTable"
import "./styles.css";

PM.propTypes = {};

const { Search } = Input;

function PM() {
    const [data, setData] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Quản lý sản phẩm";
        setIsLoading(true);
        let fakeData = [];

        for (let i = 0; i < 20; i++)
            fakeData.push({
                key: i,
                srcImage: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
                productName: `Sản phẩm ${i}`,
                price: 10000000,
                remainingAmount: 50
            });

        setData(fakeData);
        setIsLoading(false);
    }, []);

    const searchItem = (searchValue) => {
        console.log(searchValue);
    }

    return (
    <div className="pm-container">
        <div className="pm-command-bar">
            <div className="pm-search">
                <Search
                    placeholder="Nhập tên sản phẩm để tìm kiếm"
                    loading={isLoading}
                    enterButton
                    onSearch={searchItem}
                />
            </div>
            <Tooltip title="Thêm sản phẩm mới" placement="left" arrowPointAtCenter>
                <Link className="pm-add-employee-btn" to="/admin/product-management/create">{<PlusOutlined style={{ fontSize: 15}} />}</Link>
            </Tooltip>
        </div>
        <div className="pm-content">
            {isLoading ? (
                    <div className="loading">
                        <Spin
                            tip="Đang tải dữ liệu"
                            indicator={
                                <LoadingOutlined style={{ fontSize: 100, margin: 50 }} spin />
                            }
                        />
                    </div>
                ) : (<PMTable data={data} noSelect pagination={5} />)}
        </div>
    </div>);
}

export default PM;
