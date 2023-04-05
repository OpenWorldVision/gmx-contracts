const {
  getFrameSigner,
  deployContract,
  contractAt,
  sendTxn,
  writeTmpAddresses,
} = require("../shared/helpers");
const { expandDecimals } = require("../../test/shared/utilities");
const { toUsd } = require("../../test/shared/units");
const { errors } = require("../../test/core/Vault/helpers");

const network = process.env.HARDHAT_NETWORK || "mainnet";
const tokens = require("./tokens")[network];

const depositFee = 30; // 0.3%

async function getHarmonyValues(signer) {
  const vault = await contractAt(
    "Vault",
    "0x94ac069FA3672fe67b7A6e3f39EA47489864EFa4"
  );
  const timelock = await contractAt("Timelock", await vault.gov());
  const router = await contractAt("Router", await vault.router());
  const shortsTracker = await contractAt(
    "ShortsTracker",
    "0x072f46dA9568a7088838e23653d27542356b20d6"
  );
  const weth = await contractAt("WETH", tokens.nativeToken.address);
  const orderBook = await contractAt(
    "OrderBook",
    "0xA381E15a6E13fdd676A51Bf686A62949fD0ebDA1"
  );
  const referralStorage = await contractAt(
    "ReferralStorage",
    "0x066836a277FF4d9f8f4F01DC6cCe3Fc6f43e18f7"
  );

  const orderKeepers = [
    { address: "0xe6fd8f16CA620854289571FBBB7eE743437fc027" },
  ];
  const liquidators = [
    { address: "0x8588bBa54C5fF7209cd23068E2113e825AA4CA7F" },
  ];

  const partnerContracts = [
  ];

  return {
    vault,
    timelock,
    router,
    shortsTracker,
    weth,
    depositFee,
    orderBook,
    referralStorage,
    orderKeepers,
    liquidators,
    partnerContracts,
  };
}

async function getBscValues(signer) {
  const vault = await contractAt(
    "Vault",
    "0x547a29352421e7273eA18Acce5fb8aa308290523"
  );
  const timelock = await contractAt("Timelock", await vault.gov());
  const router = await contractAt("Router", await vault.router());
  const shortsTracker = await contractAt(
    "ShortsTracker",
    "0xc8982ffB4d5d3BA9265F550b690F9Cf015ca8eE8"
  );
  const weth = await contractAt("WETH", tokens.nativeToken.address);
  const orderBook = await contractAt(
    "OrderBook",
    "0xD489f81161EEb415fC078464535d3F7280Cc14F1"
  );
  const referralStorage = await contractAt(
    "ReferralStorage",
    "0xB393A3d6456305628339461264e7EFbABB38086d"
  );

  const orderKeepers = [
    { address: "0xe6fd8f16CA620854289571FBBB7eE743437fc027" },
  ];
  const liquidators = [
    { address: "0x8588bBa54C5fF7209cd23068E2113e825AA4CA7F" },
  ];

  const partnerContracts = [
  ];

  return {
    vault,
    timelock,
    router,
    shortsTracker,
    weth,
    depositFee,
    orderBook,
    referralStorage,
    orderKeepers,
    liquidators,
    partnerContracts,
  };
}

