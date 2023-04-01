// Imported Components
import DashboardLayout from "../../components/dashboard/DashboardLayout";
// Imported stylesheet
import classes from "../../styles/dashboard/Notifications.module.css";

export default function Notifications() {
  return (
    <div className={classes.notificationsContainer}>
      <div className={classes.placeholder}>NOTIFICATIONS COMPONENT</div>
    </div>
  );
};


Notifications.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};