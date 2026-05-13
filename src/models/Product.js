import mongoose from "mongoose"

const productSchema = new mongoose.Schema({

  merchant: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "Merchant",

    required: true

  },

  name: {

    type: String,

    required: true

  },

  // 真正分類
  category: {

    type: String,

    enum: [

      "澤龜",
      "陸龜",
      "守宮",
      "蜥蜴",
      "兩棲",
      "蛇類",

      "飼料",
      "器材",

      "水族"

    ],

    required: true

  },

  // 情報標籤
  tags: [

    {

      type: String,

      enum: [

        "到貨",
        "優惠"

      ]

    }

  ],

  description: {

    type: String

  },

  price: {

    type: Number,

    required: true

  },

  stock: {

    type: Number,

    default: 0

  },

  // 圖片
  images: [

    String

  ],

  // 影片
  video: {

    type: String,

    default: ""

  },

  status: {

    type: String,

    enum: [

      "on",
      "off"

    ],

    default: "on"

  }

}, {

  timestamps: true

})

export default mongoose.model(
  "Product",
  productSchema
)