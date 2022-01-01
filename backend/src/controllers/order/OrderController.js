import AuthMiddlewares from "../../middlewares/AuthMiddleware.js";
import AccountModel from "../../models/AccountModel.js";
import CustomerModel from "../../models/CustomerModel.js";
import OrderDetailModel from "../../models/OrderDetailModel.js";
import OrderModel from "../../models/OrderModel.js";
import AppController from "../AppController.js";

export default class OrderController extends AppController {
    constructor() {
        super();
        this.init();
    }

    init() {
        // this._router.get("/customer/shipping-info/:orderId", AuthMiddlewares.verifyToken, this.getShippingInfo);
        this._router.get("/customer/shipping-info", AuthMiddlewares.verifyToken, this.getShippingInfo);
        this._router.post("/customer/order/checkout", AuthMiddlewares.verifyToken, this.postCheckoutOrder);
        this._router.get("/employee/order-detail/:orderId", AuthMiddlewares.verifyToken, this.getByOrderId);
        this._router.post("/employee/order/confirm", AuthMiddlewares.verifyToken, this.postConfirmOrder);

        this._router.get("/statistic/revenue/:year", AuthMiddlewares.verifyToken, this.getRevenueDataByYear);
    }

    async getShippingInfo(req, res) {
        if (res.locals.token.role !== AccountModel.ROLE_VALUES.USER) {
            return res.json({ status: 403, meesage: "Bạn không được phép truy cập chức năng này" })
        }

        try {
            // const { orderId } = res.locals.params;
            const customerId = res.locals.token.specifierRoleId
            // const [shippingInfo] = await OrderModel.getShippingInfoByOrderIdAndCustomerId(orderId, customerId);
            const [shippingInfo] = await CustomerModel.getShippingInfoByCustomerId(customerId);

            if (shippingInfo === undefined)
                res.json({ status: 400, message: "Không tìm thấy đơn hàng" })
            else
                res.json({ status: 200, data: shippingInfo })
        } catch {
            res.json({ status: 500 });
        }
    }

    async postCheckoutOrder(req, res) {
        const token = res.locals.token
        if (token.role !== AccountModel.ROLE_VALUES.USER) {
            return res.json({ status: 403, meesage: "Bạn không được phép truy cập chức năng này" })
        }

        try {
            const { shippingAddress, productList, extra } = res.locals.payload

            // Get current datetime
            const now = new Date(Date.now())
            const dateSqlFormat = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
            const timeSqlFormat = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`

            // Compute total price
            let totalPrice = 0
            productList.forEach(product => totalPrice += product.quantity * product.price)

            const orderEntity = {
                MaKH: token.specifierRoleId,
                ThoiGianLap: dateSqlFormat + " " + timeSqlFormat,
                PTThanhToan: extra.paymentMethod,
                GiaGiam: extra.discount,
                TrangThai: OrderModel.STATUS.NEW_ORDER,
                DiaChiGiaoHang: shippingAddress,
            }
            await OrderModel.insert(orderEntity)

            const [item] = await OrderModel.getMaxOrderIdByCustomerId(token.specifierRoleId)
            const orderDetailEntities = productList.map(product => {
                return {
                    MaHD: item.orderId,
                    MaSP: product.productId,
                    SoLuongMua: product.quantity,
                    GiaBan: product.price,
                }
            })
            await OrderDetailModel.insertList(orderDetailEntities)

            res.json({ status: 201 })
        } catch (error) {
            console.log(error)
            res.json({ status: 500 })
        }
    }

    async getByOrderId(req, res) {
        if (res.locals.token.role !== AccountModel.ROLE_VALUES.EMPLOYEE) {
            return res.json({ status: 403, meesage: "Bạn không được phép truy cập chức năng này" })
        }

        try {
            const { orderId } = res.locals.params
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

    async postConfirmOrder(req, res) {
        if (res.locals.token.role !== AccountModel.ROLE_VALUES.EMPLOYEE) {
            return res.json({ status: 403, meesage: "Bạn không được phép truy cập chức năng này" })
        }

        try {
            const { orderId, status } = res.locals.payload
            await OrderModel.updateStatus(orderId, status)
            res.json({ status: 201 })
        } catch {
            res.json({ status: 500 })
        }
    }

    async getRevenueDataByYear(req, res) {
        const { year } = req.params;
        const { token } = res.locals;
        if (token.role !== AccountModel.ROLE_VALUES.MANAGER) {
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
