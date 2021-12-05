import { Button, Result } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import React from "react";
import { useHistory } from "react-router";

function NotFound(props) {
    const history = useHistory();

    const onGoBack = () => {
        history.goBack();
    };

    const onGoHome = () => {
        history.push("/");
    };

    return (
        <div className="error-page">
            <Result
                status="404"
                title="404"
                subTitle="Xin lỗi, trang bạn đang tìm kiếm không tồn tại."
                extra={
                    <ButtonGroup size="middle">
                        <Button type="default" onClick={onGoBack} style={{ marginRight: "10px" }}>
                            Quay lại
                        </Button>

                        <Button type="primary" onClick={onGoHome}>
                            Về trang chủ
                        </Button>
                    </ButtonGroup>
                }
            />
        </div>
    );
}

export default NotFound;
