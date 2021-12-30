import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { PageHeader, Divider, Descriptions, Skeleton, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberFormat from "react-number-format";
import "./styles.css";
import ClientAPI from "../../../../service/ClientAPI";

ProductDetail.propTypes = {};

function ProductDetail(props) {
    const { id } = useParams();
    const [data, setData] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const [isProcessing, setIsProcessing] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const fetchProductDetail = async () => {
            setIsLoading(true);

            try {
                const res = await ClientAPI.get(`/products/${id}`);
                setIsLoading(false);

                if (res.status === 200) {
                    const product = res.data;
                    document.title = product.TenSP;

                    setData({
                        productId: product.MaSP,
                        productName: product.TenSP,
                        price: product.DonGia,
                        description: product.MoTa,
                        imageLink: product.HinhAnh,
                        category: product.categoryName[0],
                    });
                } else {
                    console.log(res);
                    message.error("Đã có lỗi xảy ra", 1);
                }
            } catch (error) {
                console.log(error);
                message.error("Đã có lỗi xảy ra", 1);
            }
        };

        fetchProductDetail();
    }, [id]);

    const addToCart = () => {
        setIsProcessing(true);
        //handle add to cart
        setIsProcessing(false);
    };

    return (
        <div className="page-wrapper">
            <div className="header">
                <PageHeader
                    className="site-page-header"
                    onBack={() => {
                        history.push("/menu/categories");
                    }}
                    title="Về trang sản phẩm"
                />
            </div>
            <Divider>Chi tiết sản phẩm</Divider>
            <div className="content">
                <div className="image-area">
                    {isLoading ? (
                        <div className="loading">
                            <Spin
                                tip="Đang tải hình ảnh sản phẩm"
                                indicator={
                                    <LoadingOutlined style={{ fontSize: 100, margin: 50 }} spin />
                                }
                            />
                        </div>
                    ) : (
                        <img alt="" src={data.imageLink} />
                    )}
                </div>
                <div className="information">
                    <Descriptions title="Thông tin" layout="vertical" bordered>
                        <Descriptions.Item label="Tên">
                            {isLoading ? <Skeleton active /> : data.productName}
                        </Descriptions.Item>

                        <Descriptions.Item label="Giá sản phẩm">
                            {isLoading ? (
                                <Skeleton active />
                            ) : (
                                <>
                                    <NumberFormat
                                        value={data.price}
                                        displayType="text"
                                        thousandSeparator
                                    />
                                    <span style={{ fontSize: "0.75em" }}> VNĐ</span>
                                </>
                            )}
                        </Descriptions.Item>

                        <Descriptions.Item label="Loại sản phẩm">
                            {isLoading ? <Skeleton active /> : data.category?.TenLoai}
                        </Descriptions.Item>

                        <Descriptions.Item label="Mô tả" span={3}>
                            {isLoading ? <Skeleton active /> : data.description}
                        </Descriptions.Item>
                    </Descriptions>

                    <div className="button-area">
                        <button className="cart-btn" onClick={addToCart}>
                            {isProcessing ? (
                                <div className="inside-btn">
                                    <Spin indicator={<LoadingOutlined spin />} />
                                    <span>Đang xử lý</span>
                                </div>
                            ) : (
                                <div className="inside-btn">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    <span>Thêm vào giỏ hàng</span>
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
