import AppController from "../AppController.js";
import AuthMiddlewares from "../../middlewares/AuthMiddleware.js";
import OrderModel from "../../models/OrderModel.js";

export default class OrderController extends AppController {
    constructor() {
        super();
        this.init();
    }

    init() {
        this._router.get("/order/shipping-info/:orderId", AuthMiddlewares.verifyToken, this.getShippingInfo);
    }

    async getShippingInfo(req, res) {
        const { orderId } = res.locals.params;

        try {
            const customerId = res.locals.token.specifierRoleId
            const [shippingInfo] = await OrderModel.getShippingInfoByOrderIdAndCustomerId(orderId, customerId);

            if (shippingInfo === undefined)
                res.json({ status: 400, message: "Không tìm thấy đơn hàng" })
            else
                res.json({ status: 200, data: shippingInfo })   
        } catch (error) {
            res.json({ status: 500 });
        }
    }
}
