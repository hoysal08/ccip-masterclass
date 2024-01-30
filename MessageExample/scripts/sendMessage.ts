// scripts/sendMessage.ts

import { ethers, network } from "hardhat";

async function main() {
  if(network.name !== `avalancheFuji`) {
    console.error(`❌ Must be called from Avalanche Fuji`);
    return 1;
  }

  const ccipSenderAddress = `0xc00aea1cC89190FE76FEABF5dE330Cc4d8957869`;
  const ccipReceiverAddress = `0xD6a78c939D59aa2fd21d04CF05bD5020172eb5ad`;
  const someText = `CCIP Masterclass`;
  const destinationChainSelector = "16015286601757825753";

  const ccipSender = ethers.getContractAt("CCIPSender_Unsafe", ccipSenderAddress);

  const tx = await (await ccipSender).send(
      ccipReceiverAddress, 
      someText,
      destinationChainSelector
  );

  console.log(`Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});