import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    p_id: 1,
    p_name: hamburger,
    p_price: 75,
    p_category: 1,
    p_forsale: 1,
  });
});

export default router;
