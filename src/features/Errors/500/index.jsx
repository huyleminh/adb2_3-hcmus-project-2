import { Button, Result } from "antd";
import React from "react";

function InternalError(props) {
    return (
        <div className="error-page">
            <Result
                status="500"
                title="500"
                subTitle="Xin lỗi, đã có lỗi hệ thống xảy ra."
                extra={
                    <Button type="primary" href="/" size="middle">
                        Về trang chủ
                    </Button>
                }
            />
        </div>
    );
}

export default InternalError;