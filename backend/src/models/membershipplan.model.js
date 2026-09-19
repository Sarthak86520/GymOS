import mongoose from 'mongoose';

const memebershipplanSchema = mongoose.Schema(
    {
  name: String,

  duration: Number, // months

  price: Number,

  description: String,

  features: [String],

  isActive: {
    type: Boolean,
    default: true
  }
},{timestamps:true}
)

const Membershipplan = mongoose.model('Membershipplan',memebershipplanSchema)
export default Membershipplan