import { DownloadOutlined } from "@ant-design/icons";
import { Button, Select, Space, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";

function RevenuePage(props) {
    const [year, setYear] = useState(2021);
    const [data, setData] = useState([
        2478, 5267, 734, 784, 433, 2478, 5267, 734, 784, 433, 4689, 7513,
    ]);

    const ref = useRef();

    const handleExportChart = () => {
        if (!ref || !ref.current) {
            return;
        }
        const url = ref.current.toBase64Image();

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `thong-ke-doanh-thu-${year}`);
        link.click();
    };

    useEffect(() => {
        document.title = "Thống kê doanh thu";
    }, []);

    const CHART_CONFIG = {
        data: {
            labels: [
                "Tháng 1",
                "Tháng 2",
                "Tháng 3",
                "Tháng 4",
                "Tháng 5",
                "Tháng 6",
                "Tháng 7",
                "Tháng 8",
                "Tháng 9",
                "Tháng 10",
                "Tháng 11",
                "Tháng 12",
            ],
            datasets: [
                {
                    label: "Tổng tiền (VNĐ)",
                    backgroundColor: ["#1890ff"],
                    data: data,
                },
            ],
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Tổng doanh thu theo từng tháng (năm ${year})`,
                    position: "bottom",
                },
                legend: {
                    display: true,
                    position: "top",
                },
            },
        },
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography.Title level={3}>Thống kê doanh thu</Typography.Title>

            <Space direction="horizontal" align="baseline">
                <Typography.Title level={5}>Chọn năm cần xem thống kê</Typography.Title>

                <Select value={year} onChange={(value) => setYear(value)}>
                    {Array.from({ length: 23 }, (_, i) => 2000 + i)
                        .reverse()
                        .map((y) => (
                            <Select.Option key={y}>{y}</Select.Option>
                        ))}
                </Select>

                <Button type="primary" onClick={handleExportChart} icon={<DownloadOutlined />}>
                    Xuất hình ảnh
                </Button>
            </Space>
            <Bar
                data={{
                    ...CHART_CONFIG.data,
                }}
                options={{
                    ...CHART_CONFIG.options,
                }}
                ref={ref}
            />
        </div>
    );
}

export default RevenuePage;
