import express from "express"
import nodemailer from "nodemailer"
import Report from "../models/Report.js"

const router = express.Router()

router.post("/", async (req, res) => {

  try{

    const {

      type,
      message,
      image

    } = req.body
    let typeText = ""

    switch(type){

      case "bug":
        typeText = "Bug回報"
        break

      case "suggestion":
        typeText = "功能建議"
        break

      case "product":
        typeText = "檢舉商品"
        break

      case "merchant":
        typeText = "檢舉商家"
        break

      default:
        typeText = "其他問題"

    }
    await Report.create({

      type,

      message,

      image

    })

    // Gmail transporter
    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {

          user:
            process.env.GMAIL_USER,

          pass:
            process.env.GMAIL_PASS

        }

      })

    // send
    await transporter.sendMail({

      from:
        process.env.GMAIL_USER,

      to:
        "speedlin10060106@gmail.com",

      subject:
        "台灣爬寵情報｜問題回報",


      text:
      `
      台灣爬寵情報｜問題回報

      ＝＝＝＝＝＝＝＝＝＝

      問題類型：
      ${typeText}

      ＝＝＝＝＝＝＝＝＝＝

      回報內容：

      ${message}

      ＝＝＝＝＝＝＝＝＝＝

      圖片：

      ${image || "無"}

      `

    })

    res.json({
      success:true
    })

  }catch(err){

    console.log(err)

    res.status(500).json({
      error:"寄送失敗"
    })

  }

})

export default router