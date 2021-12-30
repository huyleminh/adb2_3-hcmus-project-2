import AuthController from "./auth/AuthController.js";
import ProductController from "./product/ProductController.js";
import CategoryController from "./category/CategoryController.js";
import OrderController from "./order/OrderController.js";

//New controllers will be added to this object.
const AppControllers = [new AuthController(), new ProductController(), new CategoryController(), new OrderController()];
export default AppControllers;
