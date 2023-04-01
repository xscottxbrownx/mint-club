// Imports from Wagmi
import { useAccount } from "wagmi";
// Imported Stylesheets
import styles from "./TokensDisplay.module.css";



export default function TokensDisplay({
  isLoading,
  tokensBalance,
  addressSearch,
}) {

  const { address, isConnected } = useAccount();


  // ==== START RENDER PROPER H2 (instructions/wallet address of data being displayed) ====
  const determineTokenPanelTitle = (addressSearch, address, tokensBalance) => {

    if (addressSearch && tokensBalance && !tokensBalance.message || isConnected && tokensBalance && !tokensBalance.message) {
      const titleText = addressSearch ? addressSearch : address;

      return titleText.length > 12
        ? `${titleText.slice(0, 6)}...${titleText.slice(titleText.length - 4)}`
        : titleText;
    }

    // if (addressSearch && !tokensBalance || addressSearch && tokensBalance.message) {
    if (tokensBalance?.message && isConnected && !addressSearch) {
      return (
        <div>
          <span>INVALID WALLET ADDRESS</span>
        </div>
      );
    }

    return (
      <div>
        <span>CONNECT WALLET</span> OR{" "}
        <span>ENTER WALLET ADDRESS & CLICK SEARCH</span> TO SEE TOKEN BALANCES
      </div>
    );
  };

  const tokenPanelTitle = determineTokenPanelTitle(addressSearch, address, tokensBalance);
  // ==== END RENDER PROPER H2 (instructions/wallet address of data being displayed) ====



  // MAIN RETURN/RENDER OF COMPONENT
  // ====================================================================
  return (
    <>
      {/* if loading data, RENDER Loading... */}
      {isLoading 
        ? (
          <div className={styles.loading_box}>
            <p>Loading...</p>
          </div>
        ) 
        : (
        // if not loading, RENDER...
        <div className={styles.token_panel_container}>
          <div className={styles.token_box}>
            {/* instructions to connect or enter wallet address */}
            <h2>{tokenPanelTitle}</h2>
            {/* display each token and it's balance from the wallet address */}
            <div className={styles.tokens_container}>
              {tokensBalance?.length && tokensBalance.map((token, index) => {
                  return (
                    <div key={index} className={styles.token}>
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
                        <div className={styles.token_symbol_container}>
                          <p className={styles.token_balance}>
                            {new Intl.NumberFormat().format(token.balance)}
                          </p>
                          <p className={styles.token_symbol}>{token.symbol}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