async function getTestnetValues(signer) {
  const vault = await contractAt(
    "Vault",
    "0xA57F00939D8597DeF1965FF4708921c56D9A36f3"
  );
  const timelock = await contractAt("Timelock", await vault.gov());
  const router = await contractAt("Router", await vault.router());
  const shortsTracker = await contractAt(
    "ShortsTracker",
    "0x230a476D100Bba2f76edBDF1300df3f963d943Dd"
  );
  const weth = await contractAt("WETH", tokens.nativeToken.address);
  const orderBook = await contractAt(
    "OrderBook",
    "0x38d0fc0aF9E757D70fA9B2C3b7816c6795afae6d"
  );
  const referralStorage = await contractAt(
    "ReferralStorage",
    "0xcFB491149F0a037EfcF5A0323cc460C8a83635Fa"
  );
  // FIXME: Use deployer wallet for testing
  const orderKeepers = [
    { address: "0x2CC6D07871A1c0655d6A7c9b0Ad24bED8f940517" },
  ];
  const liquidators = [
    { address: "0x2CC6D07871A1c0655d6A7c9b0Ad24bED8f940517" },
  ];

  const partnerContracts = [
    "0x0EaEA9558eFF1d4b76b347A39f54d8CDf01F990F", // Testing wallet
    // "0x5D8a5599D781CC50A234D73ac94F4da62c001D8B", // Vovo ETH down vault
    // "0xE40bEb54BA00838aBE076f6448b27528Dd45E4F0", // Vovo BTC up vault
    // "0x1704A75bc723A018D176Dc603b0D1a361040dF16", // Vovo BTC down vault
    // "0xbFbEe90E2A96614ACe83139F41Fa16a2079e8408", // Vovo GLP ETH up vault
    // "0x0FAE768Ef2191fDfCb2c698f691C49035A53eF0f", // Vovo GLP ETH down vault
    // "0x2b8E28667A29A5Ab698b82e121F2b9Edd9271e93", // Vovo GLP BTC up vault
    // "0x46d6dEE922f1d2C6421895Ba182120C784d986d3", // Vovo GLP BTC down vault
    // "0x3327a5F041E821f476E00572ee0862fbcaa32993", // Jones ETH Hedging
    // "0x2F9980d6fb25bD972196B19E243e36Dbde60618B", // Jones gOHM Hedging
    // "0xC75417CB103D7008eCb07aa6fbf214eE2c127901", // Jones DPX Hedging
    // "0x37a86cB53981CC762709B2c402B0F790D58F95BF", // Jones rDPX Hedging
  ];

  return {
    vault,
    timelock,
    router,
    shortsTracker,
    weth,
    depositFee,
    orderBook,
    referralStorage,
    orderKeepers,
    liquidators,
    partnerContracts,
  };
}

async function getArbValues(signer) {
  const vault = await contractAt(
    "Vault",
    "0xec45801399EB38B75A3bf793051b00bb64fF3eF8",
    signer
  );
  const timelock = await contractAt("Timelock", await vault.gov(), signer);
  const router = await contractAt("Router", await vault.router(), signer);
  const shortsTracker = await contractAt(
    "ShortsTracker",
    "0x857c831fE590c472a222AbF62131906e5d038330",
    signer
  );
  const weth = await contractAt("WETH", tokens.nativeToken.address);
  const orderBook = await contractAt(
    "OrderBook",
    "0x770299A209454178945a5848f8b1E569c90C78Cf"
  );
  const referralStorage = await contractAt(
    "ReferralStorage",
    "0xDE83088F2bcB974A349E6347Dc75919ecC0dD6f0"
  );

  const orderKeepers = [
    { address: "0xe6fd8f16CA620854289571FBBB7eE743437fc027" },
  ];
  const liquidators = [
    { address: "0x8588bBa54C5fF7209cd23068E2113e825AA4CA7F" },
  ];


  const partnerContracts = [];

  return {
    vault,
    timelock,
    router,
    shortsTracker,
    weth,
    depositFee,
    orderBook,
    referralStorage,
    orderKeepers,
    liquidators,
    partnerContracts,
  };
}

async function getAvaxValues(signer) {
  const vault = await contractAt(
    "Vault",
    "0x9ab2De34A33fB459b538c43f251eB825645e8595"
  );
  const timelock = await contractAt("Timelock", await vault.gov(), signer);
  const router = await contractAt("Router", await vault.router(), signer);
  const shortsTracker = await contractAt(
    "ShortsTracker",
    "0x9234252975484D75Fd05f3e4f7BdbEc61956D73a",
    signer
  );
  const weth = await contractAt("WETH", tokens.nativeToken.address);
  const orderBook = await contractAt(
    "OrderBook",
    "0x4296e307f108B2f583FF2F7B7270ee7831574Ae5"
  );
  const referralStorage = await contractAt(
    "ReferralStorage",
    "0x827ed045002ecdabeb6e2b0d1604cf5fc3d322f8"
  );

  const orderKeepers = [
    { address: "0x06f34388A7CFDcC68aC9167C5f1C23DD39783179" },
    { address: "0xf26f52d5985F6391E541A8d638e1EDaa522Ae56C" },
  ];
  const liquidators = [
    { address: "0x7858A4C42C619a68df6E95DF7235a9Ec6F0308b9" },
  ];

  const partnerContracts = [];

  return {
    vault,
    timelock,
    router,
    shortsTracker,
    weth,
    depositFee,
    orderBook,
    referralStorage,
    orderKeepers,
    liquidators,
    partnerContracts,
  };
}

