// Imported Components
import GalleryConnect from "../../components/dashboard/gallery/galleryConnect";
import NFTGallery from "../../components/dashboard/gallery/nftGallery";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
// Imported Stylesheet
import classes from "../../styles/dashboard/Gallery.module.css";
// Imports from RainbowKit
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
	mainnet,
	polygon,
	optimism,
	arbitrum,
	goerli,
	polygonMumbai,
	optimismGoerli,
	arbitrumGoerli,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
	[
		mainnet,
		goerli,
		polygon,
		polygonMumbai,
		optimism,
		optimismGoerli,
		arbitrum,
		arbitrumGoerli,
	],
	[alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: "My Alchemy DApp",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});


export { WagmiConfig, RainbowKitProvider };


export default function Gallery() {
  return (
    <WagmiConfig client={wagmiClient}>
 			<RainbowKitProvider
 				modalSize="compact"
				initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
 				chains={chains}
 			>
				<GalleryConnect />
        <div className={classes.main}>
					<NFTGallery />
				</div>
 			</RainbowKitProvider>
 		</WagmiConfig>
  );
}


Gallery.getLayout = function getLayout(page) {
	return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
	);
}