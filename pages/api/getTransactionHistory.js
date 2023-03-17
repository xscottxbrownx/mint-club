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
    const data = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      fromAddress: address,
      category: ["external", "internal", "erc20", "erc721", "erc1155"],
    });

    res.status(200).json({
      data: data,
    });
    
  } 
  catch (e) {
    console.warn(e);
    res.status(500).send({
      message: "something went wrong, check the log in your terminal",
    });
  }
  
}