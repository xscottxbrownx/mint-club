// Imports from React
import { useState } from "react";
// Imported Components
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import ChartingInputs from '../../components/dashboard/charting/ChartingInputs';
import ChartingDisplay from '../../components/dashboard/charting/ChartingDisplay';
// Imported stylesheet
import styles from "../../styles/dashboard/Charting.module.css";



export default function Charting() {

  const bayc = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
  const [addressInput, setAddressInput] = useState(bayc);
  const [addressSearch, setAddressSearch] = useState(addressInput);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.charting_page}>
        <ChartingInputs 
          setIsLoading={setIsLoading}
          addressInput={addressInput}
          setAddressInput={setAddressInput}
          setAddressSearch={setAddressSearch}
        />
        <ChartingDisplay 
          isLoading={isLoading}
          addressSearch={addressSearch}
        />
      </div>
    </div>
  );
}


Charting.getLayout = function getLayout(page) {
	return <DashboardLayout>{page}</DashboardLayout>;
}