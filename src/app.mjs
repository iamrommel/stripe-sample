import 'dotenv/config'
import express from 'express'
import * as path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { initDb } from './utils/initDb.mjs'
import { stripeWebhook } from './routes/stripe-webhook.mjs'
import { hasSubscriptionRoute } from './routes/hasSubscriptionRoute.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

initDb().catch((err) => console.log(`DB ERROR: ${err}`))

const app = express()

//This needs to be at the top before setting up the express.json, somehow the express.raw does now work if it is after
app.post('/stripe/webhooks', express.raw({ type: 'application/json' }), stripeWebhook)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})
app.get('/has-subscription', hasSubscriptionRoute)

export default app
