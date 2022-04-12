import { onNewStripeSubscription } from '../libs/onNewStripeSubscription.mjs'

const endpointSecret = 'whsec_e6ba7c9fe787e52db87f66dbd36f15ad5c71b348b64372d07b8a3480d33b9494'

export const stripeWebhook = async (req, res, next) => {
  const result = await onNewStripeSubscription()
  console.log(result, 'what is the result here')
  res.json(result)
}
