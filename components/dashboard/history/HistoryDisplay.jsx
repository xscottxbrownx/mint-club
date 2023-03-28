// Imports from React
import { useEffect, useState } from "react";
// Imports from Wagmi
import { useAccount } from "wagmi";
// Imported Stylesheet
import styles from "./HistoryDisplay.module.css";

export default function HistoryDisplay() {
  // available from connected wallet
  const { address, isConnected, isDisconnected } = useAccount();

  const [transactionHistory, setTransactionHistory] = useState();
  const [chain, setChain] = useState(process.env.NEXT_PUBLIC_ALCHEMY_NETWORK);
  const [fetchMethod, setFetchMethod] = useState(
    address ? "connectedWallet" : "wallet"
  );
  const [addressInput, setAddressInput] = useState(address ? address : null);
  const [isLoading, setIsloading] = useState(false);

  // set fetchMethod based on selection (wallet address, collection, or connected wallet)
  const changeFetchMethods = (e) => {
    switch (e.target.value) {
      case "wallet":
        setAddressInput("");
        break;
      case "connectedWallet":
        setAddressInput(address);
        break;
    }
    setFetchMethod(e.target.value);
  };

  // fetch transaction history of address (last 30 days on free plan of NftGo)
  const getTransactionHistory = async () => {
    // RENDER Loading...
    setIsloading(true);
    // fetch transaction history
    try {
      // get timestamp of current time for data fetching
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      // fetch transaction history
      const fetchedTransactionHistory = await fetch(
        `https://data-api.nftgo.io/eth/v1/history/address/${addressInput}/activities?action=all&scroll=${timestamp}&exclude_wash_trading=false&contract_address=all`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "X-API-KEY": "ea0d38e8-215b-4b9b-b7f5-e60657b933b4",
          },
        }
      ).then((res) => res.json());
      setTransactionHistory(fetchedTransactionHistory);
    } catch (e) {
      console.error(e);
    }
    // HIDE Loading...
    setIsloading(false);
    console.log(transactionHistory);
  };

  // ON COMPONENT MOUNT :
  // if a wallet is connected to the site
  // try to fetch the transaction history of wallet
  useEffect(() => {
    if (isConnected) {
      getTransactionHistory();
    }
  }, []);

  // allow ENTER key to run same function as SEARCH button onClick
  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      getTransactionHistory();
    }
  };

  // ==== START RENDER PROPER H2 (instructions/wallet address of data being displayed) ====
  const determineHistoryPanelTitle = (addressInput, address) => {
    if (addressInput || address) {
      const titleText = addressInput ? addressInput : address;
      return titleText.length > 12
        ? `${titleText.slice(0, 6)}...${titleText.slice(titleText.length - 4)}`
        : titleText;
    }
    return (
      <div>
        <span>CONNECT WALLET</span> OR{" "}
        <span>ENTER WALLET ADDRESS & CLICK SEARCH</span> TO SEE TOKEN BALANCES
      </div>
    );
  };

  const historyPanelTitle = determineHistoryPanelTitle(addressInput, address);
  // ==== END RENDER PROPER H2 (instructions/wallet address of data being displayed) ====

  // MAIN RETURN/RENDER OF COMPONENT
  // ====================================================================
  return (
    <div className={styles.transactionHistory_page}>
      <div>
        {/* ===== START OF RENDER TOP INPUTS ===== */}
        <div className={styles.fetch_selector_container}>
          <h2 style={{ fontSize: "20px" }}>Explore history by</h2>

          {/* select the fetchMethod */}
          <div className={styles.select_container}>
            <select value={fetchMethod} onChange={(e) => changeFetchMethods(e)}>
              <option value={"wallet"}>address</option>
              <option value={"connectedWallet"}>connected wallet</option>
            </select>
          </div>
        </div>

        <div className={styles.inputs_container}>
          <div className={styles.input_button_container}>
            {/* wallet address input */}
            {fetchMethod === "connectedWallet" ? (
              <input
                value={address ? address : ""}
                readOnly={true}
                placeholder="Connect wallet"
              />
            ) : (
              <input
                value={addressInput ?? ""}
                onChange={(e) => setAddressInput(e.target.value)}
                onKeyDown={onKeyDownHandler}
                placeholder="Enter wallet address"
              />
            )}
            <div className={styles.buttons_under_input}>
              {/* select the blockchain */}
              <div className={styles.select_container_alt}>
                <select
                  onChange={(e) => {
                    setChain(e.target.value);
                  }}
                  defaultValue={process.env.ALCHEMY_NETWORK}
                >
                  <option value={"ETH_MAINNET"}>Mainnet</option>
                  <option value={"MATIC_MAINNET"}>Polygon</option>
                  <option value={"ETH_GOERLI"}>Goerli</option>
                  <option value={"MATIC_MUMBAI"}>Mumbai</option>
                </select>
              </div>
              {/* search button */}
              <div
                onClick={() => getTransactionHistory()}
                className={styles.button_blue}
              >
                <a>Search</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ===== END OF RENDER TOP INPUTS ===== */}

      {/* ===== START OF RENDER DATA ===== */}
      {/* if loading data, RENDER Loading... */}
      {isLoading ? (
        <div className={styles.loading_box}>
          <p>Loading...</p>
        </div>
      ) : (
        // if not loading, RENDER...
        <div className={styles.history_panel_container}>
          <div className={styles.history_box}>
            {/* instructions to connect or enter wallet address */}
            <h2>{historyPanelTitle}</h2>
            {/* display each token and it's balance from the wallet address */}
            <div className={styles.transactions_container}>
              <table style={{ width: "70vw" }}>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Name</th>
                    <th>Token ID</th>
                    <th>{`Value (ETH)`}</th>
                    <th>{`Value (USD)`}</th>
                    <th>Tx Link</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory &&
                    transactionHistory.transactions.map(
                      (transaction, index) => {
                        const { action, nft, price, time, tx_hash } =
                          transaction;
                        return (
                          <tr key={index} className={styles.transaction}>
                            
                            <td style={{ textAlign: "center" }}>{action}</td>
                            <td style={{ textAlign: "center" }}>
                              {nft.collection_name
                                ? nft.collection_name
                                : `unknown`}
                            </td>
                            <td style={{textAlign: "center"}}>ID#{nft.token_id}</td>
                            <td style={{ textAlign: "center" }}>{price?.quantity ? price.quantity : "---"}</td>
                            <td style={{ textAlign: "center" }}>{price?.usd ? `$${price.usd.toFixed(2)}` : "---"}</td>
                            <td style={{ textAlign: "center" }}>
                              <a
                                href={`https://etherscan.io/tx/${tx_hash}`}
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                <img
                                  src={
                                    "https://etherscan.io/images/brandassets/etherscan-logo-circle.svg"
                                  }
                                  width="15px"
                                  height="15px"
                                />
                              </a>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {new Intl.DateTimeFormat("en-US", {
                                year: "2-digit",
                                month: "numeric",
                                day: "numeric",
                              }).format(time)}
                            </td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* ===== END OF RENDER DATA ===== */}
    </div>
  );
}
