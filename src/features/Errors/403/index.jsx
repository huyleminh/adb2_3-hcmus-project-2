import { Button, Result } from "antd";
import React from "react";

function Forbidden(props) {
    return (
        <div className="error-page">
            <Result
                status="403"
                title="403"
                subTitle="Xin lỗi, bạn không có quyền truy cập trang này."
                extra={
                    <Button type="primary" href="/" size="middle">
                        Về trang chủ
                    </Button>
                }
            />
        </div>
    );
}

export default Forbidden;
