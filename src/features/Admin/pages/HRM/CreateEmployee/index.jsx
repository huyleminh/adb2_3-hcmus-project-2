import React, { useState, useEffect } from "react";
import { Row, Col, Input, Alert , Select, Form } from 'antd';
import { Link } from "react-router-dom";
import "./styles.css"

CreateEmployee.propTypes = {};

const { Option } = Select;

function CreateEmployee() {
    const [isLoading, setIsLoading] = useState(false);

    const [selectedRole, setSelectedRole] = useState(3);

    const [employeeInfo, setEmployeeInfo] = useState({});

    const [isPhoneValid, setIsPhoneValid] = useState(undefined);

    useEffect(() => {
        document.title= "Tạo mới nhân viên";
    }, []);

    const handleChangeRole = (value) => {
        setSelectedRole(value);
    };

    const onChange = (form) => {
        let info = JSON.parse(JSON.stringify(employeeInfo));

        form.target ? info[form.target.name] = form.target.value : info[form.name] = form.value;

        if (info.phoneNumber.match(/^[0][\d]{9}$/g))
            setIsPhoneValid(true);
        else setIsPhoneValid(false);

        console.log(info);

        setEmployeeInfo(info);
    };

    return (
    <div className="ce-container">
        <div className="ce-header">
            <h3>Tạo mới nhân viên</h3>
            <div className="ce-btn-area">
                <Link className="ce-cancel-btn" to="/admin/product-management">
                    Hủy
                </Link>
                <button className="ce-done-btn">
                    Hoàn tất
                </button>
            </div>
        </div>
        <div className="ce-info-form">
            <Row gutter={[32, 16]}>
                <Col span={12}>
                    <span>Tên nhân viên</span>
                </Col>
                <Col span={12}>
                    <span>Chức vụ</span>
                </Col>

                <Col span={12}>
                    <Input name="employeeName" placeholder="Nhập tên nhân viên" onChange={onChange}/>
                </Col>
                <Col span={12}>
                    <Select
                        disabled={isLoading}
                        value={selectedRole}
                        style={{ width: "100%" }}
                        onChange={handleChangeRole}
                        placeholder="Chức vụ"
                    >
                        <Option key="manager" value={2}>
                            Quản lý
                        </Option>
                        <Option key="manager" value={3}>
                            Nhân viên
                        </Option>
                    </Select>
                </Col>

                <Col span={12}>
                    <span>Địa chỉ nhân viên</span>
                </Col>
                <Col span={12}>
                    <span>Số điện thoại nhân viên</span>
                </Col>

                <Col span={12}>
                    <Input name="address" placeholder="Nhập địa chỉ nhân viên" onChange={onChange}/>
                </Col>
                <Col span={12}>
                    <Input name="phoneNumber" placeholder="Nhập số điện thoại của nhân viên" onChange={onChange}></Input>
                    {(isPhoneValid) || (isPhoneValid === undefined) ? (null) : (<Alert message="Số điện thoại chưa đúng" type="error" style={{marginTop: 10}}/>)}
                </Col>
            </Row>
        </div>
    </div>);
}

export default CreateEmployee;
