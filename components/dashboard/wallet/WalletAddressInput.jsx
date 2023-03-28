// Imports from Wagmi
import { useAccount } from "wagmi";


export default function WalletAddressInput({
  fetchMethod,
  addressInput,
  setAddressInput,
  fetchData,
}) {

  const { address, isConnected } = useAccount();
  let inputValue = "";
  const onChange = e => setAddressInput(e.target.value);
  let placeholderText = "Enter Wallet Address";


  if (fetchMethod == "connectedWallet") {
    inputValue = address ? address : "";
    placeholderText = "Connect Wallet";
  }
  else if (addressInput) {
    inputValue = addressInput;
  }


  // allow ENTER key to run same function as SEARCH button onClick
  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      fetchData();
    }
  };



  // MAIN RETURN/RENDER OF COMPONENT
  // ====================================================================
  return (
    <input 
      value={inputValue}
      readOnly={fetchMethod === "connectedWallet"} 
      onChange={fetchMethod === "connectedWallet" ? null : onChange} 
      onKeyDown={fetchMethod === "connectedWallet" ? null : onKeyDownHandler} 
      placeholder={placeholderText} 
    />
  );
}