import KnexConnection from "../utils/KnexConnection.js";

export default class CustomerModel {
    static insert(entity) {
        return new Promise(async function (resolve, reject) {
            try {
                const dataRes = await KnexConnection("KhachHang").insert(entity);
                resolve(dataRes);
            } catch (error) {
                reject(error);
            }
        });
    }

    static verifyUniquePhoneNumber(phoneNumber) {
        return new Promise(async function (resolve, reject) {
            try {
                const dataRes = await KnexConnection("KhachHang")
                    .where({
                        SoDienTHoai: phoneNumber,
                    })
                    .select("SoDienThoai");
                if (dataRes.length === 0) {
                    resolve(true);
                } else resolve(false);
            } catch (error) {
                reject(error);
            }
        });
    }

    static getByAccountId(accountId) {
        return new Promise(async function (resolve, reject) {
            try {
                const resultSet = await KnexConnection("KhachHang").where("MaTK", accountId);
                resolve(resultSet);
            } catch (error) {
                reject(error);
            }
        });
    }

    static getShippingInfoByCustomerId(customerId) {
        return new Promise(async function (resolve, reject) {
            try {
                const resultSet = await KnexConnection("KhachHang")
                    .where("MaKH", customerId)
                    .select(
                        { customerName: "TenKH" },
                        { phoneNumber: "SoDienThoai" },
                        { shippingAddress: "DiaChi" }
                    );
                resolve(resultSet);
            } catch (error) {
                reject(error);
            }
        });
    }
}
