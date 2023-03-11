// Imported from RainbowKit
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
// Imported from Wagmi
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
// Necessary imports from fontawesome icons with NextJS
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
// Imported stylesheets
import "../styles/globals.css";


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


export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
				modalSize="compact"
				initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
				chains={chains}
			>
        {getLayout(<Component {...pageProps} />)}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}