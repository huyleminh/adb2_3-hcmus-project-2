import { Spin } from "antd";
import PropTypes from "prop-types";
import React from "react";

Loading.propTypes = {
    style: PropTypes.object,
    size: PropTypes.string,
    tip: PropTypes.string,
};

Loading.defaultProps = {
    size: "large",
    tip: "Đang tải dữ liệu, vui lòng chờ trong giây lát",
};

function Loading(props) {
    const { style, size, tip } = props;
    return (
        <div style={style}>
            <Spin size={size} tip={tip} />
        </div>
    );
}

export default Loading;
