/* Importing custom components */
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import ItemCard from "../../components/dashboard/marketplace/ItemCard.js";
/* Imported stylesheet */
import classes from "../../styles/dashboard/Marketplace.module.css";


const Marketplace = () => {
  return (
    <div className={classes.marketplaceItemsContainer}>
      <ItemCard
        tokenPrice="$TOKENprice"
        qty="qty"
        imageSrc="https://via.placeholder.com/150/1e1f21/44484d?text=Item"
        imageAlt="marketplace item"
        title="Title"
        description="DESCRIPTION/BENEFTIS go on these lines here"
      />
      <ItemCard
        tokenPrice="$TOKENprice"
        qty="qty"
        imageSrc="https://via.placeholder.com/150/1e1f21/44484d?text=Item"
        imageAlt="marketplace item"
        title="Title"
        description="DESCRIPTION/BENEFTIS go on these lines here"
      />
      <ItemCard
        tokenPrice="$TOKENprice"
        qty="qty"
        imageSrc="https://via.placeholder.com/150/1e1f21/44484d?text=Item"
        imageAlt="marketplace item"
        title="Title"
        description="DESCRIPTION/BENEFTIS go on these lines here"
      />
      <ItemCard
        tokenPrice="$TOKENprice"
        qty="qty"
        imageSrc="https://via.placeholder.com/150/1e1f21/44484d?text=Item"
        imageAlt="marketplace item"
        title="Title"
        description="DESCRIPTION/BENEFTIS go on these lines here"
      />
      <ItemCard
        tokenPrice="$TOKENprice"
        qty="qty"
        imageSrc="https://via.placeholder.com/150/1e1f21/44484d?text=Item"
        imageAlt="marketplace item"
        title="Title"
        description="DESCRIPTION/BENEFTIS go on these lines here"
      />
      <ItemCard
        tokenPrice="$TOKENprice"
        qty="qty"
        imageSrc="https://via.placeholder.com/150/1e1f21/44484d?text=Item"
        imageAlt="marketplace item"
        title="Title"
        description="DESCRIPTION/BENEFTIS go on these lines here"
      />
      <ItemCard
        tokenPrice="$TOKENprice"
        qty="qty"
        imageSrc="https://via.placeholder.com/150/1e1f21/44484d?text=Item"
        imageAlt="marketplace item"
        title="Title"
        description="DESCRIPTION/BENEFTIS go on these lines here"
      />
      <ItemCard
        tokenPrice="$TOKENprice"
        qty="qty"
        imageSrc="https://via.placeholder.com/150/1e1f21/44484d?text=Item"
        imageAlt="marketplace item"
        title="Title"
        description="DESCRIPTION/BENEFTIS go on these lines here"
      />
      <ItemCard
        tokenPrice="$TOKENprice"
        qty="qty"
        imageSrc="https://via.placeholder.com/150/1e1f21/44484d?text=Item"
        imageAlt="marketplace item"
        title="Title"
        description="DESCRIPTION/BENEFTIS go on these lines here"
      />
      <ItemCard
        tokenPrice="$TOKENprice"
        qty="qty"
        imageSrc="https://via.placeholder.com/150/1e1f21/44484d?text=Item"
        imageAlt="marketplace item"
        title="Title"
        description="DESCRIPTION/BENEFTIS go on these lines here"
      />
    </div>
  );
};

export default Marketplace;


Marketplace.getLayout = function getLayout(page) {
	return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
	);
}