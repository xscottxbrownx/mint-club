// Imported from Next
import Image from "next/image";
// Imported stylesheet
import classes from "./TeamCard.module.css";

const TeamCard = ({
  title,
  imageSrc,
  imageAlt,
  discordUsername,
  twitterUsername,
}) => {
  return (
    <div className={classes.teamCardContainer}>
      <div className={classes.titleContainer}>
        <h3>{title}</h3>
      </div>
      <div className={classes.infoContainer}>
        <div className={classes.imageContainer}>
          <Image src={imageSrc} alt={imageAlt} fill />
        </div>
        <h4>
          Discord: <span>{discordUsername}</span>
        </h4>
        <h4>
          Twitter: <span>{twitterUsername}</span>
        </h4>
      </div>
    </div>
  );
};

export default TeamCard;
