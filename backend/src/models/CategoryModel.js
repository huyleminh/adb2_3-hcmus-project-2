import KnexConnection from "../utils/KnexConnection.js";

export default class CategoryModel {
    static getAllCategories() {
        return new Promise(async function (resolve, reject) {
            try {
                const allCats = await KnexConnection("LoaiSanPham");
                resolve(allCats);
            } catch (error) {
                reject(error);
            }
        });
    }

    static getCategoryById(id) {
        return new Promise(async function (resolve, reject) {
            try {
                const allCats = await KnexConnection.select()
                    .from("LoaiSanPham")
                    .where({ MaLoai: id });
                resolve(allCats);
            } catch (error) {
                reject(error);
            }
        });
    }
}
