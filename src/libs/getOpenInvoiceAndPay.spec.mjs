import { getOpenInvoiceAndPay } from './getOpenInvoiceAndPay.js'
import { when } from '../utils/testUtils.js'
import moment from 'moment'

describe('getOpenInvoiceAndPay', function () {
  let stripe, startDate, endDate
  beforeEach(async () => {
    //we mock the stripe retrieval of data here, everytime we run any test
    stripe = {
      customers: {
        retrieve: when().thenResolve({
          email: 'customer101@mail.com',
        }),
      },
    }

    startDate = moment().subtract(2, 'day').toDate()
    endDate = moment().toDate()
  })

  it('should be able to store to database with correct value (no mock)', async () => {
    //we need to inject the mock stripe here
    //do the insertion of data
    stripe = undefined
    await getOpenInvoiceAndPay({ startDate, endDate }, { stripe })
  })
})
