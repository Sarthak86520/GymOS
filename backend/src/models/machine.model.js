import mongoose from 'mongoose'

const machineSchema = mongoose.Schema(
    {
  name: String,

  description: String,

  muscleGroup: [String],

  image: String,

  quantity: Number,

  isAvailable: Boolean
},{timestamps:true}
)

const Machine = mongoose.model('Machine',machineSchema)
export default Machine