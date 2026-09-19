import mongoose from 'mongoose'

const paymentSchema = mongoose.Schema(
    {
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member"
  },

  membership: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Membership"
  },

  amount: Number,

  status: {
    type: String,
    enum: ["pending", "success", "failed"]
  },

  razorpayOrderId: String,

  razorpayPaymentId: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
},{timestamps:true}
)

const Payment = mongoose.model('Payment',paymentSchema)

export default Payment