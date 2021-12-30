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
}
