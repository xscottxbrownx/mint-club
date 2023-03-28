// Imports from React
import { useState, useEffect, useRef } from "react";
// Imports from Wagmi
import { useAccount } from "wagmi";
// Imported Components
import WalletAddressInput from "./WalletAddressInput.jsx";
// Imported Stylesheets
import styles from "./TokensInputs.module.css";



export default function TokensInputs({
  fetchMethod,
  setFetchMethod,
  setIsLoading,
  tokensBalance,
  setTokensBalance,
  addressInput,
  setAddressInput,
  setAddressSearch,
}) {

  const { address, isConnected } = useAccount();
  const [chain, setChain] = useState(process.env.NEXT_PUBLIC_ALCHEMY_NETWORK);
  const isFirstRender = useRef(true);


  // set fetchMethod based on selection (wallet address or connected wallet)
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


  // ==== START FETCH TOKENS BALANCE OF WALLET ====
  const getWalletBalance = async () => {
    // RENDER Loading...
    setIsLoading(true);
    // set state to pass to BalanceDisplay component and RENDER proper title
    setAddressSearch(addressInput);
    // set address based on fetchMethod
    const properAddress =
      fetchMethod == "connectedWallet" 
        ? address 
        : addressInput;
    // FETCH tokens balance of wallet
    try {
      const fetchedTokensBalance = await fetch("/api/getTokensBalance", {
        method: "POST",
        body: JSON.stringify({
          address: properAddress,
          chain: chain,
        }),
      }).then((res) => res.json());
      setTokensBalance(fetchedTokensBalance);
    } catch (e) {
      console.error("Error fetching wallet data: ", e);
    }
    // HIDE Loading...
    setIsLoading(false);
  };
  // ==== END FETCH TOKENS BALANCE OF WALLET ====


  // ON COMPONENT MOUNT :
  // if a wallet is connected to the site
  // try to fetch the token balances in wallet
  useEffect(() => {
    if (isConnected) {
      getWalletBalance();
    }
  }, []);


  // ========= ISSUE WITH SHOWING CONNECTED WALLET IF CONNECTING AFTER ONMOUNT ==========
  useEffect(() => {
    // don't run onMount/initial component load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // rest of code to run after first skipped
    if (addressInput === "" && tokensBalance === undefined) {
      console.log("useEffect trigged on connecting");
      setFetchMethod("connectedWallet");
      setAddressInput(address);
      setAddressSearch(addressInput);
      getWalletBalance(); // think it fails because seemingly setAddressSeach(addressInput) doesn't happen
    }
    if (fetchMethod === "connectedWallet") {
      getWalletBalance();
    }
  }, [isConnected]);
  // ====================================================================================



  // MAIN RETURN/RENDER OF COMPONENT
  // ====================================================================
  return (
    <div>
      <div className={styles.fetch_selector_container}>
        <h2>Explore tokens by</h2>
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
            fetchData={getWalletBalance}
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
              onClick={() => getWalletBalance()}
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