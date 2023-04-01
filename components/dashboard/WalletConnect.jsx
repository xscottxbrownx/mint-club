import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from "./WalletConnect.module.css";


export default function WalletConnect() {
  return (
    <div className={styles.wallet_connect}>
      <ConnectButton accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}>
      </ConnectButton>
    </div>
  );
}
