import { LoadingOutlined, UserAddOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spin, Input, Tooltip } from "antd";
import EmployeeTable from "../../../../components/EmployeeTable"
import "./styles.css";

HRM.propTypes = {};

const { Search } = Input;

function HRM() {
    const [data, setData] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Quản lý nhân sự";
        setIsLoading(true);
        let fakeData = [];

        for (let i = 0; i < 20; i++)
            fakeData.push({
                key: i,
                employeeName: `Nhân viên ${i}`,
                address: '1234 test address, q5, tphcm',
                phoneNumber: '0123456789',
            });

        setData(fakeData);
        setIsLoading(false);
    }, []);

    const searchItem = (searchValue) => {
        console.log(searchValue);
    }

    return (
    <div className="hrm-container">
        <div className="hrm-command-bar">
            <div className="hrm-search">
                <Search
                    placeholder="Nhập tên nhân viên để tìm kiếm"
                    loading={isLoading}
                    enterButton
                    onSearch={searchItem}
                />
            </div>
            <Tooltip title="Thêm nhân viên mới" placement="left" arrowPointAtCenter>
                <Link className="hrm-add-employee-btn" to="">{<UserAddOutlined style={{ fontSize: 15}} />}</Link>
            </Tooltip>
        </div>
        <div className="hrm-content">
            {isLoading ? (
                    <div className="loading">
                        <Spin
                            tip="Đang tải dữ liệu"
                            indicator={
                                <LoadingOutlined style={{ fontSize: 100, margin: 50 }} spin />
                            }
                        />
                    </div>
                ) : (<EmployeeTable data={data} noSelect pagination={10} />)}
        </div>
    </div>);
}

export default HRM;
