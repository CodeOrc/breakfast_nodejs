import express from "express";
import multer from "multer";
import { product_controller } from "../controllers/product_controller.js";
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/imgs");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "_" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});
const update = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
      req.msg = "請上傳jpg,png,webp檔案";
      cb(null, false);
    } else {
      cb(null, true);
    }
  },
});

router.get("/", product_controller.getAllproduct);
router.get("/:p_id", product_controller.getProduct);
router.post("/", update.single("picture"), product_controller.createProduct);
router.put("/", product_controller.updateProduct);
router.put(
  "/updateImg",
  update.single("picture"),
  product_controller.updateProductImg
);
router.delete("/", product_controller.toggleProductOffer);
router.delete("/DeleteProduct", product_controller.deleteProduct);
export default router;
