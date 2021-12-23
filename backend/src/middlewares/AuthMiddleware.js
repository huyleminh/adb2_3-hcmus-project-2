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
}
