import express from "express"
import nodemailer from "nodemailer"

const router = express.Router()

router.post("/", async (req, res) => {

  try{

    const { message } = req.body

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
        message

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