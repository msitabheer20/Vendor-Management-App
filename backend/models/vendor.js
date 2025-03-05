import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: {
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
  businessName: {
    type: String,
    required: true
  },
  storeUrl: {
    type: String,
    required: function () { return this.isAdmin; }
  },
  accessToken: {
    type: String,
    required: function () { return this.isAdmin; }
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: function () { return this.isAdmin; }
  },
}, { timestamps: true });

export default mongoose.model("Vendor", vendorSchema);