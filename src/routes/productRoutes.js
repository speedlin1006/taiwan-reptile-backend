import express from "express"

import {
  createProduct,
  getProducts,
  getMyProducts,
  deleteProduct,
  updateProduct,
  getProductById,
  getProductsByMerchant,
  approveProduct,
  getAllProducts,
  hideProduct,
  unhideProduct
}

from "../controllers/productController.js"

import authMiddleware
from "../middleware/authMiddleware.js"

const router = express.Router()


// 所有商品
router.get(
  "/",
  getProducts
)


// 我的商品
router.get(
  "/my-products",
  authMiddleware,
  getMyProducts
)


// 同店家商品
router.get(
  "/store/:merchantId",
  getProductsByMerchant
)


// 單商品
router.get(
  "/:id",
  getProductById
)


// 新增商品
router.post(
  "/",
  authMiddleware,
  createProduct
)


// 刪除商品
router.delete(
  "/:id",
  authMiddleware,
  deleteProduct
)


// 修改商品
router.put(
  "/:id",
  authMiddleware,
  updateProduct
)

router.patch(
  "/approve/:id",
  authMiddleware,
  approveProduct
)


router.get(
  "/admin/all",
  authMiddleware,
  getAllProducts
)

router.patch(
  "/hide/:id",
  authMiddleware,
  hideProduct
)

router.patch(
  "/unhide/:id",
  authMiddleware,
  unhideProduct
)

export default router