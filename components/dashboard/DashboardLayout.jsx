// Imported Components
import Sidebar from "./sidebar/Sidebar";
import GalleryConnect from "./gallery/galleryConnect";
// Imported Stylesheet
import classes from "./DashboardLayout.module.css";


export default function DashboardLayout({ children }) {
  
  return (
    <div className={classes.dashboard}>
      <Sidebar />
      <GalleryConnect />
      <div className={classes.dashboardContent}>{children}</div>
    </div>
  );
}
