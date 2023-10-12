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
  const marketPubkey = new PublicKey("CwHc9CZ9UCZFayz4eBekuhhKsHapLDPYfX4tGFJrnTRt");
  const OPENBOOK_PROGRAM_ID = new PublicKey(
    'opnbkNkqux64GppQhwbyEVc3axhssFhVYuwar8rDHCu',
  );

  const client = new OpenBookV2Client(programId, provider);

  const marketObject = await client.getMarket(marketPubkey)

  if (!marketObject) {
    throw "No market";
  }

  const tx = await client.consumeEvents(marketPubkey, marketObject)
  console.log(tx)
}

consumeEvents().then(() => process.exit(0));