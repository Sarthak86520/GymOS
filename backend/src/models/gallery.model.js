import mongoose from 'mongoose'

const gallerySchema = mongoose.Schema(
    {
  image: String,

  title: String,

  category: String
},{timestamps:true}
)

export const Gallery = mongoose.model('Gallery',gallerySchema)

