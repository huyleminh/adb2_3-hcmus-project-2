import FirsebaseService from "../../services/FirsebaseService.js";
import { ImageUpload } from "../../utils/MulterUpload.js";
import AppController from "../AppController.js";

export default class ProductController extends AppController {
    constructor() {
        super();
        this.init();
    }

    init() {
        this._router.post("/products/upload", ImageUpload.single("image"), this.upload);
    }

    upload(req, res) {
        const image = req.file;
        const pathFile = image.path;
        const type = image.mimetype.split("/")[1];

        console.log({ image, body: req.body });

        FirsebaseService.uploadImage(pathFile, type)
            .then((url) => {
                res.json({ status: 200, message: "Ok", data: { url } });
            })
            .catch((err) => {
                res.json({ status: 500, message: "Upload error", data: err });
            });
    }
}
