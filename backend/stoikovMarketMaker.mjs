import { getMarketPrice, placeLimitOrders, getOpenOrders } from './deepbookUtil.mjs';

async function stoikovMarketMaker(initialPrice, spread, totalBalance, volatility, profitTarget) {
  // Initialize bid and ask prices
  let bidPrice = initialPrice - spread / 2;
  let askPrice = initialPrice + spread / 2;

  // Calculate bid and ask quantities based on volatility
  const bidQuantity = (totalBalance * (1 - profitTarget)) / bidPrice;
  const askQuantity = (totalBalance * (1 - profitTarget)) / askPrice;

  // Simulate market conditions (e.g., price changes)
  const randomPriceChange = () => (Math.random() - 0.5) * volatility;
  
  bidPrice += randomPriceChange();
  askPrice += randomPriceChange();

  // Return the top 3 bid and ask prices along with quantities
  const bidPrices = [bidPrice, bidPrice - spread, bidPrice - (2.6 * spread)];
  const askPrices = [askPrice, askPrice + spread, askPrice + (2.6 * spread)];

  return {
    bidPrices,
    askPrices,
    // bidQuantities: Array(bidPrices.length).fill(bidQuantity),
    bidQuantities: [bidQuantity, bidQuantity * (1 + profitTarget), bidQuantity * (1 +  (1.5 * profitTarget))],
    // askQuantities: Array(askPrices.length).fill(askQuantity),
    askQuantities: [askQuantity, askQuantity * (1 + profitTarget), askQuantity * (1 +  (1.5 * profitTarget))],
  };
}

export async function executeStrategy() {
  console.log("=====Strategy=====")
  const prices = await getMarketPrice(); 
  const initialPrice = Number((prices.bestBidPrice + prices.bestAskPrice) / 200000n); // Initial price
  // const initialPrice = 1000; // Initial price
  console.log("initialPrice: ", initialPrice)
  const spread = 1; // Spread between bid and ask prices
  const totalBalance = 100; // Total balance that the user has
  const volatility = 0.2; // Volatility factor
  const profitTarget = 0.02; // 2% profit target
  const result = await stoikovMarketMaker(initialPrice, spread, totalBalance, volatility, profitTarget);
  console.log("Bid Prices:", result.bidPrices);
  console.log("Ask Prices:", result.askPrices);
  console.log("Bid Quantities:", result.bidQuantities);
  console.log("Ask Quantities:", result.askQuantities);
  console.log("=====Strategy Ends=====")

  for (let i = 0; i < 3; i++) {
    console.log("BigInt(result.bidPrices[0])", BigInt(Math.round(result.bidPrices[i]) * 100000));
    console.log("BigInt(result.bidQuantities[0])", BigInt(Math.round(result.bidQuantities[i] * 10000000)));
    await placeLimitOrders(BigInt(Math.round(result.bidPrices[i] * 100000)), BigInt(Math.round(result.bidQuantities[i] * 10000000)), "bid")
    await placeLimitOrders(BigInt(Math.round(result.askPrices[i] * 100000)), BigInt(Math.round(result.askQuantities[i] * 10000000)), "ask")
  }
  await getOpenOrders()
}