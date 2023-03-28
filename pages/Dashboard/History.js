// Imports from React
import { useState } from "react";
// Imports from Wagmi
import { useAccount } from "wagmi";
// Imported Components
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import HistoryDisplay from "../../components/dashboard/history/HistoryDisplay";
import HistoryInputs from "../../components/dashboard/history/HistoryInputs";
// Imported stylesheet
import styles from "../../styles/dashboard/History.module.css";



export default function History() {

  const { address, isConnected } = useAccount();
  const [fetchMethod, setFetchMethod] = useState(isConnected ? "connectedWallet" : "stringWallet")
  const [addressInput, setAddressInput] = useState(isConnected && address ? address : "");
  const [addressSearch, setAddressSearch] = useState(isConnected && address ? address : "");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState();


  return (
    <div className={styles.main}>
      <div className={styles.transactionHistory_page}>
        <HistoryInputs
          fetchMethod={fetchMethod}
          setFetchMethod={setFetchMethod}
          setIsLoading={setIsLoading}
          transactionHistory={transactionHistory}
          setTransactionHistory={setTransactionHistory}
          addressInput={addressInput}
          setAddressInput={setAddressInput}
          setAddressSearch={setAddressSearch}
        />
        <HistoryDisplay
          isLoading={isLoading}
          transactionHistory={transactionHistory}
          addressSearch={addressSearch}
        />
      </div>
    </div>
  );
};


History.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};