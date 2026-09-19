import mongoose from 'mongoose'

const testimonialSchema = mongoose.Schema(
    {
  name: String,

  image: String,

  message: String,

  rating: Number,

  isApproved: {
    type: Boolean,
    default: false
  }
},{timestamps:true}
)

const Testimonial = mongoose.model('Testimonial',testimonialSchema)

export default Testimonial