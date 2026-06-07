import Report from "../models/Report.js"

export const createReport = async (req, res) => {

  try{

    const {

      type,
      message

    } = req.body

    const report =
      await Report.create({

        type,

        message

      })

    res.status(201).json({

      success:true,

      report

    })

  }catch(err){

    console.log(err)

    res.status(500).json({

      success:false,

      message:err.message

    })

  }

}