import Announcement
from "../models/Announcement.js"

// 取得公告

export const getAnnouncements =
async (req, res) => {

  try{

    const announcements =

      await Announcement.find({

        active:true

      })

      .sort({

        createdAt:-1

      })

      .limit(3)

    res.json(
      announcements
    )

  }catch(err){

    console.log(err)

    res.status(500).json({

      message:
        err.message

    })

  }

}

// 新增公告

export const createAnnouncement =
async (req, res) => {

  try{

    const count =

      await Announcement.countDocuments()

    if(count >= 3){

      return res.status(400).json({

        message:
          "最多只能建立三則公告"

      })

    }

    const announcement =

      await Announcement.create({

        content:
          req.body.content

      })

    res.status(201).json(
      announcement
    )

  }catch(err){

    console.log(err)

    res.status(500).json({

      message:
        err.message

    })

  }

}

export const deleteAnnouncement =
async (req, res) => {

  try{

    await Announcement.findByIdAndDelete(

      req.params.id

    )

    res.json({

      success:true

    })

  }catch(err){

    console.log(err)

    res.status(500).json({

      message:
        err.message

    })

  }

}