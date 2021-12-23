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
}
