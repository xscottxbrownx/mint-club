// Imported Components
import DashboardLayout from "../../components/dashboard/DashboardLayout";
// Imported stylesheet
import classes from "../../styles/dashboard/Profits.module.css";

const Profits = () => {
  return (
    <div className={classes.profitsContainer}>
      <div className={classes.placeholder}>PROFITS COMPONENT</div>
    </div>
  );
};

export default Profits;


Profits.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};