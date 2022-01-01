import KnexConnection from "../utils/KnexConnection.js";

export default class AccountModel {
    static ROLE_VALUES = { ADMIN: 1, MANAGER: 2, EMPLOYEE: 3, USER: 4 };

    static getAllByUsernameAndPassword(username, password) {
        return new Promise(async function (resolve, reject) {
            try {
                const dataRes = await KnexConnection.select().from("TaiKhoan").where({
                    TenNguoiDung: username,
                    MatKhau: password,
                });
                resolve(dataRes);
            } catch (error) {
                reject(error);
            }
        });
    }

    static getAllByUsername(username) {
        return new Promise(async function (resolve, reject) {
            try {
                const dataRes = await KnexConnection.select().from("TaiKhoan").where({
                    TenNguoiDung: username,
                });
                resolve(dataRes);
            } catch (error) {
                reject(error);
            }
        });
    }

    static insert(entity) {
        return new Promise(async function (resolve, reject) {
            try {
                const dataRes = await KnexConnection("TaiKhoan").insert(entity).returning("MaTK");
                resolve(dataRes);
            } catch (error) {
                reject(error);
            }
        });
    }
}
