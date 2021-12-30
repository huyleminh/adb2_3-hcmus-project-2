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
}
