import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import Merchant from "../models/Merchant.js"

export const testMerchant = async (req, res) => {

  try {

    res.json({
      message: "Merchant API Working"
    })

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }

}

export const registerMerchant = async (req, res) => {

  try {

    const {
        shopName,
        ownerName,
        email,
        password,
        merchantType,
        city,
        district,
        address,
        instagram,
        facebook,
        shopee,
        description,
        mainTypes,
        logo,
        banner
        } = req.body

    const existingMerchant = await Merchant.findOne({ email })

    if (existingMerchant) {

      return res.status(400).json({
        message: "Email already exists"
      })

    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const merchant = await Merchant.create({

        shopName,

        ownerName,

        email,

        password: hashedPassword,

        merchantType,

        city,

        district,

        address,

        instagram,

        facebook,

        shopee,

        description,

        mainTypes,

        logo,

        banner

    })
    console.log(merchant)
    res.status(201).json({

      message: "Merchant registered successfully",

      merchant: {

        id: merchant._id,

        shopName: merchant.shopName,

        email: merchant.email,

        role: merchant.role

      }

    })

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }

}

export const loginMerchant = async (req, res) => {

  try {

    const { email, password } = req.body

    const merchant = await Merchant.findOne({ email })

    if (!merchant) {

      return res.status(400).json({
        message: "Merchant not found"
      })

    }

    const isMatch = await bcrypt.compare(
      password,
      merchant.password
    )

    if (!isMatch) {

      return res.status(400).json({
        message: "Wrong password"
      })

    }

    /* status */

    if(merchant.status === "pending"){

      return res.status(403).json({

        message:
          "帳號審核中"

      })

    }

    if(merchant.status === "suspended"){

      return res.status(403).json({

        message:
          "帳號已停權"

      })

    }

    if(merchant.status === "banned"){

      return res.status(403).json({

        message:
          "帳號已封鎖"

      })

    }

    const token = jwt.sign(

      {
        merchantId: merchant._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    )

    res.json({

      message: "Login success",

      token,

      merchant: {

        id: merchant._id,

        shopName: merchant.shopName,

        email: merchant.email,

        role: merchant.role

      }

    })

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }

}

export const getProfile = async (req, res) => {

  try {

    const merchant = await Merchant.findById(
      req.merchantId
    ).select("-password")

    res.json(merchant)

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }

}

// 單店家
export const getMerchantById = async (req, res) => {

  try {

    const merchant = await Merchant.findById(
      req.params.id
    )

    if (!merchant) {

      return res.status(404).json({
        message: "找不到店家"
      })

    }

    res.json(merchant)

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }

}

// 更新商家資料
export const updateProfile = async (req, res) => {

  try {

    const merchant = await Merchant.findById(
      req.merchantId
    )

    if (!merchant) {

      return res.status(404).json({
        message: "Merchant not found"
      })

    }

    const {

      shopName,
      ownerName,
      merchantType,
      city,
      district,
      address,
      instagram,
      facebook,
      shopee,
      description,
      mainTypes,
      logo,
      banner

    } = req.body

    merchant.shopName =
      shopName ?? merchant.shopName

    merchant.ownerName =
      ownerName ?? merchant.ownerName

    merchant.merchantType =
      merchantType ?? merchant.merchantType

    merchant.city =
      city ?? merchant.city

    merchant.district =
      district ?? merchant.district

    merchant.address =
      address ?? merchant.address

    merchant.instagram =
      instagram ?? merchant.instagram

    merchant.facebook =
      facebook ?? merchant.facebook

    merchant.shopee =
      shopee ?? merchant.shopee

    merchant.description =
      description ?? merchant.description

    merchant.mainTypes =
      mainTypes ?? merchant.mainTypes

    merchant.logo =
      logo ?? merchant.logo

    merchant.banner =
      banner ?? merchant.banner

    await merchant.save()

    res.json({

      message: "Profile updated",

      merchant

    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      message: err.message
    })

  }

}

export const updateMerchantStatus = async (req, res) => {

  try {

    const merchant = await Merchant.findById(
      req.params.id
    )

    if(!merchant){

      return res.status(404).json({

        message: "找不到商家"

      })

    }

    merchant.status = req.body.status

    await merchant.save()

    res.json({

      message: "狀態更新成功",

      merchant

    })

  } catch (err) {

    console.log(err)

    res.status(500).json({

      message: err.message

    })

  }

}