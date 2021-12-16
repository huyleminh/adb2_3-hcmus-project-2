import { LoadingOutlined } from "@ant-design/icons";
import { faEye, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Spin } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./style.css";

ProductCard.propTypes = {
    detail: PropTypes.shape({
        productId: PropTypes.string,
        productName: PropTypes.string,
        srcImage: PropTypes.string,
        price: PropTypes.number,
    }),
    span: PropTypes.number,
};

const { Meta } = Card;

function ProductCard(props) {
    const { detail, span } = props;

    const [isLoading, setIsLoading] = useState(false);

    const [isProcessing, setIsProcessing] = useState(false);

    const history = useHistory();

    useEffect(() => {
        setIsLoading(true);

        //fetch image

        setIsLoading(false);
    }, []);

    const addToCart = () => {
        setIsProcessing(true);

        console.log(detail.productId);
        //handle add to cart

        setIsProcessing(false);
    };

    return (
        <Col span={span}>
            <Card
                className="card"
                key={detail.productId}
                hoverable
                cover={
                    isLoading ? (
                        <>
                            <div className="loading">
                                <Spin
                                    indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <img alt="" src={detail.srcImage} />
                            <div
                                className="mask"
                                onClick={() => {
                                    history.push(`/menu/products/${detail.productId}`);
                                }}
                            >
                                <span className="mask-text">
                                    <FontAwesomeIcon
                                        style={{ margin: "0px 5px 0px 0px" }}
                                        icon={faEye}
                                    />
                                    Xem chi tiết
                                </span>
                            </div>
                        </>
                    )
                }
            >
                <Meta title={detail.productName} />
                <p style={{ margin: "10px 0px" }}>
                    <NumberFormat value={detail.price} displayType="text" thousandSeparator />
                    <span style={{ fontSize: "0.75em" }}> VNĐ</span>
                </p>
                <div className="btn-area">
                    <button className="addToCart-btn" onClick={addToCart}>
                        <FontAwesomeIcon
                            style={{ margin: "0px 5px 0px 0px" }}
                            icon={faShoppingCart}
                        />
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </Card>
        </Col>
    );
}

export default ProductCard;
