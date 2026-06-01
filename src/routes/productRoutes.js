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

import adminMiddleware
from "../middleware/adminMiddleware.js"

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
  adminMiddleware,
  approveProduct
)


router.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  getAllProducts
)

router.patch(
  "/hide/:id",
  authMiddleware,
  adminMiddleware,
  hideProduct
)

router.patch(
  "/unhide/:id",
  authMiddleware,
  adminMiddleware,
  unhideProduct
)

export default router