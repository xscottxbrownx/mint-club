// Imported Components
import Sidebar from "./sidebar/Sidebar";
import WalletConnect from "./WalletConnect";
// Imported Stylesheet
import classes from "./DashboardLayout.module.css";


export default function DashboardLayout({ children }) {
  
  return (
    <div className={classes.dashboard}>
      <Sidebar />
      <WalletConnect />
      <div className={classes.dashboardContent}>{
        children}
      </div>
    </div>
  );
}
