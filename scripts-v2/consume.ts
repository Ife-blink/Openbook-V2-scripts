import { AnchorProvider, BN, Wallet } from "@coral-xyz/anchor";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { MarketAccount, OpenBookV2Client } from "./ts/client/src";
import { RPC, authority, programId } from "./utils";


async function consumeEvents() {
  const wallet = new Wallet(authority);
  const provider = new AnchorProvider(new Connection(RPC), wallet, {
    commitment: "confirmed",
  });
  const market = new PublicKey("CwHc9CZ9UCZFayz4eBekuhhKsHapLDPYfX4tGFJrnTRt");
  const OPENBOOK_PROGRAM_ID = new PublicKey(
    'opnbkNkqux64GppQhwbyEVc3axhssFhVYuwar8rDHCu',
  );

  const client = new OpenBookV2Client(programId, provider);

  const marketPublicKey = await client.getMarket(
    market
  )

  const Accounts: MarketAccount = {
    bump: marketPublicKey?.bump || 253,
    baseDecimals: marketPublicKey?.baseDecimals || 6,
    quoteDecimals: marketPublicKey?.quoteDecimals || 6,
    padding1: marketPublicKey?.padding1 || [],
    timeExpiry: marketPublicKey?.timeExpiry,
    collectFeeAdmin: marketPublicKey?.collectFeeAdmin || market,
    openOrdersAdmin: marketPublicKey?.openOrdersAdmin || null,  
   }
   
  const tx = client.consumeEvents(
    Accounts
  )

  
}