import Product from "../models/Product.js"
import Merchant from "../models/Merchant.js"

export const createProduct = async (req, res) => {

  try {

    console.log("=== create product ===")
    console.log(req.body)
    console.log("merchantId:", req.merchantId)

    const {
        name,
        category,
        tags,
        description,
        price,
        stock,
        status,
        images,
        video
    } = req.body
    const product = await Product.create({

      merchant: req.merchantId,

      name,
      category,
      tags,
      description,
      price,
      stock,
      status,
      images,
      video

    })

    res.status(201).json({

      message: "Product created",

      product

    })

  } catch (err) {

    console.log("=== CREATE PRODUCT ERROR ===")
    console.log(err)

    res.status(500).json({
      message: err.message
    })

  }

}

export const getProducts = async (req, res) => {

  try {

    const products = await Product.find({

        status: "on"

        })

        .populate(
        "merchant",
        "shopName"
        )

        .sort({
        createdAt: -1
        })

    res.json(products)

  } catch (err) {

    console.log(err)

    res.status(500).json({
      message: err.message
    })

  }

}

export const getMyProducts = async (req, res) => {

  try {

    const products = await Product.find({

      merchant: req.merchantId

    })

    .sort({
      createdAt: -1
    })

    res.json(products)

  } catch (err) {

    console.log(err)

    res.status(500).json({
      message: err.message
    })

  }

}

export const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    )

    if (!product) {

      return res.status(404).json({
        message: "Product not found"
      })

    }

    // 檢查是不是自己的商品
    if (
      product.merchant.toString()
      !==
      req.merchantId
    ) {

      return res.status(403).json({
        message: "No permission"
      })

    }

    await product.deleteOne()

    res.json({
      message: "Product deleted"
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      message: err.message
    })

  }

}

export const updateProduct = async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    )

    if (!product) {

      return res.status(404).json({
        message: "Product not found"
      })

    }

    // 檢查權限
    if (
      product.merchant.toString()
      !==
      req.merchantId
    ) {

      return res.status(403).json({
        message: "No permission"
      })

    }

    const {
        name,
        category,
        tags,
        description,
        price,
        stock,
        status,
        images,
        video
    } = req.body
    product.name =
      name ?? product.name

    product.category =
      category ?? product.category

    product.tags =
        tags ?? product.tags

    product.description =
      description ?? product.description

    product.price =
      price ?? product.price

    product.stock =
      stock ?? product.stock

    product.status =
      status ?? product.status

    product.images =
      images ?? product.images

    product.video =
        video ?? product.video

    await product.save()

    res.json({

      message: "Product updated",

      product

    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      message: err.message
    })

  }

}

// 單商品
export const getProductById = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id)

      .populate(
        "merchant",
        "shopName logo instagram facebook shopee description"
      )

    if (!product) {

      return res.status(404).json({
        message: "找不到商品"
      })

    }

    res.json(product)

  } catch (err) {

    console.log(err)

    res.status(500).json({
      message: err.message
    })

  }

}


// 同店家商品
export const getProductsByMerchant = async (req, res) => {

  try {

    const products = await Product.find({

      merchant: req.params.merchantId,
      status: "on"

    })

    .sort({
      createdAt: -1
    })

    res.json(products)

  } catch (err) {

    console.log(err)

    res.status(500).json({
      message: err.message
    })

  }

}

// 快速上下架
export const toggleProductStatus = async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    )

    if (!product) {

      return res.status(404).json({
        message: "Product not found"
      })

    }

    // 權限檢查
    if (
      product.merchant.toString()
      !==
      req.merchantId
    ) {

      return res.status(403).json({
        message: "No permission"
      })

    }

    // 切換狀態
    product.status =
      product.status === "on"
        ? "off"
        : "on"

    await product.save()

    res.json({

      message: "Status updated",

      status: product.status

    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      message: err.message
    })

  }

}