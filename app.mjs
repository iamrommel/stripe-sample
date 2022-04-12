import 'dotenv/config'
import express from 'express'
import * as path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { initDb } from './utils/initDb.mjs'
import { stripeWebhook } from './routes/stripe-webhook.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

initDb().catch((err) => console.log(`DB ERROR: ${err}`))

const app = express()

app.post('/stripe/webhooks', express.raw({ type: 'application/json' }), stripeWebhook)

app.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

export default app
