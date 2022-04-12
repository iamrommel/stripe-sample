import * as m from './hasSubscription.mjs'
import * as SubsRepo from '../utils/SubscriptionRepository.mjs'

describe('hasSubscription', function () {
  let ut, hasSubscription
  //We are not mocking database, we use the MongoMemoery server so we really have a good grasp of what happening on the queries
  //so we do initial seed of subscription
  const seed = async () => {
    await SubsRepo.seed()
  }

  beforeEach(async () => {
    await seed()
  })
  it('should return FALSE if the specified email does not exists from the DB', async () => {
    const email = 'existing@email.com'
    const result = await m.hasSubscription({ email })
    expect(result).to.be.true
  })
  it('should return TRUE if the specified email does not exists from the DB', async () => {
    const email = 'notexisting@email.com'
    const result = await m.hasSubscription({ email })
    expect(result).to.be.false
  })
})
