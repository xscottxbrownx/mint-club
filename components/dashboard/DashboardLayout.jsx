// Imported Components
import Sidebar from "./sidebar/Sidebar";
// Imported Stylesheet
import classes from "./DashboardLayout.module.css";

export default function DashboardLayout({ children }) {
  return (
    <div className={classes.dashboard}>
      <Sidebar />
      <div className={classes.dashboardContent}>{children}</div>
    </div>
  );
}
