import * as shortid from 'shortid'
import mongoose from 'mongoose'

const SubscriptionSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  email: String,
  plan: String,
  price: String,
})

export const SubscriptionModel = mongoose.model('Subscription', SubscriptionSchema)
