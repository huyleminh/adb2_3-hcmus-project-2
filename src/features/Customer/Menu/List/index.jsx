import { Divider, Input, message, Pagination, Row, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../../components/Loading";
import ClientAPI from "../../../../service/ClientAPI";
import ProductCard from "./Item/index";
import "./styles.css";

ViewListFeature.propTypes = {};

const { Option } = Select;

const { Search } = Input;

const MAX_PER_PAGE = 12;

function ViewListFeature(props) {
    const [isLoading, setIsLoading] = useState(false);

    const [basicSortBy, setBasicSortBy] = useState(0);

    const [catList, setCatList] = useState([{ catId: 0, catName: "Toàn bộ danh mục" }]);

    const [pagination, setPagination] = useState({ page: 1, total: 0, limit: MAX_PER_PAGE });

    const [data, setData] = useState([]);

    const basicSort = ["Mặc định", "Giá tăng dần", "Giá giảm dần", "A -> Z", "Z -> A"];

    const [filters, setFilters] = useState({
        page: 1,
        limit: MAX_PER_PAGE,
        catId: 0,
        search: "",
    });

    const searchref = useRef("");

    useEffect(() => {
        document.title = "Sản phẩm";

        const fetchCategories = async () => {
            try {
                const res = await ClientAPI.get(`/categories`);

                if (res.status === 200) {
                    setCatList([{ catId: 0, catName: "Toàn bộ danh mục" }, ...res.data]);
                } else {
                    message.error("Đã có lỗi xảy ra", 1);
                }
            } catch (error) {
                console.log(error);
                message.error("Đã có lỗi xảy ra", 1);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const newFilter = { ...filters };
                if (!newFilter.search.trim()) {
                    delete newFilter.search;
                }

                if (newFilter.catId === 0) {
                    delete newFilter.catId;
                }

                const query = Object.keys(newFilter)
                    .map((key) => `${key}=${newFilter[key]}`)
                    .join("&");

                const res = await ClientAPI.get(`/products?${query}`);

                setIsLoading(false);

                if (res.status === 200) {
                    const produtList = res.data.products;
                    const paginationRes = res.data.pagination;

                    setData(produtList);
                    setPagination({
                        page: paginationRes.page,
                        total: paginationRes.totalProducts,
                        limit: paginationRes.limit,
                    });
                } else {
                    message.error("Đã có lỗi xảy ra", 1);
                }
            } catch (error) {
                console.log(error);
                message.error("Đã có lỗi xảy ra", 1);
            }
        };

        fetchProducts();
    }, [filters]);

    const handleChangeBasicSort = (value) => {
        setBasicSortBy(value);
    };

    const handleChangeSortByCat = (value) => {
        searchref.current.state.value = "";
        setFilters({ ...filters, catId: value, search: "" });
    };

    const changePagination = (page) => {
        setFilters({ ...filters, page: page });
    };

    const searchItem = (value) => {
        if (!value.trim()) {
            return;
        }

        setFilters({ ...filters, search: value, catId: 0 });
    };

    const sortedProducts =
        basicSortBy === 0
            ? data
            : data.sort((left, right) => {
                  if (basicSortBy === 1) return left.price - right.price;

                  if (basicSortBy === 2) return right.price - left.price;

                  if (left.productName < right.productName) {
                      return basicSortBy === 3 ? -1 : 1;
                  }

                  if (left.productName > right.productName) {
                      return basicSortBy === 3 ? 1 : -1;
                  }

                  return 0;
              });

    return (
        <div className="page_wrapper">
            <div className="filter_bar">
                <div className="search">
                    <Search
                        placeholder="Nhập tên sản phẩm để tìm kiếm"
                        loading={isLoading}
                        enterButton
                        onSearch={searchItem}
                        ref={searchref}
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
                        value={filters.catId}
                        style={{ width: 150 }}
                        onChange={handleChangeSortByCat}
                        placeholder="Danh mục"
                    >
                        {catList.map((cat) => {
                            return (
                                <Option key={cat.catId} value={cat.catId}>
                                    {cat.catName}
                                </Option>
                            );
                        })}
                    </Select>
                </div>
            </div>

            <Divider>Sản phẩm</Divider>

            <div className="menu_wrapper">
                {isLoading ? (
                    <Loading
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    />
                ) : (
                    <Row gutter={[24, 24]} justify="center">
                        {data.map((record) => {
                            return (
                                <ProductCard
                                    detail={record}
                                    key={record.productId}
                                    span={{ xs: 24, sm: 12, md: 8, lg: 8, xl: 6, xxl: 4 }}
                                />
                            );
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
                    pageSize={pagination.limit}
                    total={pagination.total}
                />
            </div>
        </div>
    );
}

export default ViewListFeature;
