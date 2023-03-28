// Imports from Wagmi
import { useAccount } from "wagmi";
// Imported Stylesheet
import styles from "./HistoryDisplay.module.css";



export default function HistoryDisplay({
  isLoading,
  transactionHistory,
  addressSearch,
}) {

  const { address, isConnected } = useAccount();


  // ==== START RENDER PROPER H2 (instructions/wallet address of data being displayed) ====
  const determineHistoryPanelTitle = (addressSearch, address, transactionHistory) => {
    
    if (addressSearch && transactionHistory && !transactionHistory.msg || isConnected && transactionHistory && !transactionHistory.msg) {
      const titleText = addressSearch ? addressSearch : address;

      return titleText.length > 12
        ? `${titleText.slice(0, 6)}...${titleText.slice(titleText.length - 4)}`
        : titleText;
    }

    // if (addressSearch && !transactionHistory || addressSearch && transactionHistory.message) {
    if (transactionHistory?.msg && isConnected && !addressSearch) {
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

  const historyPanelTitle = determineHistoryPanelTitle(addressSearch, address, transactionHistory);
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
        <div className={styles.history_panel_container}>
          <div className={styles.history_box}>
            {/* instructions to connect or enter wallet address */}
            <h2>{historyPanelTitle}</h2>
            {/* display each transaction from the wallet address */}
            {transactionHistory && transactionHistory.transactions &&
            <div className={styles.transactions_container}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Name</th>
                    <th>Token ID</th>
                    <th>{`Value (ETH)`}</th>
                    <th>{`Value (USD)`}</th>
                    <th>Etherscan</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory && transactionHistory.transactions?.map((transaction, index) => {
                    const { action, nft, price, time, tx_hash } = transaction;
                    return (
                      <tr key={index} className={styles.transaction}>
                        <td>{action}</td>
                        <td>{nft.collection_name ? nft.collection_name : `unknown`}</td>
                        <td>{nft.token_id}</td>
                        <td>{price?.quantity ? price.quantity : "---"}</td>
                        <td>{price?.usd ? `$${price.usd.toFixed(2)}` : "---"}</td>
                        <td>
                          <a
                            href={`https://etherscan.io/tx/${tx_hash}`}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            <img src={"https://etherscan.io/images/brandassets/etherscan-logo-circle.svg"}/>
                          </a>
                        </td>
                        <td>
                          {new Intl.DateTimeFormat("en-US", {
                            year: "2-digit",
                            month: "numeric",
                            day: "numeric",
                          }).format(time)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            }
          </div>
        </div>
      )}
    </>
  );
}
