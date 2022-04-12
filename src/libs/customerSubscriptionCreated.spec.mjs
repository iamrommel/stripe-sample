//this is just as simple mongoose wrapper to the collection, so it is just fine to be used here
//there is no important logic, so we just re-use this for querying values
//much closer to actual implementation, less mocking
import { SubscriptionModel } from '../utils/SubscriptionRepository.mjs'
import { customerSubscriptionCreated } from './customerSubscriptionCreated.mjs'
import { when } from '../utils/testUtils.js'

describe('customerSubscriptionCreated', function () {
  let stripe, data
  beforeEach(async () => {
    //we mock the stripe retrieval of data here, everytime we run any test
    stripe = {
      customers: {
        retrieve: when().thenResolve({
          email: 'customer101@mail.com',
        }),
      },
    }

    //the data is what the result of stripe, webhook is so set an object similar to it
    data = {
      plan: {
        id: 'plan_101',
        amount: 1345,
      },
      customer: 'cus_101',
    }

    //we re-seed the database always
    await SubscriptionModel.deleteMany({})
  })

  it('should be able to store to database with correct value', async () => {
    //we need to inject the mock stripe here
    //do the insertion of data
    await customerSubscriptionCreated(data, { stripe })

    //no we check if it is really stored from db
    //by default there is nothing in DB, so for sure it is the first item
    const inserted = await SubscriptionModel.findOne({}).lean()
    expect(inserted).to.containSubset({
      plan: 'plan_101',
      email: 'customer101@mail.com',
      price: 13.45, //this should cover about the scenarion of converting to correct amount, not a cents
    })
  })

  it('should throw error when there is no email defined', () => {
    //we mock the stripe result to return with no email address
    stripe.customers.retrieve = when().thenResolve({
      email: null,
    })

    return expect(customerSubscriptionCreated(data, { stripe })).to.eventually.rejectedWith('email is required')
  })
  it('should throw error when there is no plan defined', () => {
    //we make sure that the data has no plan id defined
    data.plan = null

    return expect(customerSubscriptionCreated(data, { stripe })).to.eventually.rejectedWith('plan is required')
  })
})
