/* Importing custom components */
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import ItemCard from "../../components/dashboard/marketplace/ItemCard.js";
/* Imported stylesheet */
import classes from "../../styles/dashboard/Marketplace.module.css";


export default function Marketplace() {

  const itemCards = 
    Array.from({length: 10})
         .map((itemCard, index) => (
            <ItemCard 
              key={index}
              tokenPrice = "$TOKENprice"
              qty="qty"
              imageSrc="https://via.placeholder.com/150/1e1f21/44484d?text=Item"
              imageAlt="marketplace item"
              title="Title"
              description="DESCRIPTION/BENEFITS go on these lines here"
            />
         ));



  return (
    <div className={classes.marketplaceItemsContainer}>
      {itemCards}
    </div>
  );
};


Marketplace.getLayout = function getLayout(page) {
	return <DashboardLayout>{page}</DashboardLayout>;
}