import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
   {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  phone: String,
  dateOfBirth: Date,
  gender: String,
  address: String,

  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer"
  }
},
{timestamps: true}
)

const Member = mongoose.model('Member', memberSchema);
export default Member;