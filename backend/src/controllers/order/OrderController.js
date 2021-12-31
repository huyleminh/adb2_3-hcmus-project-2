import AppController from "../AppController.js";
import AuthMiddlewares from "../../middlewares/AuthMiddleware.js";
import OrderModel from "../../models/OrderModel.js";
import OrderDetailModel from "../../models/OrderDetailModel.js";

export default class OrderController extends AppController {
    constructor() {
        super();
        this.init();
    }

    init() {
        this._router.get("/customer/shipping-info/:orderId", AuthMiddlewares.verifyToken, this.getShippingInfo);
        this._router.get("/employee/order-detail/:orderId", AuthMiddlewares.verifyToken, this.getByOrderId);

        this._router.get("/statistic/revenue/:year", AuthMiddlewares.verifyToken, this.getRevenueDataByYear);
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
        } catch {
            res.json({ status: 500 });
        }
    }

    async getByOrderId(req, res) {
        const { orderId } = res.locals.params

        try {
            const customerId = res.locals.token.specifierRoleId
            const [orderInfo] = await OrderModel.getByOrderIdAndCustomerId(orderId, customerId)

            if (orderInfo === undefined)
                res.json({ status: 400, message: "Không tìm thấy đơn hàng" })
            else {
                const orderDetail = await OrderDetailModel.getByOrderId(orderId);

                if (orderDetail === undefined)
                    res.json({ status: 400, message: "Không tìm thấy đơn hàng" })
                else
                    res.json({ status: 200, data: { orderInfo, orderDetail } })
            }
        } catch {
            res.json({ status: 500 })
        }
    }

    async getRevenueDataByYear(req, res) {
        const { year } = req.params;
        const { token } = res.locals;
        if (token.role !== 2) {
            return res.json({ status: 403, message: "Nhân viên không có quyền xem thống kê" });
        }

        try {
            const revenue = await OrderModel.getRevenueByYear(year);

            const data = new Array(12).fill(0);

            revenue.forEach(element => {
                const month = element.Thang;
                data[month - 1] = element.TongTien
            });

            return res.json({ status: 200, data });
        } catch (error) {
            console.log(error);
            return res.json({ status: 500 });
        }
    }
}
