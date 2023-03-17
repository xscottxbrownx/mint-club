// Imports from React
import { useState, useEffect } from "react";
// Imports from Wagmi
import { useAccount } from "wagmi";
// Imported Stylesheets
import styles from "../../../styles/dashboard/TokenBalancesDisplay.module.css";


export default function Tbd2() {
  // available from connected wallet
  const { address, isConnected, isConnecting } = useAccount();

  const [tokensBalance, setTokensBalance] = useState();
  const [addressInput, setAddressInput] = useState(address ? address : null);
  const [isLoading, setIsloading] = useState(false);
  const [fetchMethod, setFetchMethod] = useState(address ? "connectedWallet" : "wallet");
  const [chain, setChain] = useState(process.env.NEXT_PUBLIC_ALCHEMY_NETWORK);
  


  // set fetchMethod based on selection (wallet address, collection, or connected wallet)
  const changeFetchMethods = (e) => {
    // setTokensBalance();
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

  // fetch tokens balance of wallet
  const getWalletBalance = async () => {
    // RENDER Loading...
    setIsloading(true);
    // try api call with connected wallet address
    if (fetchMethod == "connectedWallet") {
      try {
        const fetchedTokensBalance = await fetch("/api/getTokensBalance", {
          method: "POST",
          body: JSON.stringify({
            address: address,
            chain: chain,
          }),
        }).then((res) => res.json());
        setTokensBalance(fetchedTokensBalance);
      } catch (e) {
        console.log(e);
      }
    }
    // try api call with input address
    else if (fetchMethod == "wallet") {
      try {
        const fetchedTokensBalance = await fetch("/api/getTokensBalance", {
          method: "POST",
          body: JSON.stringify({
            address: addressInput,
            chain: chain,
          }),
        }).then((res) => res.json());
        setTokensBalance(fetchedTokensBalance);
      } catch (e) {
        console.log(e);
      }
    }
    // HIDE Loading...
    setIsloading(false);
  };
  

  // ON COMPONENT MOUNT :
  // if a wallet is connected to the site
  // try to fetch the token balances in wallet
  useEffect(() => {
    if (isConnected) {
      getWalletBalance();
    }
  },[]);
  


  return (
    <div className={styles.tokenBalances_page}>
      <div>
  
        {/* ===== START OF RENDER TOP INPUTS ===== */}
        <div className={styles.fetch_selector_container}>
          <h2 style={{ fontSize: "20px" }}>Explore tokens by</h2>
  
          {/* select the fetchMethod */}
          <div className={styles.select_container}>
            <select
              defaultValue={fetchMethod}
              value={fetchMethod}
              onChange={(e) => {changeFetchMethods(e)}}
            >
              <option value={"wallet"}>address</option>
              <option value={"connectedWallet"}>connected wallet</option>
            </select>
          </div>
        </div>
  
        <div className={styles.inputs_container}>
          <div className={styles.input_button_container}>
            {/* wallet address input */}
            <input
              defaultValue={addressInput}
              value={addressInput}
              onChange={(e) => {setAddressInput(e.target.value)}}
              placeholder="Insert wallet address"
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
              <div onClick={() => getWalletBalance()} className={styles.button_blue}>
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
        // if wallet is connected RENDER TOKEN BALANCE DIV
        isConnected && !addressInput ? (
          <div className={styles.token_panel_container}>
            <div className={styles.token_box}>
              <h2>{`${address.slice(0, 6)}...${address.slice(38)}`}</h2> 
              {/* display each token and it's balance from the wallet address */}
              <div className={styles.tokens_container}>
                {tokensBalance?.length && tokensBalance.map((token) => {
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
                        <div className={styles.token_symbol_container}>
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
          ) : (
            // if address is input RENDER TOKEN BALANCE DIV
            addressInput ? (
              <div className={styles.token_panel_container}>
                <div className={styles.token_box}>
                  <h2>{`${addressInput.slice(0, 6)}...${addressInput.slice(38)}`}</h2>
                  {/* display each token and it's balance from the wallet address */}
                  <div className={styles.tokens_container}>
                    {tokensBalance?.length && tokensBalance.map((token) => {
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
                            <div className={styles.token_symbol_container}>
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
            ) : (
              // if wallet is NOT connected, RENDER INSTRUCTIONS to connect wallet
              <div className={styles.token_panel_container}>
                <div className={styles.token_box}>
                  <h2><span>CONNECT WALLET</span> OR <span>ENTER WALLET ADDRESS & CLICK SEARCH</span> TO SEE TOKEN BALANCES</h2>
                </div>
              </div>
            )
          )
      )}
      {/* ===== END OF RENDER DATA ===== */}
    </div>
  );
}