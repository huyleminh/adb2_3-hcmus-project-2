import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PageHeader, Divider, Affix } from "antd";
import NumberFormat from "react-number-format";
import ProductTable from "../../../components/Table/index"
import "./styles.css"

CartFeature.propTypes = {};

function CartFeature(props) {
    const history = useHistory();

    const [data, setData] = useState([]);

    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
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

    const sumPrice = () => {
        let sum = 0;
        for (let item of data) {
            if (selectedItems.includes(item.key))
                sum += item.price * item.quantity;
        }
        return sum;
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
        <Divider>Giỏ hàng của tôi</Divider>
        <Affix offsetTop={0}>
            <div className="floating-ribbon">
                <div className="checkout">
                    <p><b>Đã chọn:</b> {selectedItems.length}</p>
                    <p><b>Tổng tiền:</b> {
                        <>
                            <NumberFormat
                            style={{ color:"red" }}
                            value={sumPrice()}
                            displayType="text"
                            thousandSeparator
                        />
                        <span style={{ fontSize: "0.75em", color: "red" }}> VNĐ</span>
                        </>}</p>
                    <button className="checkout-btn">Thanh toán</button>
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
