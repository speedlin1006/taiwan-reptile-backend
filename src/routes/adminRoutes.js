import express from "express"

import Merchant
from "../models/Merchant.js"

import Product
from "../models/Product.js"

const router = express.Router()

// 所有商家
router.get(
  "/merchants",
  async (req, res) => {

    try {

      const merchants =
      await Merchant.find()
      .select("-password")
      .sort({
        createdAt: -1
      })

      res.json(merchants)

    } catch (err) {

      res.status(500).json({
        message: err.message
      })

    }

  }
)

// 刪除商家
router.delete(
  "/merchant/:id",
  async (req, res) => {

    try {

      const merchant =
      await Merchant.findById(
        req.params.id
      )

      if(

        merchant.role === "admin"

        ){

        return res.status(403).json({

            message:
            "管理員帳號不可刪除"

        })

        }

      if(!merchant){

        return res.status(404).json({

          message:"找不到商家"

        })

      }

      // 同步刪除商品
      await Product.deleteMany({

        merchant:
        req.params.id

      })

      // 刪除商家
      await Merchant.findByIdAndDelete(
        req.params.id
      )

      res.json({

        message:
        "商家已刪除"

      })

    } catch (err) {

      console.log(err)

      res.status(500).json({

        message: err.message

      })

    }

  }
)

export default router