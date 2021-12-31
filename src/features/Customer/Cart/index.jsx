import { Affix, message, PageHeader, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";
import ProductTable from "../../../components/ProductTable/index";
import AuthService from "../../../service/AuthService";
import ClientAPI from "../../../service/ClientAPI";
import "./styles.css";

CartFeature.propTypes = {};

function CartFeature(props) {
    const history = useHistory();
    const [selectedItems, setSelectedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cartData, setCartData] = useState({});

    useEffect(() => {
        document.title = "Giỏ hàng của tôi";

        const fetchCustomerCart = async () => {
            setIsLoading(true);

            if (!AuthService.isLogin()) {
                // Get cart local
                loadCartFromLocal();
                setIsLoading(false);
                return;
            }

            try {
                const res = await ClientAPI.get("/cart");
                setIsLoading(false);

                if (res.status === 200) {
                    setCartData(res.data);
                    localStorage.setItem("cartItems", JSON.stringify(res.data.cartItems));
                } else {
                    loadCartFromLocal();
                }
            } catch (error) {
                console.log(error);
                message.error("Đã có lỗi xảy ra");
            }
        };

        fetchCustomerCart();
    }, []);

    const loadCartFromLocal = () => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems"))
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [];
        setCartData({ cartId: null, cartItems });
    };

    const selectItem = (selectedKeys, selectedRows) => {
        setSelectedItems(selectedKeys);
    };

    const changeQuantity = (quantity, record) => {
        let temp = JSON.parse(JSON.stringify(cartData.cartItems));

        let index = temp.findIndex((element) => element.productId === record.productId);
        if (index !== -1) {
            temp[index].quantity = quantity;
        }

        // Set cart to local and rerender cart page
        if (!AuthService.isLogin()) {
            localStorage.setItem("cartItems", JSON.stringify(temp));
            setCartData({ ...cartData, cartItems: temp });
            return;
        }

        // Save cart to cloud and rerender
        ClientAPI.put(`/cart/${cartData.cartId}`, {
            productId: record.productId,
            quantity: quantity,
        })
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("cartItems", JSON.stringify(temp));
                    setCartData({ ...cartData, cartItems: temp });
                } else {
                    message.error("Không thể lưu thông tin giỏ hàng", 1);
                }
            })
            .catch((error) => {
                console.log(error);
                message.error("Không thể lưu thông tin giỏ hàng", 1);
            });
    };

    const deleteItem = (id) => {
        let temp = JSON.parse(JSON.stringify(cartData.cartItems));

        temp = temp.filter((element) => element.productId !== id);

        // Set cart to local and rerender cart page
        if (!AuthService.isLogin()) {
            localStorage.setItem("cartItems", JSON.stringify(temp));
            setCartData({ ...cartData, cartItems: temp });
            return;
        }

        // Save cart to cloud and rerender
        ClientAPI.delete(`/cart/${cartData.cartId}/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("cartItems", JSON.stringify(temp));
                    setCartData({ ...cartData, cartItems: temp });
                } else {
                    message.error("Không thể lưu thông tin giỏ hàng", 1);
                }
            })
            .catch((error) => {
                console.log(error);
                message.error("Không thể lưu thông tin giỏ hàng", 1);
            });
    };

    const getCartDetail = () => {
        let sum = 0;
        let productList = [];
        if (cartData.cartItems !== undefined) {
            for (let item of cartData.cartItems) {
                if (selectedItems.includes(item.productId)) {
                    sum += item.price * item.quantity;
                    productList.push(item);
                }
            }
        }
        return {
            total: sum,
            list: productList,
        };
    };

    const toCheckout = () => {
        let detail = getCartDetail();
        if (detail.list.length === 0) {
            alert("Please choose at least 1 product");
            return;
        }
        localStorage.setItem("cart", JSON.stringify(detail));
        history.push("/checkout");
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
            <Affix offsetTop={0}>
                <div className="floating-ribbon">
                    <div className="checkout">
                        <p>
                            <b>Đã chọn:</b> {selectedItems.length}
                        </p>
                        <p>
                            <b>Tổng tiền:</b>{" "}
                            {
                                <>
                                    <NumberFormat
                                        style={{ color: "red" }}
                                        value={getCartDetail().total}
                                        displayType="text"
                                        thousandSeparator
                                    />
                                    <span style={{ fontSize: "0.75em", color: "red" }}> VNĐ</span>
                                </>
                            }
                        </p>
                        <button className="checkout-btn" onClick={toCheckout}>
                            Thanh toán
                        </button>
                    </div>
                </div>
            </Affix>
            <div className="table-area">
                {isLoading ? (
                    <Skeleton active />
                ) : (
                    <ProductTable
                        data={cartData?.cartItems}
                        pagination={10}
                        changeQuantity={changeQuantity}
                        selectRecord={selectItem}
                        deleteRecord={deleteItem}
                    />
                )}
            </div>
        </div>
    );
}

export default CartFeature;
