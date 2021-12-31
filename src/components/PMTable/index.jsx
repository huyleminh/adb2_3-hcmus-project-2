import { Table } from 'antd';
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import "./styles.css"

PMTable.propTypes = {};

function PMTable(props) {
    const {
        data,
        pagination,
        disabled,
        noSelect,
        selectRecord,
        deleteRecord,
    } = props;

    const columns = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'key',
            key: 'productId',
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'srcImage',
            key: 'image',
            render: (image) => {
                if (image) {
                    return (
                            <img
                                className='product-image'
                                src={image}
                                alt='Hình ảnh sản phẩm'
                                width={110}
                                height={110}
                                loading='lazy'
                            ></img>
                        )
                    } else return <></>;
                },
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'name',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => {
                return (
                    <>
                        <NumberFormat
                            value={price}
                            displayType="text"
                            thousandSeparator
                        />
                        <span style={{ fontSize: "0.75em" }}> VNĐ</span>
                    </>
                )
            }
        },
        {
            title: 'Số lượng tồn',
            key: 'quantity',
            dataIndex: 'remainingAmount',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (action, record) => (
                <>
                    <Link className='edit-btn' to={`/admin/product-management/${record.key}`}><FontAwesomeIcon icon={faEdit} /></Link>
                    <button className='delete-btn' onClick={() => deleteRecord(record.key)} disabled={disabled}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </>
            ),
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            if (!selectRecord) return;
            selectRecord(selectedRowKeys, selectedRows);
        },
    };

    return (<div>
        <Table
            rowSelection={noSelect ? (null) : ({
                type: "checkbox",
                ...rowSelection,
                })}
            columns={columns}
            dataSource={data}
            pagination={{ position: ["bottomCenter"], pageSize: pagination }}
        />
    </div>);
}

export default PMTable;