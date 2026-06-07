import mongoose from "mongoose"

const reportSchema = new mongoose.Schema({

  type:{

    type:String,

    default:"bug"

  },

  message:{

    type:String,

    required:true

  },

  image:{

    type:String,

    default:""

  },

  status:{

    type:String,

    enum:[
      "pending",
      "processing",
      "resolved"
    ],

    default:"pending"

  }

},{
  timestamps:true
})

export default mongoose.model(
  "Report",
  reportSchema
)