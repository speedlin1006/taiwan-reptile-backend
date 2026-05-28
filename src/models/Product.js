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

  // 商品審核狀態
  status: {

    type: String,

    enum: [

      "pending",
      "active",
      "rejected",
      "hidden"

    ],

    default: "pending"

  },

  // 審核回覆訊息
  reviewMessage: {

    type: String,

    default: ""

  },

  // 審核時間
  reviewedAt: {

    type: Date

  },

  // 哪位 admin 審核
  reviewedBy: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "Merchant"

  },

  // feed 置頂
  isPinned: {

    type: Boolean,

    default: false

  },

  // feed 推薦
  isRecommended: {

    type: Boolean,

    default: false

  },

  // 瀏覽數
  views: {

    type: Number,

    default: 0

  },

  // 喜歡數
  likes: {

    type: Number,

    default: 0

  }

}, {

  timestamps: true

})

export default mongoose.model(
  "Product",
  productSchema
)