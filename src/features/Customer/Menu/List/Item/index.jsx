import { LoadingOutlined } from "@ant-design/icons";
import { faEye, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, message, Spin } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";
import AuthService from "../../../../../service/AuthService";
import ClientAPI from "../../../../../service/ClientAPI";
import "./styles.css";

ProductCard.propTypes = {
    detail: PropTypes.shape({
        productId: PropTypes.number,
        productName: PropTypes.string,
        imageLink: PropTypes.string,
        price: PropTypes.number,
    }),
    span: PropTypes.shape({}),
};

const { Meta } = Card;

function ProductCard(props) {
    const { detail, span } = props;

    const [isProcessing, setIsProcessing] = useState(false);

    const history = useHistory();

    const addToCart = async () => {
        setIsProcessing(true);

        if (!AuthService.isLogin()) {
            addToCartLocal();
            message.success("Thêm vào giỏ hàng thành công", 1);
            setIsProcessing(false);
            return;
        }

        try {
            const res = await ClientAPI.post("/cart", {
                productId: detail.productId,
                quantity: 1,
            });

            setIsProcessing(false);

            if (res.status === 201) {
                message.success("Thêm vào giỏ hàng thành công", 1);
            } else {
                addToCartLocal();
                message.success("Thêm vào giỏ hàng thành công", 1);
            }
        } catch (error) {
            console.log(error);
            message.error("Không thể thêm vào giỏ hàng", 1);
        }
    };

    const addToCartLocal = () => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems"))
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [];
        const index = cartItems.findIndex((item) => item.productId === detail.productId);
        if (index === -1) {
            cartItems.push({ ...detail, quantity: 1 });
        } else {
            cartItems[index].quantity++;
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    };

    return (
        <Col {...span}>
            <Card
                className="card"
                key={detail.productId}
                hoverable
                cover={
                    <>
                        <img alt="productImage" src={detail.imageLink} />
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
                }
            >
                <Meta title={detail.productName} />
                <p style={{ margin: "10px 0px" }}>
                    <NumberFormat value={detail.price} displayType="text" thousandSeparator />
                    <span style={{ fontSize: "0.75em" }}> VNĐ</span>
                </p>
                <div className="btn-area">
                    <button className="addToCart-btn" onClick={addToCart}>
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
            </Card>
        </Col>
    );
}

export default ProductCard;
