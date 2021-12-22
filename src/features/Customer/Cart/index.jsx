import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PageHeader, Affix } from "antd";
import NumberFormat from "react-number-format";
import ProductTable from "../../../components/ProductTable/index"
import "./styles.css"

CartFeature.propTypes = {};

function CartFeature(props) {
    const history = useHistory();

    const [data, setData] = useState([]);

    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        document.title = "Giỏ hàng của tôi";
        let fakeData = [];

        for (let i = 0; i < 20; i++)
            fakeData.push({
                key: i,
                productName: `Sản phẩm ${i}`,
                srcImage: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
                price: 10000000,
                quantity: 1
            })

        setData(fakeData);
        localStorage.removeItem("cart");
    }, []);

    const selectItem = (selectedKeys, selectedRows) => {
        console.log(selectedRows);
        setSelectedItems(selectedKeys);
    }

    const changeQuantity = (quantity, record) => {
        let temp = JSON.parse(JSON.stringify(data));

        let index = temp.findIndex((element) => element.key === record.key);

        if (index !== -1) {
            temp[index].quantity = quantity;
            //may call API here
            setData(temp);
        }
    }

    const deleteItem = (id) => {
        console.log(id);
        //handle delete item here
    }

    const getCartDetail = () => {
        let sum = 0;
        let productList = []
        for (let item of data) {
            if (selectedItems.includes(item.key)) {
                sum += item.price * item.quantity;
                productList.push(item);
            }
        }
        return {
            total: sum,
            list: productList
        };
    }

    const toCheckout = () => {
        let detail = getCartDetail();

        if (detail.list.length === 0) {
            alert("Please choose at least 1 product");
            return
        }

        localStorage.setItem("cart", JSON.stringify(detail));

        history.push("/checkout");
    }

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
                    <p><b>Đã chọn:</b> {selectedItems.length}</p>
                    <p><b>Tổng tiền:</b> {
                        <>
                            <NumberFormat
                            style={{ color:"red" }}
                            value={getCartDetail().total}
                            displayType="text"
                            thousandSeparator
                        />
                        <span style={{ fontSize: "0.75em", color: "red" }}> VNĐ</span>
                        </>}</p>
                    <button className="checkout-btn" onClick={toCheckout}>Thanh toán</button>
                </div>
            </div>
        </Affix>
        <div className="table-area">
            <ProductTable
                data={data}
                pagination={10}
                changeQuantity={changeQuantity}
                selectRecord={selectItem}
                deleteRecord={deleteItem}
            />
        </div>
    </div>);
}

export default CartFeature;
