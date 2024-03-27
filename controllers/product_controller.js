import { product_model } from "../models/product_model.js";
import fs from "fs";

export const product_controller = {
  getAllproduct: async (req, res) => {
    let { category, page, count } = req.query;
    category = category ? category : "all";
    page = page > 0 ? page : 1;
    count = count > 0 ? count : 25;

    category == "all"
      ? res.json(await product_model.getAllProduct(page, count))
      : res.json(
          await product_model.getProductByCategory(category, page, count)
        );
  },
  getProduct: async (req, res) => {
    res.json(await product_model.getProduct(req.params.p_id));
  },
  createProduct: async (req, res) => {
    const product_name = req.body.product_name;
    const price = req.body.price;
    const category_id = req.body.category_id;
    const desc = req.body.desc;
    const dbRespond = await product_model.createProduct(
      product_name,
      price,
      category_id,
      desc
    );
    if (req.file) {
      const newFileName =
        dbRespond.data.insertId +
        "_" +
        Date.now() +
        req.file.filename.slice(req.file.filename.lastIndexOf("."));
      fs.rename(
        req.file.destination + "/" + req.file.filename,
        req.file.destination + "/" + newFileName,
        function (err) {
          if (err) {
            return console.error(err);
          }
          console.log("更改名稱完成");
        }
      );
      await product_model.updateProductImg(
        dbRespond.data.insertId,
        newFileName
      );
    }
    res.json(dbRespond);
  },
  updateProduct: async (req, res) => {
    const p_id = req.body.p_id;
    const product_name = req.body.product_name;
    const price = req.body.price;
    const category_id = req.body.category_id;
    const desc = req.body.desc;
    console.log({ ...req.body });
    res.json(
      await product_model.updateProduct(
        p_id,
        product_name,
        price,
        category_id,
        desc
      )
    );
  },
  updateProductImg: async (req, res) => {
    const p_id = req.body.p_id;
    const p = await product_model.getProduct(p_id);
    if (p.status == "fail" || !p.data) {
      return res.json(p);
    }
    if (req.file) {
      const newFileName =
        p_id +
        "_" +
        Date.now() +
        req.file.filename.slice(req.file.filename.lastIndexOf("."));
      fs.rename(
        req.file.destination + "/" + req.file.filename,
        req.file.destination + "/" + newFileName,
        function (err) {
          if (err) {
            return console.error(err);
          }
        }
      );
      fs.unlink(req.file.destination + "/" + p.data.img, function (err) {
        if (err) {
          return console.error(err);
        }
      });
      return res.json(await product_model.updateProductImg(p_id, newFileName));
    }
    return res.json({ status: "fail", msg: "請上傳圖檔" });
  },
  toggleProductOffer: async (req, res) => {
    console.log(req.query.p_id);
    res.json(await product_model.toggleProductOffer(req.query.p_id));
  },
  deleteProduct: async (req, res) => {
    res.json(await product_model.deleteProduct(req.query.p_id));
  },
};
