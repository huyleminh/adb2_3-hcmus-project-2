import KnexConnection from "../utils/KnexConnection.js";

export default class CartModel {
    static getCartIdByUserId(id) {
        return new Promise(async function (resolve, reject) {
            try {
                const dataRes = await KnexConnection.select().from("GioHang").where({
                    MaTK: id,
                });
                resolve(dataRes);
            } catch (error) {
                reject(error);
            }
        });
    }

    static getCartItemByCartIdAndProductId(cartId, productId) {
        return new Promise(async function (resolve, reject) {
            try {
                const resultSet = await KnexConnection('SPGioHang')
                    .where({
                        MaGH: cartId,
                        MaSP: productId
                    })
                    .select(
                        { cartId: "MaGH" },
                        { productId: "MaSP" },
                        { quantity: "SoLuong" },
                    )

                resolve(resultSet);
            } catch (error) {
                reject(error);
            }
        });
    }

    static getCartItemsByCartId(id) {
        return new Promise(async function (resolve, reject) {
            try {
                const dataRes = await KnexConnection.raw(`
                    select gh.MaSP, SoLuong, TenSP, MoTa, DonGia, HinhAnh
                    from (
                        select MaSP, SoLuong
                        from SPGioHang
                        where MaGH = ${id}
                    ) as gh join SanPham sp on gh.MaSP = sp.MaSP`);

                resolve(dataRes);
            } catch (error) {
                reject(error);
            }
        });
    }

    static insertNewCart(userId) {
        return new Promise(async function (resolve, reject) {
            try {
                const dataRes = await KnexConnection("GioHang")
                    .insert({ MaTK: userId })
                    .returning("MaGH");

                resolve(dataRes);
            } catch (error) {
                reject(error);
            }
        });
    }

    static insertNewCartItem(entity) {
        return new Promise(async function (resolve, reject) {
            try {
                const dataRes = await KnexConnection("SPGioHang").insert(entity);

                resolve(dataRes);
            } catch (error) {
                reject(error);
            }
        });
    }

    static updateQuantity(cartId, productId, quantity) {
        return new Promise(async function (resolve, reject) {
            try {
                const dataRes = await KnexConnection("SPGioHang")
                    .where({
                        MaGH: cartId,
                        MaSP: productId,
                    })
                    .update({
                        SoLuong: quantity,
                    });

                resolve(dataRes);
            } catch (error) {
                reject(error);
            }
        });
    }

    static deleteCartItem(cartId, productId) {
        return new Promise(async function (resolve, reject) {
            try {
                const dataRes = await KnexConnection("SPGioHang")
                    .where({
                        MaGH: cartId,
                        MaSP: productId,
                    })
                    .del();

                resolve(dataRes);
            } catch (error) {
                reject(error);
            }
        });
    }
}
