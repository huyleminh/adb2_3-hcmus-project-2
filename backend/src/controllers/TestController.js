import AppController from "./AppController.js";

export default class TestController extends AppController {
    constructor() {
        super();
        this.init();
    }

    init() {
        this._router.get("/test", (req, res) => {
            res.json("hello");
        });
    }
}
