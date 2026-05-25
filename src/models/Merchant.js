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

  role: {

    type: String,

    enum: [

      "merchant",
      "admin"

    ],

    default: "merchant"

  }

}, {
  timestamps: true
})

export default mongoose.model(
  "Merchant",
  merchantSchema
)