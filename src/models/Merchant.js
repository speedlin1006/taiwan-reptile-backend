import mongoose from "mongoose"

const merchantSchema = new mongoose.Schema({

  shopName: {

    type: String,

    required: true

  },

  ownerName: {

    type: String,

    required: true

  },

  email: {

    type: String,

    required: true,

    unique: true

  },

  password: {

    type: String,

    required: true

  },

  merchantType: {

    type: String,

    enum: [

      "physical",
      "online"

    ],

    required: true

  },

  city: {

    type: String,

    required: true

  },

  district: {

    type: String,

    required: true

  },

  address: {

    type: String,

    default: ""

  },

  instagram: {

    type: String,

    default: ""

  },

  facebook: {

    type: String,

    default: ""

  },

  shopee: {

    type: String,

    default: ""

  },

  description: {

    type: String,

    default: ""

  },

  mainTypes: [

    String

  ],

  logo: {

    type: String,

    default: ""

  },

  banner: {

    type: String,

    default: ""

  },

  verified: {

    type: Boolean,

    default: false

  },

  status: {

    type: String,

    enum: [

      "pending",
      "active",
      "suspended",
      "banned",
      "rejected"

    ],

    default: "pending"

  },

  role: {

    type: String,

    enum: [

      "merchant",
      "admin"

    ],

    default: "merchant"

  },

  failedLoginCount: {

    type: Number,

    default: 0

  },

  lockUntil: {

    type: Date,

    default: null

  },

  lastLoginAt: {

    type: Date,

    default: null

  },

  emailVerified: {

  type: Boolean,

  default: false

  },

  emailVerifyToken: {

    type: String,

    default: ""

  },

  appliedAt: {

    type: Date,

    default: Date.now

  }

}, {

  timestamps: true

})

export default mongoose.model(

  "Merchant",

  merchantSchema

)