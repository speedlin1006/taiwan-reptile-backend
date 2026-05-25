import mongoose from "mongoose"

import dotenv from "dotenv"

import Product
from "./src/models/Product.js"

dotenv.config()

await mongoose.connect(

  process.env.MONGODB_URI

)

await Product.deleteMany({})

console.log("商品已全部刪除")

process.exit()