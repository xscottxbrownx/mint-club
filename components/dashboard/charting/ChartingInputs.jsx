// Imports from React
import { useState } from "react";
// Imported Stylesheets
import styles from "./ChartingInputs.module.css";



export default function ChartingInputs({
  addressInput,
  setAddressInput,
  setAddressSearch,
}) {

  const [chain, setChain] = useState(process.env.NEXT_PUBLIC_ALCHEMY_NETWORK);


  // allow ENTER key to run same function as SEARCH button onClick
  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      setAddressSearch(`${e.target.value}`);
    }
  };



  // MAIN RETURN/RENDER OF COMPONENT
  // ====================================================================
  return (
    <>
      <div className={styles.fetch_selector_container}>
        <div>
          <h2>Explore floor price by:</h2>
        </div>
        {/* select the fetchMethod */}
        <div className={styles.select_container}>
          <select value={"stringWallet"} onChange={(e) => changeFetchMethods(e)} disabled>
            <option value={"stringWallet"}>wallet address</option>
            <option value={"connectedWallet"}>connected wallet</option>
          </select>
        </div>
      </div>
      <div className={styles.inputs_container}>
        <div className={styles.input_button_container}>
        <input 
          value={addressInput} 
          onChange={e => setAddressInput(e.target.value)} 
          onKeyDown={onKeyDownHandler} 
          placeholder="Enter Contract Address"
          disabled
        />
          <div className={styles.buttons_under_input}>
            {/* select the blockchain */}
            <div className={styles.select_container_alt}>
              <select
                onChange={(e) => {setChain(e.target.value)}}
                defaultValue={process.env.ALCHEMY_NETWORK}
                disabled
              >
                <option value={"ETH_MAINNET"}>Mainnet</option>
                <option value={"MATIC_MAINNET"}>Polygon</option>
                <option value={"ETH_GOERLI"}>Goerli</option>
                <option value={"MATIC_MUMBAI"}>Mumbai</option>
              </select>
            </div>
            {/* search button */}
            <div
              onClick={() => setAddressSearch(addressInput)}
              className={styles.button_blue}
              disabled
            >
              <a>Search</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}