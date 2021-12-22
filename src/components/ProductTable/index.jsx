import { Table, InputNumber } from 'antd';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import "./styles.css"

ProductTable.propTypes = {};

function ProductTable(props) {
    const {
        data,
        pagination,
        disabled,
        infoOnly,
        selectRecord,
        deleteRecord,
        changeQuantity
    } = props;

    const columns = [
        {
          title: '',
          dataIndex: 'srcImage',
          key: 'image',
          render: (image) => {
              if (image) {
                  return (
                        <img
                            className='product-image'
                            src={image}
                            alt='Hình ảnh sản phẩm'
                            width={infoOnly ? (150) : (200)}
                            height={infoOnly ? (150) : (200)}
                            loading='lazy'
                        >
                        </img>
                    )
                } else return <></>;
            },
        },
        {
          title: 'Tên sản phẩm',
          dataIndex: 'productName',
          key: 'name',
          render: (name, record) => {
              return (<Link to={`/menu/products/${record.key}`}>{name}</Link>);
          }
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
          title: 'Số lượng',
          key: 'quantity',
          dataIndex: 'quantity',
          render: (value, record) => (
            <InputNumber min={1} value={value} disabled={disabled || infoOnly} onChange={(value) => changeQuantity(value, record)} />
          ),
        },
        {
            title: 'Thành tiền',
            key: 'totalPrice',
            render: (total, record) => {
                return (
                  <div style={{ color:"red" }}>
                      <NumberFormat
                          value={record.price * record.quantity}
                          displayType="text"
                          thousandSeparator
                      />
                      <span style={{ fontSize: "0.75em" }}> VNĐ</span>
                  </div>
                )
            }
        },
    ];

    if (!infoOnly) {
        columns.push(
            {
                title: 'Hành động',
                key: 'action',
                render: (action, record) => (
                    <button className='delete-btn' onClick={() => deleteRecord(record.key)} disabled={disabled}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                ),
            }
        )
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            if (!selectRecord) return;
            selectRecord(selectedRowKeys, selectedRows);
        },
    };

    return (<div>
        <Table
            rowSelection={infoOnly ? (null) : ({
                type: "checkbox",
                ...rowSelection,
                })}
            columns={columns}
            dataSource={data}
            pagination={{ position: ["bottomCenter"], pageSize: pagination }}
        />
    </div>);
}

export default ProductTable;