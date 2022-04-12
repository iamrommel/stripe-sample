import mongoose from 'mongoose'

export const initDb = async () => {
  await mongoose.connect(process.env.MONGO_URL)
  console.log('done connection')
}
