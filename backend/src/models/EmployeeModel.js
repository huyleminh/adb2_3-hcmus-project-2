import KnexConnection from "../utils/KnexConnection.js";

export default class EmployeeModel {
    static getByAccountId(accountId) {
        return new Promise(async function (resolve, reject) {
            try {
                const resultSet = await KnexConnection("NhanVien").where("MaTK", accountId);
                resolve(resultSet);
            } catch (error) {
                reject(error);
            }
        });
    }

    static checkExistingPhoneNumber(phoneNumber) {
        return new Promise(async function (resolve, reject) {
            try {
                const resultSet = await KnexConnection("NhanVien").where("SDTNhanVien", phoneNumber)
                resolve(resultSet.length !== 0);
            } catch (error) {
                reject(error);
            }
        });
    }

    static insert(entity) {
        return new Promise(async function (resolve, reject) {
            try {
                const resultSet = await KnexConnection("NhanVien").insert(entity)
                resolve(resultSet)
            } catch (error) {
                reject(error)
            }
        })
    }
}
