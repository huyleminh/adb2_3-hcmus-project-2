import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

BestSellingPage.propTypes = {};

function BestSellingPage(props) {
    return (
        <Result
            status="warning"
            title="Tính năng đang phát triển!"
            subTitle="Chúng tôi rất tiếc vì sự bất tiện này, vui lòng quay lại sau!"
            extra={[
                <Button type="primary">
                    <Link to="/manager/statistic/revenue">Thống kê doanh thu</Link>
                </Button>,
                <Button href="/" type="default">
                    Về shop
                </Button>,
            ]}
        />
    );
}

export default BestSellingPage;
