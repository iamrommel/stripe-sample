import { SubscriptionModel } from '../utils/SubscriptionRepository.mjs'
import { stripe as stripeModule } from '../utils/stripe.mjs'
/**
 * this is how the item is stored on the DB
 * @param data -  the data that was received from the stripe webhook
 * @param {stripe} - we use this so we can inject the value for stripeModule, by default it is the actual stripe implementation
 */
export const customerSubscriptionCreated = async (data, { stripe = stripeModule } = {}) => {
  const plan = data?.plan?.id
  if (!plan) throw new Error('plan is required')
  const customer = await stripe.customers.retrieve(data?.customer)

  const email = customer?.email
  if (!email) throw new Error('email is required')
  const price = (data?.plan?.amount ?? 0) / 100

  return SubscriptionModel.create({ email, plan, price })
}
