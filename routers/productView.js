import express from "express";
const router = express.Router();
import { product_model } from "../models/product_model.js";

router.get("/productList", async (req, res) => {
  let { category, page, count } = req.query;
  category = category ? category : "all";
  page = page > 0 ? page : 1;
  count = count > 0 ? count : 25;

  const dbRes =
    category == "all"
      ? await product_model.getAllProduct(page, count)
      : await product_model.getProductByCategory(category, page, count);

  if (dbRes.status == "success") {
    return res.render("productList", {
      title: "產品列表",
      ...dbRes,
      page: page,
      category: category,
    });
  }

  res.redirect("/test");
});
export default router;
