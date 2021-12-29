import CategoryModel from "../../models/CategoryModel.js";
import ProductModel from "../../models/ProductModel.js";
import FirsebaseService from "../../services/FirsebaseService.js";
import { ImageUpload } from "../../utils/MulterUpload.js";
import AppController from "../AppController.js";

const MAX_PRODUCTS_PER_PAGE = 12;

export default class ProductController extends AppController {
    constructor() {
        super();
        this.init();
    }

    init() {
        this._router.post("/products/upload", ImageUpload.single("image"), this.upload);

        this._router.get("/products/:id", this.getProductById);
        this._router.get("/products", this.getProductByPage);
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

    async getProductById(req, res) {
        const { id } = req.params;

        try {
            const products = await ProductModel.getProductById(Number.parseInt(id));
            if (products.length === 0) {
                return res.json({ status: 400, message: "Không tìm thấy sản phẩm" });
            }
            const product = products[0];

            const catName = await CategoryModel.getCategoryById(product.MaLoai);
            delete product.SoLuongTon;
            delete product.MaLoai;
            product.categoryName = catName;

            return res.json({ status: 200, data: product });
        } catch (error) {
            console.log(error);
            return res.json({ status: 500 });
        }
    }

    async getProductByPage(req, res) {
        if (req.query.page === undefined)
            return res.json({ status: 500 });
        
        try {        
            const limit = (req.query.limit !== undefined) ? parseInt(req.query.limit) : MAX_PRODUCTS_PER_PAGE;
            const countProduct = await ProductModel.count();
            const totalProducts = countProduct[0].count;

            const page = parseInt(req.query.page);
            const offset = (page - 1) * limit;
            const products = await ProductModel.getRangeProducts(offset, limit);
            const productsMapped = products.map(product => {
                return {
                    productId: product.MaSP,
                    productName: product.TenSP,
                    price: product.DonGia,
                    imageLink: product.HinhAnh,
                }
            });

            return res.json({
                status: 200,
                data: {
                    products: productsMapped,
                    pagination: {page, limit, totalProducts}
                }
            })
        } catch {
            res.json({ status: 500 });
        }
    }
}
