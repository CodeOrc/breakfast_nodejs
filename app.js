import express from "express";
import productRouter from "./routers/product.js";
const app = express();
const port = process.eventNames.Port || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/product", productRouter);

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
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`app started on port ${port}`);
});
