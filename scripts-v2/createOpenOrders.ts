import { AnchorProvider, BN, Wallet } from "@coral-xyz/anchor";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { OpenBookV2Client, MarketAccount } from "./ts/client/src";
import { RPC, authority, programId } from "./utils";

const createIndexer = true;
async function main() {
  try {
    const wallet = new Wallet(authority);
    const provider = new AnchorProvider(new Connection(RPC), wallet, {
      commitment: "confirmed",
    });

    const OPENBOOK_PROGRAM_ID = new PublicKey(
      'opnbkNkqux64GppQhwbyEVc3axhssFhVYuwar8rDHCu',
    );

    const client = new OpenBookV2Client(programId, provider);

    const market = new PublicKey("CwHc9CZ9UCZFayz4eBekuhhKsHapLDPYfX4tGFJrnTRt");
    const accountIndex = new BN(1);
    const openOrdersIndexer = new PublicKey("AQQjXh77vxDVNbvtBT15wqActegATWC6VFDp5PgY1De3")

    const USER = new PublicKey('EoXE4w8Ey2xdwGaz6EgKCqbwvTu3hwYoWEPt7ArDnhEy');
    const openOrdersPubKey = new PublicKey("DVcsrzf1JaAm3pVJi2gCbNaLottWFbKdwRp8bzHGc6UU")
    // const [pubkey, _bump] = PublicKey.findProgramAddressSync(
    //   [
    //     Buffer.from('OpenOrders'),
    //     USER.toBuffer(),
    //     market.toBuffer(),
    //     accountIndex.toBuffer('le', 4),
    //   ],
    //   OPENBOOK_PROGRAM_ID,
    // );
    // console.log(pubkey)
    // const target = new PublicKey('AQQjXh77vxDVNbvtBT15wqActegATWC6VFDp5PgY1De3');
    // if (pubkey.equals(target)) {
    //   console.log('matches!');
    // }


    const marketPublicKey = await client.getMarket(
      market
    )
    let tx
    console.log(marketPublicKey)

    
    
    if(market){

      const Accounts: MarketAccount = {
        bump: marketPublicKey?.bump || 253,
        baseDecimals: marketPublicKey?.baseDecimals || 6,
        quoteDecimals: marketPublicKey?.quoteDecimals || 6,
        padding1: marketPublicKey?.padding1 || [],
        timeExpiry: marketPublicKey?.timeExpiry,
        collectFeeAdmin: marketPublicKey?.collectFeeAdmin || market,
        openOrdersAdmin: marketPublicKey?.openOrdersAdmin || openOrdersIndexer,  
       }
       
      tx = await client.placeOrder(
        openOrdersPubKey,
        marketPublicKey,
        market: Accounts
      )
      console.log("created open orders acc", tx);
    }
    
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
main()