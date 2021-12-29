import KnexConnection from "../utils/KnexConnection.js";

export default class ProductModel {
    static getAllProducts() {
        return new Promise(async function (resolve, reject) {
            try {
                const allProducts = await KnexConnection.select().from("SanPham");
                resolve(allProducts);
            } catch (error) {
                reject(error);
            }
        });
    }

    static getProductById(id) {
        return new Promise(async function (resolve, reject) {
            try {
                const product = await KnexConnection.select().from("SanPham").where({
                    MaSP: id,
                });
                resolve(product);
            } catch (error) {
                reject(error);
            }
        });
    }

    static getRangeProducts(offset, count) {
        return new Promise(async function  (resolve, reject) {
            try {
                const sqlStatement = `select * 
                    from SanPham
                    order by MaSP
                    offset ${offset} rows 
                    fetch next ${count} rows only`;

                const allProducts = await KnexConnection.raw(sqlStatement);
                resolve(allProducts);
            } catch (error) {
                reject(error);
            }
        });
    }

    static count() {
        return new Promise(async function (resolve, reject) {
            try {
                const productCount = await KnexConnection('SanPham').count("*", {as: 'count'});
                resolve(productCount);
            } catch (error) {
                reject(error);
            }
        })
    }
}
