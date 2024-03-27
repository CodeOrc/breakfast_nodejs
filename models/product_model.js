import mysql from "mysql2/promise";
import { pool } from "./db_connection_model.js";

export const product_model = {
  //取得所有產品
  getAllProduct: async (currentPage = 1, count = 25) => {
    try {
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
    } catch (err) {
      return {
        status: "fail",
        msg: err.message,
      };
    }
  },
  //依指定類別取得產品
  getProductByCategory: async (category = 1, currentPage = 1, count = 25) => {
    try {
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
    } catch (err) {
      return {
        status: "fail",
        msg: err.message,
      };
    }
  },
  //取得單筆產品
  getProduct: async (p_id) => {
    try {
      const [[row]] = await pool.execute(
        "SELECT `product`.*,GROUP_CONCAT(`product_tag`.tag_name)AS tags FROM `product` LEFT JOIN `product_tag_list` ON `product`.p_id=`product_tag_list`.p_id LEFT JOIN `product_tag` ON `product_tag_list`.`tag_no`=`product_tag`.`tag_no` WHERE`product`.`p_id` =? GROUP BY `product`.`p_id`; ",
        [p_id]
      );
      if (row) {
        row.tags = row.tags != null ? row.tags.split(",") : row.tags;
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
    try {
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
    } catch (err) {
      return {
        status: "fail",
        msg: err.message,
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
    //取得供應狀態
    try {
      const [[{ on_offer }]] = await pool.execute(
        "SELECT `on_offer` FROM `product` WHERE p_id = ?",
        [p_id]
      );
    } catch (err) {
      return {
        status: "fail",
        msg: err.message,
      };
    }
    //變更供應狀態
    try {
      const [row] = await pool.execute(
        "UPDATE `product` SET on_offer = ? WHERE p_id = ?",
        [on_offer > 0 ? 0 : 1, p_id]
      );
      return {
        status: "success",
        data: row,
        msg: "資料修改成功",
      };
    } catch (err) {
      return {
        status: "fail",
        msg: err.message,
      };
    }
  },
  //刪除產品
  deleteProduct: async (p_id) => {
    try {
      const [row] = await pool.execute("DELETE FROM `product` WHERE p_id = ?", [
        p_id,
      ]);
      return {
        status: "success",
        data: row,
        msg: "資料刪除成功",
      };
    } catch (err) {
      return {
        status: "fail",
        msg: err.message,
      };
    }
  },
};
