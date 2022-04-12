import { SubscriptionModel } from '../utils/SubscriptionRepository.mjs'
import { stripe as stripeModule } from '../utils/stripe.mjs'
import moment from 'moment'

/**
 * This function gets the open invoices and pay all of it
 * @param startDate -  the startDate of invoice query
 * @param endDate -  the endDate of invoice query
 * @param {stripe} - we use this so we can inject the value for stripeModule, by default it is the actual stripe implementation
 */
export const getOpenInvoiceAndPay = async ({ startDate, endDate }, { stripe = stripeModule } = {}) => {
  //get the invoice between two dates
  const startDateUnix = moment(startDate).unix()
  const endDateUnix = moment(endDate).unix()

  //because we cannot search by using the status (stutus is not part of the query field), so we just return the all results and filter it out manually
  for await (const invoice of stripe.invoices.search({
    query: `created>=${startDateUnix} AND created<=${endDateUnix}`,
    limit: 50,
  })) {
    if (invoice?.status === 'open') {
      //just pay it, a simple with default settings
      await stripe.invoices.pay(invoice.id)
    }
  }
}
