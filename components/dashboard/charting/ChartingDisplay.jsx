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
        src="https://static-assets.nftgo.io/data-partner/prod/widgets/price-graph.js"
      />
      <price-graph 
        contract={addressSearch}
        data-theme="light"
        showWashTrade="true"
        showOutliers="true"
        defaultTimeSpan="7d"
        timeSpan='["24h","7d","30d"]'
        language="en"
      />

      {/* holding period chart */}
      <Script
        type="module"
        src="https://static-assets.nftgo.io/data-partner/prod/widgets/holding-period-chart.js"
      />
      <holding-period-chart
        contract={addressSearch}
        data-theme="light"
        showLegends="true"
        language="en"
      />

      {/* holding amount chart */}
      <Script
        type="module"
        src="https://static-assets.nftgo.io/data-partner/prod/widgets/holding-amount-chart.js"
      />
      <holding-amount-chart
        contract={addressSearch}
        data-theme="light"
        showLegends="true"
        language="en"
      />
    </div>
  );
}