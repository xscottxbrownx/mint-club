// Imported Components
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import TokenBalancesDisplay from "../../components/dashboard/wallet/tokenBalancesDisplay.jsx"
// Imported stylesheet
import styles from "../../styles/dashboard/Wallet.module.css";


export default function Wallet() {
  return (
    <div className={styles.main}>
      <TokenBalancesDisplay />
    </div>
  );
}


Wallet.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};