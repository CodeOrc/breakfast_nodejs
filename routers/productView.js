import express from "express";
const router = express.Router();
import { product_model } from "../models/product_model.js";

router.get("/productList", async (req, res) => {
  let { category, page, count } = req.query;
  category = category ? category : "all";
  page = page > 0 ? page : 1;
  count = count > 0 ? count : 25;
  const sub_category_list = await product_model.getAllSubCategory();
  const dbRes =
    category == "all"
      ? await product_model.getAllProduct(page, count)
      : await product_model.getProductByCategory(category, page, count);

  if (dbRes.status == "success" && sub_category_list.status == "success") {
    return res.render("productList", {
      title: "產品列表",
      ...dbRes,
      page: page,
      category: category,
      sub_category_list: sub_category_list.data,
    });
  }

  res.redirect("/test");
});

router.get("/productDetail", async (req, res) => {
  const p_id = req.query.p_id;
  const sub_category_list = await product_model.getAllSubCategory();
  const dbRes = await product_model.getProduct(p_id);
  if (dbRes.status == "success" && sub_category_list.status == "success") {
    return res.render("productDetail", {
      title: "產品詳情",
      ...dbRes,
      sub_category_list: sub_category_list.data,
    });
  }

  res.redirect("/test");
});
export default router;
