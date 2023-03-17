// Imported Components
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import TransactionHistoryDisplay from "../../components/dashboard/history/TransactionHistoryDisplay";
// Imported stylesheet
import styles from "../../styles/dashboard/History.module.css";

export default function History() {
  return (
    <div className={styles.main}>
      <TransactionHistoryDisplay />
    </div>
  );
};


History.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};