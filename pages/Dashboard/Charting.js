// Imported Components
import DashboardLayout from "../../components/dashboard/DashboardLayout";
// Imported stylesheet
import classes from "../../styles/dashboard/Charting.module.css";


const Charting = () => {
  return (
    <div className={classes.chartingContainer}>
      <div className={classes.chartingImageContainer}>
        <img
          src="https://via.placeholder.com/1200x600/1e1f21/44484d?text=CHART"
          alt="placeholder of chart"
        />
      </div>
      <div className={classes.chartingButtonContainer}>
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
        <button>Button 4</button>
        <button>Button 5</button>
      </div>
    </div>
  );
};

export default Charting;


Charting.getLayout = function getLayout(page) {
	return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
	);
}