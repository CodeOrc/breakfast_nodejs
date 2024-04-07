import express from "express";
import "dotenv/config";
import productRouter from "./routers/product.js";
import categoryRouter from "./routers/category.js";
import productViewRouter from "./routers/productView.js";
const app = express();
const port = process.eventNames.Port || 3000;

//view引擎
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/", productViewRouter);
//test view
app.get("/test", (req, res) => {
  res.render("test", { title: "測試頁" });
});

//404用戶端錯誤
app.use((req, res) => {
  res.status(404);
  res.send("404-找不到資料");
});
//500伺服器錯誤
app.use((req, res) => {
  res.status(500);
  res.send("伺服器發生錯誤");
});
app.use((req, res) => {});
app.use((req, res) => {});

//binding
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`啟動，port號為 ${port}`);
});
