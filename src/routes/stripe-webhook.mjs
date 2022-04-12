import { customerSubscriptionCreated } from '../libs/customerSubscriptionCreated.mjs'
import stripe from 'stripe'

const endpointSecret = process.env.STRIPE_ENDPOINTSECRET

export const stripeWebhook = async (request, response, next) => {
  const sig = request.headers['stripe-signature']

  let event

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret)
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`)
    return
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created': {
      const data = event.data.object
      await customerSubscriptionCreated(data)
      break
    }

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send()
}
