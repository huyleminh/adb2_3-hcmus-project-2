import AuthMiddleware from "../../middlewares/AuthMiddleware.js";
import CartModel from "../../models/CartModel.js";
import AppController from "../AppController.js";

export default class CartController extends AppController {
    constructor() {
        super();
        this.init();
    }

    init() {
        this._router.get("/cart", AuthMiddleware.verifyToken, this.getCustomerCart);

        this._router.post("/cart", AuthMiddleware.verifyToken, this.postAddCustomerCart);

        this._router.put("/cart/:id", AuthMiddleware.verifyToken, this.editCustomerCart);

        this._router.delete("/cart/:id", AuthMiddleware.verifyToken, this.deleteCustomerCartItem);
    }

    async getCustomerCart(req, res) {
        const { token } = res.locals;
        const userId = token.id;

        // Get cart id by userId
        try {
            const [cart] = await CartModel.getCartIdByUserId(userId);
            if (cart === undefined) {
                return res.json({ status: 400, message: "Không tìm thấy giỏ hàng" });
            }

            const cartItems = await CartModel.getCartItemsByCartId(cart.MaGH);
            if (cartItems.length === 0) {
                return res.json({ status: 200, data: { cartId: cart.MaGH, cartItems: [] } });
            }
            const mappedCartItems = cartItems.map((item) => {
                return {
                    productId: item.MaSP,
                    productName: item.TenSP,
                    price: item.DonGia,
                    imageLink: item.HinhAnh,
                    quantity: item.SoLuong,
                };
            });
            return res.json({
                status: 200,
                data: { cartId: cart.MaGH, cartItems: mappedCartItems },
            });
        } catch (error) {
            console.log(error);
            return res.json({ status: 500 });
        }
    }

    async postAddCustomerCart(req, res) {
        const { token, payload } = res.locals;
        const userId = token.id;

        // Get cart id by userId
        try {
            const [cart] = await CartModel.getCartIdByUserId(userId);
            let cartId;
            if (cart === undefined) {
                // Create new cart
                cartId = await CartModel.insertNewCart(userId)[0];
            } else {
                cartId = cart.MaGH;
            }

            const productId = payload.productId;
            const [existingItem] = await CartModel.getCartItemByCartIdAndProductId(cartId, productId);
            if (existingItem === undefined) {
                // insert new cart item
                const cartItem = { MaGH: cartId, MaSP: productId, SoLuong: parseInt(payload.quantity) };
                await CartModel.insertNewCartItem(cartItem);        
            } else {
                // update existing cart item
                const quantity = existingItem.quantity + parseInt(payload.quantity);
                await CartModel.updateQuantity(cartId, productId, quantity);
            }

            return res.json({ status: 201 });
        } catch (error) {
            console.log(error);
            return res.json({ status: 500 });
        }
    }

    async editCustomerCart(req, res) {
        const { payload } = res.locals;
        const { id } = req.params;

        try {
            await CartModel.updateQuantity(id, payload.productId, parseInt(payload.quantity));
            return res.json({ status: 200 });
        } catch (error) {
            console.log(error);
            return res.json({ status: 500 });
        }
    }

    async deleteCustomerCartItem(req, res) {
        const { payload } = res.locals;
        const { id } = req.params;

        try {
            await CartModel.deleteCartItem(id, payload.productId);

            return res.json({ status: 200 });
        } catch (error) {
            console.log(error);
            return res.json({ status: 500 });
        }
    }
}
