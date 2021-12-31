import jwt from "jsonwebtoken";
import AuthMiddlewares from "../../middlewares/AuthMiddleware.js";
import AccountModel from "../../models/AccountModel.js";
import CustomerModel from "../../models/CustomerModel.js";
import EmployeeModel from "../../models/EmployeeModel.js";
import AppConstants from "../../shared/AppConstants.js";
import AppController from "../AppController.js";

const ROLE_VALUES = { ADMIN: 1, MANAGER: 2, EMPLOYEE: 3, USER: 4 };

export default class AuthController extends AppController {
    constructor() {
        super();
        this.init();
    }

    init() {
        this._router.get("/auth/verify", this.verifyToken);

        this._router.post("/auth/login", this.postLogin);

        this._router.post("/auth/signup", AuthMiddlewares.verifySignupData, this.postSignup);

        this._router.post("/admin/create-account", AuthMiddlewares.verifyToken, this.postCreateEmployeeAccount);
    }

    // Every time user access to private page, this handler will be called
    verifyToken(req, res) {
        const headers = req.headers;
        const authorization = headers.authorization;

        if (!authorization) {
            return res.json({ status: 401, message: "Not authorized" });
        }

        const authTokens = authorization.split(" ");
        if (!authTokens || authTokens.length !== 2) {
            return res.json({ status: 401, message: "Not authorized" });
        }

        jwt.verify(authTokens[1], AppConstants.SECRET_KEY, function (err, data) {
            if (err) {
                return res.json({ status: 403, message: err });
            }

            return res.json({ status: 200, message: "Verify Ok", data: { role: data.role } });
        });
    }

    async postLogin(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.json({ status: 400, message: "Missing data" });
        }

        try {
            const users = await AccountModel.getAllByUsernameAndPassword(username, password);
            if (users.length === 0) {
                return res.json({ status: 401 });
            }

            let specifierRoleId;
            if (users[0].VaiTro == ROLE_VALUES.EMPLOYEE) {
                const [employee] = await EmployeeModel.getByAccountId(users[0].MaTK);
                if (employee !== undefined)
                    specifierRoleId = employee.MaNV;
            } else {
                const [customer] = await CustomerModel.getByAccountId(users[0].MaTK);
                if (customer !== undefined)
                    specifierRoleId = customer.MaKH;
            }

            // Login ok
            // Generate access_token
            const token = jwt.sign(
                {
                    username: users[0].TenNguoiDung,
                    role: users[0].VaiTro,
                    id: users[0].MaTK,
                    specifierRoleId
                },
                AppConstants.SECRET_KEY,
                { expiresIn: "1h" }
            );

            let expiredIn = new Date();
            expiredIn.setMinutes(expiredIn.getMinutes() + 60);
            expiredIn = expiredIn.valueOf();

            return res.json({
                status: 200,
                data: {
                    access_token: token,
                    expired_in: expiredIn,
                    role: users[0].VaiTro,
                },
            });
        } catch (error) {
            console.log(error);
            return res.json({ status: 500 });
        }
    }

    async postSignup(req, res) {
        const { payload } = res.locals;

        try {
            const oldUser = await AccountModel.getAllByUsername(payload.username);
            if (oldUser.length !== 0) {
                return res.json({ status: 400, message: "Người dùng đã tồn tại" });
            }

            const isPhoneValid = await CustomerModel.verifyUniquePhoneNumber(payload.phoneNumber);
            if (!isPhoneValid) {
                return res.json({ status: 400, message: "Số điện thoại này đã tồn tại" });
            }

            // Username is valid
            // Insert new account
            const accountId = await AccountModel.insert({
                TenNguoiDung: payload.username,
                MatKhau: payload.password,
                VaiTro: 4,
            });

            const customer = {
                TenKH: payload.fullname,
                SoDienThoai: payload.phoneNumber,
                MaTK: accountId[0],
            };

            if (payload.address) {
                customer.DiaChi = payload.address;
            }

            await CustomerModel.insert(customer);

            return res.json({ status: 201 });
        } catch (error) {
            console.log(error);
            return res.json({ status: 500 });
        }
    }

    async postCreateEmployeeAccount(req, res) {
        const payload = res.locals.payload
        if (res.locals.token.role !== 1) {
            return res.json({ status: 403, meesage: "Bạn không được phép truy cập chức năng này" })
        }

        try {
            const [existingAccount] = await AccountModel.getAllByUsername(payload.username);
            if (existingAccount !== undefined) {
                return res.json({ status: 400, message: "Người dùng này đã tồn tại " })
            }

            const isExistingPhoneNumber = await EmployeeModel.checkExistingPhoneNumber(payload.phoneNumber);
            if (isExistingPhoneNumber) {
                return res.json({ status: 400, message: "Số điện thoại này đã tồn tại" })
            }

            const [accountId] = await AccountModel.insert({
                TenNguoiDung: payload.username,
                MatKhau: payload.password,
                VaiTro: parseInt(payload.role)
            })

            await EmployeeModel.insert({
                TenNV: payload.name,
                DiaChiNV: payload.address,
                SDTNhanVien: payload.phoneNumber,
                MaTK: accountId
            })

            res.json({ status: 201 })
        } catch (error) {
            console.log(error)
            res.json({ status: 500 })
        }
    }
}
