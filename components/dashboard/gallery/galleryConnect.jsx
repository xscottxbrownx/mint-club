import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from "./GalleryConnect.module.css";


export default function GalleryConnect() {
  return (
    <div className={styles.gallery_connect}>
      <ConnectButton accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}>
      </ConnectButton>
    </div>
  );
}
