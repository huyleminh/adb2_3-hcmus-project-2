import AuthController from "./auth/AuthController.js";
import ProductController from "./product/ProductController.js";

//New controllers will be added to this object.
const AppControllers = [new AuthController(), new ProductController()];
export default AppControllers;
