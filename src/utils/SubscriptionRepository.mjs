import * as shortid from 'shortid'
import mongoose from 'mongoose'

const SubscriptionSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  email: String,
  plan: String,
  price: Number,
})

export const SubscriptionModel = mongoose.model('Subscription', SubscriptionSchema)

export const seed = async () => {
  //should clear the db always
  await SubscriptionModel.deleteMany({})

  //we insert the seed data
  await SubscriptionModel.create({ email: 'existing@email.com', plan: 'unknown', price: 209.32 })
  await SubscriptionModel.create({ email: 'new@email.com', plan: 'unknown', price: 209.32 })
}
