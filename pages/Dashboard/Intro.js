// Imported Components
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
// Imported stylesheet
import classes from "../../styles/dashboard/Intro.module.css";


export default function Intro() {
  return (
    <div className={classes.dashboardIntro}>
      <h1>You are now logged into the Member Dashboard</h1>
      <h2>Choose a tool from the left menu</h2>
    </div>
  );
};


Intro.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};