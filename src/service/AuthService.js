export default class AuthService {
    static getUserToken() {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.token) {
            return null;
        }

        return user.token;
    }
}
