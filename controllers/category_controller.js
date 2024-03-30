import { product_model } from "../models/product_model.js";
export const category_controller = {
  getAllSubCategory: async (req, res) => {
    res.json(await product_model.getAllSubCategory());
  },
  createSubCategory: async (req, res) => {
    const { main_c_id, category_name } = req.body;
    res.json(await product_model.createSubCategory(main_c_id, category_name));
  },
  updateSubCategory: async (req, res) => {
    const { sub_c_id, main_c_id, category_name } = req.body;
    res.json(
      await product_model.updateSubCategory(sub_c_id, category_name, main_c_id)
    );
  },
  deleteSubCategory: async (req, res) => {
    res.json(await product_model.deleteSubCategory(req.query.sub_c_id));
  },
};
