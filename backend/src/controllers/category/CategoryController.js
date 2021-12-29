import CategoryModel from "../../models/CategoryModel.js";
import AppController from "../AppController.js";

export default class CategoryController extends AppController {
    constructor() {
        super();
        this.init();
    }

    init() {
        this._router.get("/categories", this.getAllCategories);
    }

    async getAllCategories(req, res) {
        try {
            const categoryList = await CategoryModel.getAllCategories();
            return res.json({ status: 200, data: categoryList });
        } catch (error) {
            console.log(error);
            return res.json({ status: 500 });
        }
    }
}
