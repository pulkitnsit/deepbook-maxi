import express from 'express'
import { getOpenOrders } from './deepbookUtil.mjs'
import { stoikovMarketMaker } from './stoikovMarketMaker.mjs'

const app = express()
const port = 3000

app.get('/orders', async (req, res) => {
  const orders = await getOpenOrders()
  console.log('orders: ', orders)
  res.send(orders)
})

app.get('/strategy', async (req, res) => {
  const strategy = await stoikovMarketMaker()
  console.log('strategy: ', strategy)
  res.send(strategy)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})