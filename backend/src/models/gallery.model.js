import mongoose from 'mongoose'

const gallerySchema = mongoose.Schema(
    {
  image: String,

  title: String,

  category: String
},{timestamps:true}
)

const Gallery = mongoose.model('Gallery',gallerySchema)

export default Gallery