import { LoadingOutlined } from "@ant-design/icons";
import { Divider, Input, Pagination, Row, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import ProductCard from "./Item/index";
import "./styles.css";

ViewListFeature.propTypes = {};

const { Option } = Select;

const { Search } = Input;

const MAX_PER_PAGE = 12;

function ViewListFeature(props) {
    const [isLoading, setIsLoading] = useState(false);

    const [basicSortBy, setBasicSortBy] = useState(0);

    const [catList, setCatList] = useState([]);

    const [sortByCat, setSortByCat] = useState(0);

    const [pagination, setPagination] = useState({ page: 1, total: 40 });

    const [data, setData] = useState([]);

    const basicSort = ["Mặc định", "Giá tăng dần", "Giá giảm dần", "A -> Z", "Z -> A"];

    useEffect(() => {
        document.title = "Sản phẩm";
        //fetch initial data

        //Test data
        let tempList = [];

        for (let i = 0; i < 12; i++) {
            tempList.push({
                productId: `${i}`,
                productName: `Sản phẩm ${i + 1}`,
                srcImage: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
                price: 10000000,
            });
        }

        setData(tempList);
    }, []);

    useEffect(() => {
        //call API when change page
    }, [pagination]);

    const handleChangeBasicSort = (value) => {
        setBasicSortBy(value);
        setIsLoading(true);

        //handle sort here

        setIsLoading(false);
    };

    const handleChangeSortByCat = (value) => {
        setSortByCat(value);
    };

    const changePagination = (page) => {
        setPagination({ page: page, total: pagination.total });
    };

    const searchItem = (value) => {
        console.log(value);
    };

    return (
        <div className="page_wrapper">
            <div className="filter_bar">
                <div className="search">
                    <Search
                        placeholder="Nhập tên sản phẩm để tìm kiếm"
                        loading={isLoading}
                        enterButton
                        onSearch={searchItem}
                    />
                </div>
                <div className="filter-area">
                    <span>Bộ lọc</span>
                    <Select
                        disabled={isLoading}
                        value={basicSortBy}
                        style={{ width: 150 }}
                        onChange={handleChangeBasicSort}
                    >
                        {basicSort.map((record, index) => {
                            return (
                                <Option key={index} value={index}>
                                    {record}
                                </Option>
                            );
                        })}
                    </Select>
                    <Select
                        disabled={isLoading}
                        value={catList}
                        style={{ width: 150 }}
                        onChange={handleChangeSortByCat}
                        placeholder="Danh mục"
                    >
                        {catList.map((record, index) => {
                            return (
                                <Option key={index} value={index}>
                                    {record}
                                </Option>
                            );
                        })}
                    </Select>
                </div>
            </div>
            <Divider>Sản phẩm</Divider>
            <div className="menu_wrapper">
                {isLoading ? (
                    <div className="loading">
                        <Spin
                            tip="Đang tải dữ liệu"
                            indicator={
                                <LoadingOutlined style={{ fontSize: 100, margin: 50 }} spin />
                            }
                        />
                    </div>
                ) : (
                    <Row gutter={[48, 48]} justify="center">
                        {data.map((record) => {
                            return <ProductCard detail={record} key={record.productId} span={4} />;
                        })}
                    </Row>
                )}
            </div>
            <Divider>Trang</Divider>
            <div className="pagination">
                <Pagination
                    disabled={isLoading}
                    current={pagination.page}
                    onChange={changePagination}
                    pageSize={MAX_PER_PAGE}
                    total={pagination.total}
                />
            </div>
        </div>
    );
}

export default ViewListFeature;
