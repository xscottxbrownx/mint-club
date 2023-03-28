// Imported Components
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import HistoryDisplay from "../../components/dashboard/history/HistoryDisplay";
// Imported stylesheet
import styles from "../../styles/dashboard/History.module.css";

export default function History() {
  return (
    <div className={styles.main}>
      <HistoryDisplay />
    </div>
  );
};


History.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};