import express from "express"

import multer from "multer"

import { CloudinaryStorage }
from "multer-storage-cloudinary"

import cloudinary
from "../config/cloudinary.js"

const router = express.Router()

const storage =
  new CloudinaryStorage({

    cloudinary,

    params: {

      folder: "taiwan-reptile-app"

    }

  })

const upload = multer({
  storage
})

router.post(
  "/",
  upload.single("image"),

  (req, res) => {

    res.json({

      imageUrl: req.file.path

    })

  }
)

export default router