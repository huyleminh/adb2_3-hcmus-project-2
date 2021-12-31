import { FileImageOutlined  } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Row, Col, Input, InputNumber, Select } from 'antd';
import { Link } from "react-router-dom";
import "./styles.css"

CreateProduct.propTypes = {};

const { TextArea } = Input;

const { Option } = Select;

function CreateProduct() {
    const [image, setImage] = useState({
        image: undefined,
        imageURL: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const [catList, setCatList] = useState([]);

    const [selectedCat, setSelectedCat] = useState('other');

    const [productInfo, setProductInfo] = useState({});

    useEffect(() => {
        document.title= "Tạo mới sản phẩm";
    }, []);

    const preview = (event) => {
        if (event.target.files.length !== 0) {
            let file = new FileReader();
            file.onloadend = () => {
                setImage({
                    image: event.target.files[0],
                    imageURL: file.result
                });
            }

            if (file) {
                file.readAsDataURL(event.target.files[0]);
            }
        }
    };

    const handleChangeCat = (value) => {
        if (value !== "other") {
            onChange({
                name: "catName",
                value: value
            });
        } else {
            onChange({
                name: "catName",
                value: ""
            });
        }

        setSelectedCat(value);
    };

    const onChange = (form) => {
        let info = JSON.parse(JSON.stringify(productInfo));

        form.target ? info[form.target.name] = form.target.value : info[form.name] = form.value;

        console.log(info);

        setProductInfo(info);
    };

    return (
    <div className="cp-container">
        <div className="cp-header">
            <h3>Tạo mới sản phẩm</h3>
            <div className="cp-btn-area">
                <Link className="cp-cancel-btn" to="/admin/product-management">
                    Hủy
                </Link>
                <button className="cp-done-btn">
                    Hoàn tất
                </button>
            </div>
        </div>
        <div className="cp-info-form">
            <Row gutter={[32, 16]}>
                <Col span={12}>
                    <span>Tên sản phẩm</span>
                </Col>
                <Col span={12}>
                    <span>Loại</span>
                </Col>

                <Col span={12}>
                    <Input name="productName" placeholder="Nhập tên sản phẩm" onChange={onChange}/>
                </Col>
                <Col span={6}>
                    <Select
                        disabled={isLoading}
                        value={selectedCat}
                        style={{ width: "100%" }}
                        onChange={handleChangeCat}
                        placeholder="Danh mục"
                    >
                        <Option key={0} value="other">
                            Khác
                        </Option>
                        {catList.map((record, index) => {
                            return (
                                <Option key={index} value={index}>
                                    {record}
                                </Option>
                            );
                        })}
                    </Select>
                </Col>
                <Col span={6}>
                    <Input name="catName" placeholder="Nhập loại sản phẩm" disabled={selectedCat === "other" ? false : true} onChange={onChange}/>
                </Col>

                <Col span={12}>
                    <span>Đơn giá</span>
                </Col>
                <Col span={12}>
                    <span>Số lượng tồn</span>
                </Col>

                <Col span={12}>
                    <InputNumber addonAfter="vnđ" style={{width: "100%"}} placeholder="Nhập đơn giá" onChange={(value) => onChange({name: "price", value: value})}/>
                </Col>
                <Col span={12}>
                    <InputNumber style={{width: "100%"}} placeholder="Nhập số lượng hiện tại" onChange={(value) => onChange({name: "remainingAmount", value: value})}/>
                </Col>

                <Col span={12}>
                    <span>Mô tả sản phẩm</span>
                </Col>
                <Col span={12}>
                    <span>Hình ảnh</span>
                </Col>

                <Col span={12}>
                    <TextArea name="description" style={{height: "100%"}} onChange={onChange}/>
                </Col>

                <Col span={12}>
                    <div className="cp-image-cell">
                        <div className="cp-hover-effect">
                            {image.imageURL ? (<img className="cp-uploaded-image" src={image.imageURL} alt="Hình ảnh" onLoad={() => onChange({name: "image", value: image.image})}></img>) : (<div className="cp-preview-skeleton"><FileImageOutlined style={{ fontSize: 130, color: "white" }}/>Nhấp vào để ảnh tải lên</div>)}
                            <input className="cp-upload" type="file" accept="image/*" title="Tải ảnh lên" onChange={preview}></input>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>);
}

export default CreateProduct;
