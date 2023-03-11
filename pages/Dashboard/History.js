// Imported Components
import DashboardLayout from "../../components/dashboard/DashboardLayout";
// Imported stylesheet
import classes from "../../styles/dashboard/History.module.css";

const History = () => {
  return (
    <div className={classes.historyContainer}>
      <div className={classes.placeholder}>HISTORY COMPONENT</div>
    </div>
  );
};

export default History;


History.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};