import { SubscriptionModel } from '../utils/SubscriptionRepository.mjs'

/**
 * I know it's one big fat function but for the sake of  demo let it be
 * Whenever a new hook was sent from the stripe, trigger this
 * The payload of the hook contains teh subscription info, then we save it to db for future use
 * @returns {Promise<any>}
 */
export const onNewStripeSubscription = async () => {
  return SubscriptionModel.create({ email: 'janu', plan: 'VALID', price: 200 })
}
