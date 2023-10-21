export async function stoikovMarketMaker(initialPrice, spread, totalBalance, volatility, profitTarget) {
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
  const bidPrices = [bidPrice, bidPrice - spread, bidPrice - 2 * spread];
  const askPrices = [askPrice, askPrice + spread, askPrice + 2 * spread];

  return {
    bidPrices,
    askPrices,
    bidQuantities: Array(bidPrices.length).fill(bidQuantity),
    askQuantities: Array(askPrices.length).fill(askQuantity),
  };
}

// // Example usage
// const initialPrice = 100; // Initial stock price
// const spread = 0.1; // Spread between bid and ask prices
// const totalBalance = 1000; // Total balance that the user has
// const volatility = 2; // Volatility factor
// const profitTarget = 0.05; // 2% profit target

// const result = stoikovMarketMaker(initialPrice, spread, totalBalance, volatility, profitTarget);
// console.log("Bid Prices:", result.bidPrices);
// console.log("Ask Prices:", result.askPrices);
// console.log("Bid Quantities:", result.bidQuantities);
// console.log("Ask Quantities:", result.askQuantities);
