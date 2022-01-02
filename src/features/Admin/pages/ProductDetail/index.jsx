import { FileImageOutlined  } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Row, Col, Input, InputNumber, Select, Skeleton } from 'antd';
import { Link, useParams } from "react-router-dom";
import "./styles.css"

ProductDetail.propTypes = {};

const { TextArea } = Input;

const { Option } = Select;

function ProductDetail() {
    const { productId } = useParams();

    const [image, setImage] = useState({
        image: undefined,
        imageURL: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const [catList, setCatList] = useState([]);

    const [selectedCat, setSelectedCat] = useState('other');

    const [productInfo, setProductInfo] = useState({});

    useEffect(() => {
        document.title= "Sửa sản phẩm";
        setIsLoading(true);

        let fakeData = {
            productName: `Sản phẩm ${productId}`,
            catName: "Test",
            price: 10000000,
            remainingAmount: 20,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut aliquam nibh, sit amet lobortis risus. Pellentesque commodo venenatis metus. Morbi porttitor ac velit in viverra. Maecenas accumsan nibh ut vehicula rutrum. Proin at sodales risus. Integer mi orci, mollis a massa et, efficitur molestie ex. Praesent in auctor felis, in viverra massa.",
            image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        };

        setProductInfo(fakeData);
        setImage({
            image: undefined,
            imageURL: fakeData.image
        })
        setIsLoading(false);
    }, [productId]);

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
    <div className="pd-container">
        <div className="pd-header">
            <h3>Sửa sản phẩm</h3>
            <div className="pd-btn-area">
                <Link className="pd-cancel-btn" to="/admin/product-management">
                    Hủy
                </Link>
                <button className="pd-done-btn">
                    Hoàn tất
                </button>
            </div>
        </div>
        <div className="pd-info-form">
            <Row gutter={[32, 16]}>
                <Col span={12}>
                    <span>Tên sản phẩm</span>
                </Col>
                <Col span={12}>
                    <span>Loại</span>
                </Col>

                <Col span={12}>
                    {isLoading ? (<Skeleton.Input active={true}/>) : (<Input name="productName" placeholder="Nhập tên sản phẩm" onChange={onChange} value={productInfo.productName}/>)}
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
                    {isLoading ? (<Skeleton.Input active={true}/>) : (<Input name="catName" placeholder="Nhập loại sản phẩm" disabled={selectedCat === "other" ? false : true} onChange={onChange}/>)}
                </Col>

                <Col span={12}>
                    <span>Đơn giá</span>
                </Col>
                <Col span={12}>
                    <span>Số lượng tồn</span>
                </Col>

                <Col span={12}>
                    {isLoading ? (<Skeleton.Input active={true}/>) : (<InputNumber value={productInfo.price} addonAfter="vnđ" style={{width: "100%"}} placeholder="Nhập đơn giá" onChange={(value) => onChange({name: "price", value: value})}/>)}
                </Col>
                <Col span={12}>
                    {isLoading ? (<Skeleton.Input active={true}/>) : (<InputNumber value={productInfo.remainingAmount} style={{width: "100%"}} placeholder="Nhập số lượng hiện tại" onChange={(value) => onChange({name: "remainingAmount", value: value})}/>)}
                </Col>

                <Col span={12}>
                    <span>Mô tả sản phẩm</span>
                </Col>
                <Col span={12}>
                    <span>Hình ảnh</span>
                </Col>

                <Col span={12}>
                    {isLoading ? (<Skeleton active/>) : (<TextArea value={productInfo.description} name="description" style={{height: "100%"}} onChange={onChange}/>)}
                </Col>

                <Col span={12}>
                    {isLoading ? (<Skeleton active/>) : (
                    <div className="pd-image-cell">
                        <div className="pd-hover-effect">
                            {image.imageURL ? (<img className="pd-uploaded-image" src={image.imageURL} alt="Hình ảnh" onLoad={() => onChange({name: "image", value: image.image})}></img>) : (<div className="pd-preview-skeleton"><FileImageOutlined style={{ fontSize: 130, color: "white" }}/>Nhấp vào để ảnh tải lên</div>)}
                            <input className="pd-upload" type="file" accept="image/*" title="Tải ảnh lên" onChange={preview}></input>
                        </div>
                    </div>)}
                </Col>
            </Row>
        </div>
    </div>);
}

export default ProductDetail;
