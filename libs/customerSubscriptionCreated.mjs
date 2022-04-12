import { SubscriptionModel } from '../utils/SubscriptionRepository.mjs'
import { stripe } from '../utils/stripe.mjs'
/**
 * just sample of who the subscription is being stored on db
 */
export const customerSubscriptionCreated = async (data) => {
  const plan = data?.plan?.id
  const customer = await stripe.customers.retrieve(data?.customer)
  const email = customer?.email
  const price = (data?.plan?.amount ?? 0) / 100

  return SubscriptionModel.create({ email, plan, price })
}
