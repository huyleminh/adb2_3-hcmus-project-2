import KnexConnection from "../utils/KnexConnection.js";

export default class OrderDetailModel {
    static getByOrderId(orderId) {
        return new Promise(async function (resolve, reject) {
            try {
                const resultSet = await KnexConnection('SPHoaDon')
                    .join("SanPham", "SanPham.MaSP", "=", "SPHoaDon.MaSP")
                    .where("SPHoaDon.MaHD", orderId)
                    .select(
                        { productId: "SanPham.MaSP" },
                        { productName: "SanPham.TenSP" },
                        { srcImage: "SanPham.HinhAnh" },
                        { quantity: "SPHoaDon.SoLuongMua" },
                        { price: "SPHoaDon.GiaBan" },
                    )
            
                resolve(resultSet)
            } catch (error) {
                reject(error)
            }
        })
    }
}
