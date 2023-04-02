// Imports from Prop Types
import PropTypes from "prop-types";
// Imports from Next
import { useRouter } from "next/router";
import Link from "next/link";
// Imported assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Imported stylesheet
import classes from "./DashNavLink.module.css";



export const DashNavLink = ({ expandSidebar, link, icon, text }) => {

  const router = useRouter();

  // if current url matches the link, style the link
  const curPath =
    router.pathname === link
      ? classes.sidebarLinkActive
      : null


  return (
    <Link
      href={link}
      className={`${curPath} ${classes.sidebarLink} ${classes.flex} fa-2x`}
    >
      {/* if sidebar is expanded, show text along with icon */}
      {expandSidebar && <p>{text}</p>}
      <FontAwesomeIcon icon={icon} />
    </Link>
  );
};


// Define the prop types of what this component needs
DashNavLink.prototype = {
  expandSidebar: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
};
