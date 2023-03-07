// Imported Components
import DashboardLayout from "../../components/dashboard/DashboardLayout";
// Imported stylesheet
import classes from "../../styles/dashboard/Notifications.module.css";

const Notifications = () => {
  return (
    <div className={classes.notificationsContainer}>
      <div className={classes.placeholder}>NOTIFICATIONS COMPONENT</div>
    </div>
  );
};

export default Notifications;


Notifications.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};