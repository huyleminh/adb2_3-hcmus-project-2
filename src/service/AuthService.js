export default class AuthService {
    static getUserToken() {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.access_token) {
            return null;
        }

        return user.access_token;
    }

    static setUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    static removeUser(user) {
        localStorage.removeItem("user");
    }

    static isLogin() {
        const token = AuthService.getUserToken();
        if (!token) {
            return false;
        }

        return true;
    }
}
