import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import merchantRoutes from "./routes/merchantRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import reportRoutes from "./routes/reportRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Taiwan Reptile API Running")
})

app.use("/api/merchants", merchantRoutes)

app.use("/api/products", productRoutes)

app.use("/api/upload", uploadRoutes)

app.use("/api/report",reportRoutes)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {

    console.log("MongoDB Connected")

    app.listen(process.env.PORT, () => {

      console.log(`Server running on port ${process.env.PORT}`)

    })

  })
  .catch((err) => {

    console.log(err)

  })