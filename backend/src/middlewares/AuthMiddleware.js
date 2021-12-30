import jwt from "jsonwebtoken";
import AppConstants from "../shared/AppConstants.js";

export default class AuthMiddlewares {
    static verifySignupData(req, res, next) {
        const { fullname, phoneNumber, address, username, password } = req.body;

        if (
            !fullname ||
            !phoneNumber ||
            !username ||
            !password ||
            !fullname.trim() ||
            !phoneNumber.trim() ||
            !username.trim() ||
            !password.trim()
        ) {
            return res.json({ status: 400, message: "Thiếu thông tin đăng kí" });
        }

        res.locals.payload = {
            fullname,
            phoneNumber,
            address,
            username,
            password,
        };

        next();
    }

    static verifyToken = (req, res, next) => {
        const authorization = req.headers.authorization;

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

            res.locals.token = data;
            res.locals.payload = req.body;
            res.locals.query = req.query;
            res.locals.params = req.params;
            
            next();
        });
    };
}
