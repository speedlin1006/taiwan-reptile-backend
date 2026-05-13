import express from "express"

import {
  testMerchant,
  registerMerchant,
  loginMerchant,
  getProfile,
  getMerchantById,
  updateProfile
}

from "../controllers/merchantController.js"

import authMiddleware
from "../middleware/authMiddleware.js"

const router = express.Router()


// 測試
router.get(
  "/test",
  testMerchant
)


// 註冊
router.post(
  "/register",
  registerMerchant
)


// 登入
router.post(
  "/login",
  loginMerchant
)


// 個人資料
router.get(
  "/profile",
  authMiddleware,
  getProfile
)

// 更新商家資料
router.put(
  "/profile",
  authMiddleware,
  updateProfile
)

// 單店家
router.get(
  "/:id",
  getMerchantById
)

export default router