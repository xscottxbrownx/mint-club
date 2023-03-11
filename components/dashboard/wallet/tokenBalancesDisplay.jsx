// Imports from React
import { useState, useEffect } from "react";
// Imports from Wagmi
import { useAccount } from "wagmi";
// Imported Stylesheets
import styles from "../../../styles/dashboard/TokenBalancesDisplay.module.css";


export default function TokenBalancesDisplay({ walletAddress, chain }) {
  const [tokensBalance, setTokensBalance] = useState();
  const [isLoading, setIsloading] = useState(false);
  const { address, isConnected, isDisconnected } = useAccount();

  // ON COMPONENT MOUNT + isConnected STATE CHANGE:
  // if there was a wallet address passed to the component
  // or if a wallet is connected to the site
  // try to fetch the token balances in wallet
  useEffect(() => {
    const getWalletBalance = async () => {
      setIsloading(true);
      if (isConnected || walletAddress) {
        try {
          const fetchedTokensBalance = await fetch("/api/getTokensBalance", {
            method: "POST",
            body: JSON.stringify({
              address: walletAddress ? walletAddress : address,
              chain,
            }),
          }).then((res) => res.json());
          setTokensBalance(fetchedTokensBalance);
        } catch (e) {
          console.log(e);
        }
      }
      setIsloading(false);
    };
    getWalletBalance();
  }, [isConnected]);

  // if no wallet is connected
  // display instructions to connect wallet
  if (isDisconnected || !walletAddress) {
    return (
      <div className={styles.token_panel_container}>
        <div className={styles.token_box}>
          <h2>CONNECT WALLET TO SEE TOKEN BALANCES</h2>
        </div>
      </div>
    );
  }
  
  // if wallet is connected but currently fetching data
  // display Loading...
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // when wallet is connected
  // display wallet address and token balances
  return (
    <div className={styles.token_panel_container}>
      <div className={styles.token_box}>

        <h2>{`${address.slice(0, 6)}...${address.slice(38)}`}</h2>

        {/* display each token and it's balance from the wallet address */}
        <div className={styles.tokens_container}>
          {tokensBalance?.length &&
            tokensBalance.map((token) => {
              return (
                <div key={token.symbol} className={styles.token}>
                  <div className={styles.token_name_container}>
                    <div className={styles.image_container}>
                      <img
                        src={
                          token.logo
                            ? token.logo
                            : "http://fpoimg.com/40x40"
                        }
                      />
                    </div>
                    <p className={styles.token_name}>{token.name}</p>
                  </div>
                  <div className={styles.info_container}>
                    <div className={styles.token_name_symbol_container}>
                      <p className={styles.token_balance}>{token.balance}</p>
                      <p className={styles.token_symbol}>{token.symbol}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}