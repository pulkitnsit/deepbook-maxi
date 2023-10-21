import express from 'express'
import { getOpenOrders, cancelAll } from './deepbookUtil.mjs'
import { executeStrategy } from './stoikovMarketMaker.mjs'

const app = express()
const port = 3001

app.get('/orders', async (req, res) => {
  const orders = await getOpenOrders()
  res.send(orders)
})

app.get('/strategy', async (req, res) => {
  const strategy = await executeStrategy()
  res.send(strategy)
})

app.get('/cancel', async (req, res) => {
  await cancelAll();
  const orders = await getOpenOrders()
  res.send(orders)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})