// Imported from Alchemy
import { Network, Alchemy } from "alchemy-sdk";


export default async function handler(req, res) {
  const { address, chain } = JSON.parse(req.body);
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network[chain],
  };
  const alchemy = new Alchemy(settings);

  try {
    // get erc-20 token balances
    const fetchedTokens = await alchemy.core.getTokenBalances(address);
    // get main ETH crypto balance
    const ethBalance = await alchemy.core.getBalance(address);
    const parsedEthBalance = parseInt(ethBalance.toString()) / Math.pow(10, 18);
    console.log("parsedEthBalance:", parsedEthBalance);

    const ethBalanceObject = {
      name: "Ethereum",
      symbol: "ETH",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      decimals: 18,
      balance: parsedEthBalance.toPrecision(2),
      address: "0x",
    };

    const fetchedTokenBalances = fetchedTokens.tokenBalances.map(
      (token) => token.tokenBalance
    );

    const fetchedTokenAddresses = fetchedTokens.tokenBalances.map(
      (token) => token.contractAddress
    );

    const fetchedTokenMetadata = await Promise.all(
      fetchedTokenAddresses.map(async (address) => {
        const metadata = await alchemy.core.getTokenMetadata(address);
        return metadata;
      })
    );
    
    const unifiedBalanceAndMetadata = [ethBalanceObject];

    for (let i = 0; i < fetchedTokenMetadata.length - 1; i++) {
      const tokenMetadata = fetchedTokenMetadata[i];
      const { name, symbol, logo, decimals } = tokenMetadata;
      const hexBalance = fetchedTokenBalances[i];
      const address = fetchedTokenAddresses[i];
      let convertedBalance;

      if (hexBalance && tokenMetadata.decimals) {
        convertedBalance = parseInt(hexBalance) / Math.pow(10, decimals);
        if (convertedBalance > 0) {
          const tokenBalanceAndMetadata = {
            name,
            symbol,
            logo,
            decimals,
            balance: convertedBalance.toPrecision(2),
            address,
          };
          unifiedBalanceAndMetadata.push(tokenBalanceAndMetadata);
        }
      }
    }
    console.log("unifiedBalanceAndMetadata:",unifiedBalanceAndMetadata);

    res.status(400).json(unifiedBalanceAndMetadata);
  } catch (e) {
    console.warn(e);
    res.status(500).send({
      message: "something went wrong, check the log in your terminal",
    });
  }
}

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);