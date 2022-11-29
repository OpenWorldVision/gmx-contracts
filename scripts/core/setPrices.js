const { deployContract, contractAt, sendTxn } = require("../shared/helpers");
const { expandDecimals } = require("../../test/shared/utilities");
const { toUsd } = require("../../test/shared/units");

const network = process.env.HARDHAT_NETWORK || "mainnet";
const tokens = require("./tokens")[network];

async function main() {
  // const secondaryPriceFeed = await contractAt("FastPriceFeed", "0x06588aad1eCc1275CBF68ab192257714ac1ed89c")
  const vaultPriceFeed = await contractAt(
    "VaultPriceFeed",
    "0xc4BB3af31A98B8069Ab6D1521Ddf4A951108f2A5"
  );
  const vault = await contractAt(
    "Vault",
    "0xA57F00939D8597DeF1965FF4708921c56D9A36f3"
  );
  await sendTxn(
    vault.setPriceFeed(vaultPriceFeed.address),
    "vault.setPriceFeed"
  );
  // await sendTxn(vaultPriceFeed.setIsAmmEnabled(false), "vaultPriceFeed.setIsAmmEnabled")
  // console.log("vaultPriceFeed.isSecondaryPriceEnabled", await vaultPriceFeed.isSecondaryPriceEnabled())

  // await sendTxn(secondaryPriceFeed.setPrices(
  //   [tokens.btc.address, tokens.eth.address, tokens.bnb.address],
  //   [expandDecimals(35000, 30), expandDecimals(4000, 30), expandDecimals(310, 30)]
  // ), "secondaryPriceFeed.setPrices")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
