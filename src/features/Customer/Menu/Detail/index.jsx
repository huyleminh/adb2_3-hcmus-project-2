import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { PageHeader, Divider, Descriptions, Skeleton, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberFormat from "react-number-format";
import "./styles.css";

ProductDetail.propTypes = {};

function ProductDetail(props) {
    const { id } = useParams(); //product ID

    const [data, setData] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const [isProcessing, setIsProcessing] = useState(false);

    const history = useHistory();

    useEffect(() => {
        let testData = {
            productId: id,
            productName: `Sản phẩm ${id}`,
            price: 10000000,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a vestibulum ipsum. Ut eget pulvinar orci, at pretium ex. Donec volutpat ligula lacus, id tincidunt enim sagittis sed. Cras vestibulum efficitur lobortis. Integer justo felis, imperdiet vitae elit et, ultricies ornare nibh. Fusce euismod nunc eros, id blandit justo maximus eu. Vestibulum gravida vulputate turpis vehicula feugiat. Donec ullamcorper, eros in ornare convallis, lectus leo pharetra turpis, sit amet aliquam lectus neque sed ipsum.",
        };

        document.title = testData.productName;

        setIsLoading(true);
        //fetch data here
        setData(testData);
        setIsLoading(false);
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
                        <img
                            alt=""
                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                        />
                    )}
                </div>
                <div className="information">
                    <Descriptions
                        title="Thông tin"
                        bordered
                        column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 }}
                        layout="vertical"
                    >
                        <Descriptions.Item label="Tên" span={1}>
                            {isLoading ? <Skeleton active /> : data.productName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giá sản phẩm" span={1}>
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
                        <Descriptions.Item label="Mô tả" span={2}>
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
