import { Table } from 'antd';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css"

EmployeeTable.propTypes = {};

function EmployeeTable(props) {
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
            title: 'Mã nhân viên',
            dataIndex: 'key',
            key: 'id',
        },
        {
            title: 'Tên nhân viên',
            dataIndex: 'employeeName',
            key: 'name',
        },
        {
            title: 'Địa chỉ',
            key: 'address',
            dataIndex: 'address',
        },
        {
            title: 'Số điện thoại',
            key: 'phone',
            dataIndex: 'phoneNumber'
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (action, record) => (
                <button className='delete-btn' onClick={() => deleteRecord(record.key)} disabled={disabled}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
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

export default EmployeeTable;
