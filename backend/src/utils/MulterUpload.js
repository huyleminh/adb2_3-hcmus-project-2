import multer from "multer";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url)).replace("\\utils", "");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        try {
            cb(null, `${__dirname}/assets`);
        } catch (error) {
            console.log("Error:", error);
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

export { upload as ImageUpload };
