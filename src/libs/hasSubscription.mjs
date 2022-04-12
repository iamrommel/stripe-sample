import { SubscriptionModel } from '../utils/SubscriptionRepository.mjs'

/**
 * This just check if the email address exists from the db or not
 * @param email
 */
export const hasSubscription = async ({ email }) => {
  const result = await SubscriptionModel.findOne({ email }).lean()

  //this will return a boolean value
  return !!result
}
