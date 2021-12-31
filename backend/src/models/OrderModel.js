import KnexConnection from "../utils/KnexConnection.js";

export default class OrderModel {
    static getShippingInfoByOrderIdAndCustomerId(orderId, customerId) {
        return new Promise(async function (resolve, reject) {
            try {
                const resultSet = await KnexConnection("KhachHang")
                    .join("HoaDon", "KhachHang.MaKH", "=", "HoaDon.MaKH")
                    .where({
                        "HoaDon.MaHD": orderId,
                        "HoaDon.MaKH": customerId
                    })
                    .select(
                        { customerName: "KhachHang.TenKH"},
                        { phoneNumber: "KhachHang.SoDienThoai"},
                        { shippingAddress: "KhachHang.DiaChi" },
                    );
                
                resolve(resultSet);
            } catch (error) {
                reject(error);
            }
        });
    }

    static getByOrderIdAndCustomerId(orderId, customerId) {
        return new Promise(async function (resolve, reject) {
            try {
                const resultSet = await KnexConnection("HoaDon")
                    .join("KhachHang", "KhachHang.MaKH", "=", "HoaDon.MaKH")
                    .where({
                        "HoaDon.MaHD": orderId,
                        "HoaDon.MaKH": customerId,
                    })
                    .select(
                        { orderId: "HoaDon.MaHD" },
                        { customerName: "KhachHang.TenKH" },
                        { createdAt: "HoaDon.ThoiGianLap" },
                        { paymentMethod: "HoaDon.PTThanhToan" },
                        { totalPrice: "HoaDon.TongTien" },
                        { discount: "HoaDon.GiaGiam" },
                        { status: "HoaDon.TrangThai" },
                    );
            
                resolve(resultSet)
            } catch (error) {
                reject(error)
            }
        })
    }
}
