// Imports from React
import { useState } from "react";
// Imports from Wagmi
import { useAccount } from "wagmi";
// Imported Components
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import TokensBalanceDisplay from "../../components/dashboard/wallet/TokensBalanceDisplay";
import Inputs from "../../components/dashboard/wallet/Inputs";
// Imported stylesheet
import styles from "../../styles/dashboard/Wallet.module.css";



export default function Wallet() {
  const { address, isConnected } = useAccount();
  const [fetchMethod, setFetchMethod] = useState(isConnected ? "connectedWallet" : "stringWallet")
  const [addressInput, setAddressInput] = useState(isConnected && address ? address : "");
  const [addressSearch, setAddressSearch] = useState(isConnected && address ? address : "");
  const [isLoading, setIsLoading] = useState(false);
  const [tokensBalance, setTokensBalance] = useState();

  return (
    <div className={styles.main}>
      <div className={styles.tokenBalances_page}>
        <Inputs
          fetchMethod={fetchMethod}
          setFetchMethod={setFetchMethod}
          setIsLoading={setIsLoading}
          tokensBalance={tokensBalance}
          setTokensBalance={setTokensBalance}
          addressInput={addressInput}
          setAddressInput={setAddressInput}
          setAddressSearch={setAddressSearch}
        />
        <TokensBalanceDisplay
          isLoading={isLoading}
          tokensBalance={tokensBalance}
          addressSearch={addressSearch}
          addressInput={addressInput}
          fetchMethod={fetchMethod}
        />
      </div>
    </div>
  );
}


Wallet.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
