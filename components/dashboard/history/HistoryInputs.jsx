// Imports from React
import { useState, useEffect, useRef } from "react";
// Imports from Wagmi
import { useAccount } from "wagmi";
// Imported Components
import WalletAddressInput from "../wallet/WalletAddressInput";
// Imported Stylesheets
import styles from "./HistoryInputs.module.css";    
    
    
export default function HistoryInputs({
  fetchMethod,
  setFetchMethod,
  setIsLoading,
  transactionHistory,
  setTransactionHistory,
  addressInput,
  setAddressInput,
  setAddressSearch,
}) {

  const { address, isConnected } = useAccount();
  const [chain, setChain] = useState(process.env.NEXT_PUBLIC_ALCHEMY_NETWORK);
  const isFirstRender = useRef(true);


  // set fetchMethod based on selection (wallet address, collection, or connected wallet)
  const changeFetchMethods = (e) => {
    switch (e.target.value) {
      case "stringWallet":
        setAddressInput("");
        break;
      case "connectedWallet":
        setAddressInput(address ? address : "");
        break;
    }
    setFetchMethod(e.target.value);
  };


  // ==== START FETCH TRANSACTION HISTORY OF WALLET (last 30 days on free plan of NftGo) ====
  const getTransactionHistory = async () => {
    // RENDER Loading...
    setIsLoading(true);
    // set state to pass to BalanceDisplay component and RENDER proper title
    setAddressSearch(addressInput);
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
    setIsLoading(false);
    console.log(transactionHistory);
  };
  // ==== END FETCH TRANSACTION HISTORY OF WALLET ====


  // ON COMPONENT MOUNT :
  // if a wallet is connected to the site
  // try to fetch the transaction history of wallet
  useEffect(() => {
    if (isConnected) {
      getTransactionHistory();
    }
  }, []);



  // MAIN RETURN/RENDER OF COMPONENT
  // ====================================================================
  return (
    <div>
      <div className={styles.fetch_selector_container}>
        <h2>Explore history by:</h2>
        {/* select the fetchMethod */}
        <div className={styles.select_container}>
          <select value={fetchMethod} onChange={(e) => changeFetchMethods(e)}>
            <option value={"stringWallet"}>wallet address</option>
            <option value={"connectedWallet"}>connected wallet</option>
          </select>
        </div>
      </div>
      <div className={styles.inputs_container}>
        <div className={styles.input_button_container}>
          <WalletAddressInput
            fetchMethod={fetchMethod}
            addressInput={addressInput}
            setAddressInput={setAddressInput}
            fetchData={getTransactionHistory}
          />
          <div className={styles.buttons_under_input}>
            {/* select the blockchain */}
            <div className={styles.select_container_alt}>
              <select
                onChange={(e) => {setChain(e.target.value)}}
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
  );
}