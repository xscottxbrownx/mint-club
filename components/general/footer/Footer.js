/* Imported assets */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faShip } from "@fortawesome/free-solid-svg-icons";
/* Imported stylesheet */
import classes from "./Footer.module.css";



export default function Footer() {

  // create social icons data to .map() through
  const socialIcons = [
    {
      href: "https://discord.gg/furusmintclub",
      icon: faDiscord,
    },
    {
      href: "https://twitter.com/furusmintclub",
      icon: faTwitter,
    },
    {
      href: "https://opensea.io/collection/furusmintclub",
      icon: faShip,
    },
  ];
  
  // create social icons links in footer using socialIcons array
  const socialIconsLinks = socialIcons.map((link) => (
    <a
      key={link.href}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={link.icon} />
    </a>
  ));


  
  // MAIN RETURN/RENDER OF COMPONENT
  // ====================================================================
  return (
    <footer className={classes.footerContainer}>
      {/* social icons/links */}
      <div className={classes.social}>
        {socialIconsLinks}
      </div>
      {/* copyright info */}
      <div className={classes.copyrightBlock}>
        <span className={classes.copyright}>
          Copyright
        </span>
        &copy; 2023.{" "}
        <span className={classes.FMCtext}>
          <b>Free Mint Club</b>
        </span>
      </div>
    </footer>
  );
};