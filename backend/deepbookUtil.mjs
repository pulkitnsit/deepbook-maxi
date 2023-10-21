import { DeepBookClient } from "@mysten/deepbook"
import { SuiClient } from "@mysten/sui.js/client";
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import 'dotenv/config'

const key_phrase=process.env.KEY_PHRASE
export const keypair = Ed25519Keypair.deriveKeypair(key_phrase);

export async function executeTransactionBlock(
	myrawSigner,
	txb,
) {
    const result = await myrawSigner.signAndExecuteTransactionBlock({
        transactionBlock: txb,
        options: {
          showEffects: true,
          showEvents: true,
          showInput: true,
        },
      });
	return result;
}

export const FLOAT_SCALING_FACTOR = 1_000_000_000n;
export const DEFAULT_TICK_SIZE = 1n * FLOAT_SCALING_FACTOR;
export const DEFAULT_LOT_SIZE = 1n;
const local_client = new SuiClient({ url: 'https://fullnode.mainnet.sui.io:443' })
const deepbook_client = new DeepBookClient(local_client);

deepbook_client.setAccountCap(process.env.ACCOUNT_CAP);
const poolId = '0x5deafda22b6b86127ea4299503362638bea0ca33bb212ea3a67b029356b8b955';

export async function placeLimitOrders(price, quantity, orderType) {
  // const limit_order_txn_ask = await deepbook_client.placeLimitOrder(poolId, 1003700000n, 100000n, "ask");
  const limit_order_txn = await deepbook_client.placeLimitOrder(poolId, price, quantity, orderType);
  const limit_order = await local_client.signAndExecuteTransactionBlock({transactionBlock: limit_order_txn, signer: keypair});
  console.log("orderType: ", limit_order);
  return limit_order
}

export async function getOpenOrders() {
  const orders = await deepbook_client.listOpenOrders(poolId);
  console.log('orders: ', orders);
  return orders
}

export async function getCoints() {
  const usdtResp = await local_client.getCoins({
    owner: "0x9c2dc9feaae1fb49df8f73b99251c60c8fffa37458160619a1fdb30a17fa5388",
    coinType: "0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN",
  })
  console.log("usdtResp: ", usdtResp)

  const usdcResp = await local_client.getCoins({
    owner: "0x9c2dc9feaae1fb49df8f73b99251c60c8fffa37458160619a1fdb30a17fa5388",
    coinType: "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
  })
  console.log("usdcResp: ", usdcResp)
}

export async function deposit() {
  const usdcCoin = '0x2b02936bd59dda0c921d233b4773e8b35427e67543ae627064dfb0efc640deb6';
  const usdcDepositTxn = await deepbook_client.deposit(poolId, usdcCoin, BigInt(2290100));
  const usdcDepositRec = await local_client.signAndExecuteTransactionBlock({transactionBlock: usdcDepositTxn, signer: keypair});
  console.log("usdcDepositRec: ", usdcDepositRec);

  const usdtCoin = '0x454f3201ed737be15b9a56238bb43f1df417740631d1296be5bbf30099f4a96e';
  const usdtDepositTxn = await deepbook_client.deposit(poolId, usdtCoin, BigInt(2295586));
  const usdtDepositRec = await local_client.signAndExecuteTransactionBlock({transactionBlock: usdtDepositTxn, signer: keypair});
  console.log("usdtDepositRec: ", usdtDepositRec);
}

export async function cancelAll() {
  const cancelAllTxn = await deepbook_client.cancelAllOrders(poolId);
  const cancelAllRec = await local_client.signAndExecuteTransactionBlock({transactionBlock: cancelAllTxn, signer: keypair});
  console.log("cancelAllRec: ", cancelAllRec);
  return cancelAllRec
}

export async function getMarketPrice() {
  const marketPrice = await deepbook_client.getMarketPrice(poolId);
  console.log("marketPrice: ", marketPrice);
  return marketPrice
}