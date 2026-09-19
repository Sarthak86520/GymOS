import mongoose from 'mongoose'

const membershipSchema = mongoose.Schema(
    {
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member"
  },

  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MembershipPlan"
  },

  startDate: Date,

  endDate: Date
},{timestamps:true}
)

const Membership = mongoose.model('Membership',membershipSchema)

export default Membership