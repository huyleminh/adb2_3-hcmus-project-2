import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Table } from "antd";
import moment from "moment";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { ORDER_PAYMENT_TAGS, ORDER_STATUS_TAGS } from "../../shared/OrderTableConfig";
import "./styles.css";

InvoiceTable.propTypes = {};

function InvoiceTable(props) {
    const { data, pagination, disabled, isEmployee, selectRecord, handleOneRecord } = props;

    const columns = [
        {
            title: "#",
            dataIndex: "no",
            key: "no",
        },
        {
            title: "Mã đơn hàng",
            dataIndex: "orderId",
            key: "orderId",
        },
        {
            title: "Ngày lập",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => {
                return moment(date).utcOffset(0).format("DD/MM/YYYY HH:mm:ss");
            },
        },
        {
            title: "Phương thức thanh toán",
            dataIndex: "paymentMethod",
            key: "paymentMethod",
            render: (paymentMethod) => {
                return ORDER_PAYMENT_TAGS[paymentMethod];
            },
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            render: (status) => ORDER_STATUS_TAGS[status],
        },
        {
            title: "Giá giảm",
            key: "discount",
            dataIndex: "discount",
            render: (discount) => {
                return (
                    <>
                        <NumberFormat value={discount} displayType="text" thousandSeparator />
                        <span style={{ fontSize: "0.75em" }}> VNĐ</span>
                    </>
                );
            },
        },
        {
            title: "Giá trị đơn hàng",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (total) => {
                return (
                    <>
                        <NumberFormat value={total} displayType="text" thousandSeparator />
                        <span style={{ fontSize: "0.75em" }}> VNĐ</span>
                    </>
                );
            },
        },
    ];

    if (isEmployee) {
        columns.push({
            title: "Hành động",
            key: "action",
            render: (action, record) => (
                <button
                    className="delete-btn"
                    onClick={() => handleOneRecord(record.key)}
                    disabled={disabled}
                >
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            ),
        });
    } else {
        columns.push({
            title: "Hành động",
            key: "action",
            render: (action, record) => (
                <Button type="primary">
                    <Link to={`/profile/history/${record.key}`}>Chi tiết</Link>
                </Button>
            ),
        });
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            if (!selectRecord) return;
            selectRecord(selectedRowKeys, selectedRows);
        },
    };

    const mappedData = !data
        ? []
        : data.map((item, index) => {
              return {
                  ...item,
                  no: index + 1,
                  key: item.orderId,
              };
          });

    return (
        <div>
            <Table
                rowSelection={
                    !isEmployee
                        ? null
                        : {
                              type: "checkbox",
                              ...rowSelection,
                          }
                }
                columns={columns}
                dataSource={mappedData}
                pagination={{ position: ["bottomCenter"], pageSize: pagination }}
                bordered
            />
        </div>
    );
}

export default InvoiceTable;
