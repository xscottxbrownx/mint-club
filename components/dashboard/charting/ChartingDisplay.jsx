// Imported from Next
import Script from 'next/script';
// Imported Stylesheet
import styles from './ChartingDisplay.module.css';



export default function ChartingDisplay({ addressSearch }) {

  return (
    <div className={styles.floor_price_container}>
      {/* floor price chart widget */}
      <Script
        type="module"
        src="https://static-assets.nftgo.io/data-partner/prod/widgets/price-graph.js">
      </Script>
      <price-graph 
        contract={addressSearch}
        data-theme="light"
        showWashTrade="true"
        showOutliers="true"
        defaultTimeSpan="7d"
        timeSpan='["24h","7d","30d"]'
        language="en">
      </price-graph>
    </div>
  );
}