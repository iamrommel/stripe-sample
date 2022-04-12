import 'dotenv/config'
import * as chai from 'chai'
import chaiSubset from 'chai-subset'
import chaiAsPromised from 'chai-as-promised'
import { initDb } from './src/utils/initDb.mjs'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

global.expect = chai.expect

//setup the chai-subset
chai.use(chaiSubset)

//setup chai-as-promissed
chai.use(chaiAsPromised)

let _mongoDbServer
const connect = async () => {
  const uri = _mongoDbServer.getUri()

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  await mongoose.connect(uri, mongooseOpts)
}

const disconnect = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await _mongoDbServer.stop()
}

export const mochaGlobalTeardown = async function () {
  await disconnect()
  console.warn('-----ENDING MONGODB----')
}

export const mochaGlobalSetup = async function () {
  console.warn('-----STARTING MONGODB----')
  _mongoDbServer = await MongoMemoryServer.create()

  await connect()
}
