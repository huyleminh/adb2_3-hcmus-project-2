import { Table, Tag } from 'antd';
import {
    CheckCircleOutlined,
    SyncOutlined,
    MinusCircleOutlined,
} from '@ant-design/icons';
import { faTrashAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import "./styles.css"

InvoiceTable.propTypes = {};

function InvoiceTable(props) {
    const tags = {
        done: (<Tag icon={<CheckCircleOutlined />} color="success">Hoàn tất</Tag>),
        processing: (<Tag icon={<SyncOutlined spin />} color="warning">Đang xử lý</Tag>),
        delivery: (<Tag icon={<SyncOutlined spin />} color="processing">Đang giao hàng</Tag>),
        cancel: (<Tag icon={<MinusCircleOutlined />} color="error">Đã hủy</Tag>)
    }

    const {
        data,
        pagination,
        disabled,
        isEmployee,
        selectRecord,
        handleOneRecord,
    } = props;

    const columns = [
        {
          title: 'Mã hóa đơn',
          dataIndex: 'key',
          key: 'id',
        },
        {
          title: 'Giá trị hóa đơn',
          dataIndex: 'totalPrice',
          key: 'total',
          render: (total) => {
            return (
              <>
                  <NumberFormat
                      value={total}
                      displayType="text"
                      thousandSeparator
                  />
                  <span style={{ fontSize: "0.75em" }}> VNĐ</span>
              </>
            )
        }
        },
        {
          title: 'Ngày lập',
          dataIndex: 'createdAt',
          key: 'createDate',
        },
        {
          title: 'Trạng thái',
          key: 'status',
          dataIndex: 'status',
          render: (status) => (
            tags[status]
          ),
        }
    ];

    if (isEmployee) {
        columns.push(
            {
                title: 'Hành động',
                key: 'action',
                render: (action, record) => (
                    <button className='delete-btn' onClick={() => handleOneRecord(record.key)} disabled={disabled}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                ),
            }
        )
    } else {
        columns.push(
            {
                title: 'Hành động',
                key: 'action',
                render: (action, record) => (
                    <Link to={`/profile/history/${record.key}`}>
                        <FontAwesomeIcon className='view-detail-btn' icon={faInfoCircle} />
                    </Link>
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
            rowSelection={!isEmployee ? (null) : ({
                type: "checkbox",
                ...rowSelection,
                })}
            columns={columns}
            dataSource={data}
            pagination={{ position: ["bottomCenter"], pageSize: pagination }}
            bordered
        />
    </div>);
}

export default InvoiceTable;