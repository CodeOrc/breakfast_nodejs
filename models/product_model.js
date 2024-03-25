import mysql from "mysql2/promise";
import { pool } from "./db_connection_model.js";

export const product_model = {
  //取得所有產品
  getAllProduct: async (currentPage = 1, count = 25) => {
    const [[{ totalCount }]] = await pool.execute(
      "SELECT COUNT(p_id) AS totalCount FROM `product`"
    );
    const [rows] = await pool.execute(
      "SELECT * FROM `product` LIMIT ? OFFSET ? ",
      [, count, count * (currentPage - 1)]
    );
    return {
      status: "success",
      data: rows,
      totalCount: totalCount,
      totalPage: Math.ceil(totalCount / count),
      msg: "取得資料",
    };
  },
  //取得指定類別產品
  getProductByCategory: async (category = 1, currentPage = 1, count = 25) => {
    const [[{ totalCount }]] = await pool.execute(
      "SELECT COUNT(p_id) AS totalCount FROM `product` WHERE sub_category = ?",
      [category]
    );
    const [rows] = await pool.execute(
      "SELECT * FROM `product` WHERE sub_category = ? LIMIT ? OFFSET ? ",
      [category, count, count * (currentPage - 1)]
    );
    return {
      status: "success",
      data: rows,
      totalCount: totalCount,
      totalPage: Math.ceil(totalCount / count),
      msg: "取得資料",
    };
  },
  //取得單筆產品
  getProduct: async (p_id) => {
    try {
      const [[row]] = await pool.execute(
        "SELECT * FROM `product` WHERE p_id = ?",
        [p_id]
      );
      if (row) {
        return {
          status: "success",
          data: row,
          msg: "取得資料",
        };
      } else {
        return {
          status: "fail",
          data: row,
          msg: "無資料",
        };
      }
    } catch (error) {
      return {
        status: "fail",
        msg: error.message,
      };
    }
  },
  //新增產品
  createProduct: async (product_name, price, category_id, desc = "") => {
    try {
      const [row] = await pool.execute(
        "INSERT INTO `product` (`product_name`, `price`, `sub_category`, `desc`) VALUES (?, ?, ?, ?) ",
        [product_name, price, category_id, desc]
      );
      if (row.affectedRows > 0) {
        return {
          status: "success",
          data: { insertId: row.insertId },
          msg: "新增資料成功",
        };
      } else {
        return {
          status: "fail",
          msg: "資料未新增",
        };
      }
    } catch (err) {
      return {
        status: "fail",
        msg: err.message,
      };
    }
  },
  //更新產品資料
  updateProduct: async (p_id, product_name, price, category_id, desc) => {
    const [row] = await pool.execute(
      "UPDATE `product` SET `product_name` = ?, `price` = ?, `sub_category` = ?, `desc` = ? WHERE `product`.`p_id` = ? ",
      [product_name, price, category_id, desc, p_id]
    );
    if (row.affectedRows > 0) {
      return {
        status: "success",
        data: row,
        msg: "修改資料成功",
      };
    } else {
      return {
        status: "fail",
        msg: "資料未修改",
      };
    }
  },
  //更新產品圖片
  updateProductImg: async (p_id, img) => {
    try {
      const [row] = await pool.execute(
        "UPDATE `product` SET `img` = ? WHERE `product`.`p_id` = ? ",
        [img, p_id]
      );
      if (row.affectedRows > 0) {
        return {
          status: "success",
          data: row,
          msg: "資料修改成功",
        };
      } else {
        return {
          status: "fail",
          data: row,
          msg: "資料未變動",
        };
      }
    } catch (err) {
      return {
        status: "fail",
        msg: err.message,
      };
    }
  },
  //切換產品供應狀態
  toggleProductOffer: async (p_id) => {
    const [p] = await pool.execute(
      "SELECT `on_offer` FROM `product` WHERE p_id = ?",
      [p_id]
    );
    const [row] = await pool.execute(
      "UPDATE `product` SET on_offer = ? WHERE p_id = ?",
      [p > 0 ? 0 : 1, p_id]
    );
    return row;
  },
  //刪除產品
  deleteProduct: async (p_id) => {
    const [row] = await pool.execute(
      "UPDATE `product` SET on_offer = 1 WHERE p_id = ?",
      [p_id]
    );
    return row;
  },
};
