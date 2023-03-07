/* Imported assets */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faShip } from "@fortawesome/free-solid-svg-icons";
/* Imported stylesheet */
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footerContainer}>
      <div className={classes.social}>
        <a
          href="https://discord.gg/furusmintclub"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FontAwesomeIcon icon={faDiscord} />
        </a>
        {"  "}
        <a
          href="https://twitter.com/furusmintclub"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        {"  "}
        {/* Need to change this to actual OPENSEA logo */}
        <a
          href="https://opensea.io/collection/furusmintclub"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FontAwesomeIcon icon={faShip} />
        </a>
      </div>
      <div className={classes.copyright}>
        Copyright &copy; 2021.{" "}
        <span className={classes.FMCtext}>
          <b>Free Mint Club</b>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
