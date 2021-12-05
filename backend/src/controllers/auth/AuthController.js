import jwt from "jsonwebtoken";
import AppConstants from "../../shared/AppConstants.js";
import AppController from "../AppController.js";

export default class AuthController extends AppController {
    constructor() {
        super();
        this.init();
    }

    init() {
        this._router.get("/auth/verify", this.verifyToken);
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

            return res.json({ status: 200, message: "Verify Ok", data: data.role });
        });
    }
}