async function getValues(signer) {
  if (network === "arbitrum") {
    return getArbValues(signer);
  }

  if (network === "avax") {
    return getAvaxValues(signer);
  }

  if (network === "testnet") {
    return getTestnetValues(signer);
  }

  if (network === "bsc") {
    return getBscValues(signer)
  }

  if (network === "harmony") {
    return getHarmonyValues(signer)
  }
}

async function main() {
  const signer = await getFrameSigner();
  const {
    positionManagerAddress,
    vault,
    timelock,
    router,
    shortsTracker,
    weth,
    depositFee,
    orderBook,
    referralStorage,
    orderKeepers,
    liquidators,
    partnerContracts,
  } = await getValues(signer);

  let positionManager;
  if (positionManagerAddress) {
    console.log("Using position manager at", positionManagerAddress);
    positionManager = await contractAt(
      "PositionManager",
      positionManagerAddress
    );
  } else {
    console.log("Deploying new position manager");
    const positionManagerArgs = [
      vault.address,
      router.address,
      shortsTracker.address,
      weth.address,
      depositFee,
      orderBook.address,
    ];
    positionManager = await deployContract(
      "PositionManager",
      positionManagerArgs
    );
  }
  writeTmpAddresses({ positionManager: positionManager.address });

  // positionManager only reads from referralStorage so it does not need to be set as a handler of referralStorage
  if (
    (await positionManager.referralStorage()).toLowerCase() !=
    referralStorage.address.toLowerCase()
  ) {
    await sendTxn(
      positionManager.setReferralStorage(referralStorage.address),
      "positionManager.setReferralStorage"
    );
  }
  if (await positionManager.shouldValidateIncreaseOrder()) {
    await sendTxn(
      positionManager.setShouldValidateIncreaseOrder(false),
      "positionManager.setShouldValidateIncreaseOrder(false)"
    );
  }

  for (let i = 0; i < orderKeepers.length; i++) {
    const orderKeeper = orderKeepers[i];
    if (!(await positionManager.isOrderKeeper(orderKeeper.address))) {
      await sendTxn(
        positionManager.setOrderKeeper(orderKeeper.address, true),
        "positionManager.setOrderKeeper(orderKeeper)"
      );
    }
  }

  for (let i = 0; i < liquidators.length; i++) {
    const liquidator = liquidators[i];
    if (!(await positionManager.isLiquidator(liquidator.address))) {
      await sendTxn(
        positionManager.setLiquidator(liquidator.address, true),
        "positionManager.setLiquidator(liquidator)"
      );
    }
  }

  // if (!(await timelock.isHandler(positionManager.address))) {
  //   await sendTxn(
  //     timelock.setContractHandler(positionManager.address, true),
  //     "timelock.setContractHandler(positionManager)"
  //   );
  // }
  if (!(await vault.isLiquidator(positionManager.address))) {
    await sendTxn(
      timelock.setLiquidator(vault.address, positionManager.address, true),
      "timelock.setLiquidator(vault, positionManager, true)"
    );
  }
  if (!(await shortsTracker.isHandler(positionManager.address))) {
    await sendTxn(
      shortsTracker.setHandler(positionManager.address, true),
      "shortsTracker.setContractHandler(positionManager.address, true)"
    );
  }
  if (!(await router.plugins(positionManager.address))) {
    await sendTxn(
      router.addPlugin(positionManager.address),
      "router.addPlugin(positionManager)"
    );
  }

  for (let i = 0; i < partnerContracts.length; i++) {
    const partnerContract = partnerContracts[i];
    if (!(await positionManager.isPartner(partnerContract))) {
      await sendTxn(
        positionManager.setPartner(partnerContract, false),
        "positionManager.setPartner(partnerContract)"
      );
    }
  }

  if ((await positionManager.gov()) != (await vault.gov())) {
    await sendTxn(
      positionManager.setGov(await vault.gov()),
      "positionManager.setGov"
    );
  }

  console.log("done.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
