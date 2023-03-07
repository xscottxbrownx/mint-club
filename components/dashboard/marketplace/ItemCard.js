/* Imported stylesheet */
import classes from "./ItemCard.module.css";

const ItemCard = ({
  tokenPrice,
  qty,
  imageSrc,
  imageAlt,
  title,
  description,
}) => {
  return (
    <div className={classes.itemCardContainer}>
      <div className={classes.aboveImageContainer}>
        <p>{tokenPrice}</p>
        <p>{qty} available</p>
      </div>
      <img src={imageSrc} alt={imageAlt}></img>
      <h3>{title}</h3>
      <h5>{description}</h5>
      <button>Purchase</button>
    </div>
  );
};

export default ItemCard;
