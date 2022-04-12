import { hasSubscription } from '../libs/hasSubscription.mjs'

export const hasSubscriptionRoute = async (req, res) => {
  const { email } = req?.body
  const result = await hasSubscription({ email })

  res.json({ hasSubscription: result })
}
