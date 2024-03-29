// Imports from React
import { useState } from "react";
// Imports from Next
import Link from "next/link";
import Image from "next/image";
// Imported Components
import { DashNavLink } from "./dashboardNavLink/DashNavLink";
import SidebarLinksData from "../../../data/SidebarLinks";
// Imported Stylesheet
import classes from "./Sidebar.module.css";
// Imported Assets
import FMC_logo from "../../../public/navbar_logo_dropshadow.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";



export default function Sidebar() {

  const [expandSidebar, setExpandSidebar] = useState(false);


  // click of arrow icon or link while sidebar is expanded will flip expandSidebar state
  const handleClick = () => {
    setExpandSidebar((expandSidebar) => !expandSidebar);
  };


  // determine which sidebar styling based on expandSidebar state
  const isExpanded =
    expandSidebar
      ? classes.sidebarExpanded
      : classes.sidebar


  // determine which styling for arrow icon container based on expandSidebar state
  const chevronContainer =
    expandSidebar
      ? classes.sidebarChevronLeft
      : classes.sidebarChevronRight
  
  
      // determine which arrow icon direction to show based on expandSidebar state
  const sidebarChevronIcon = 
    expandSidebar 
      ? faChevronLeft
      : faChevronRight


  // create sidebar links using SidebarLinksData array
  const sidebarLinks = SidebarLinksData.map((sidebarlink, index) => {

    const { link, text, icon } = sidebarlink;

    return (
      <li key={index} onClick={() => {
        if (expandSidebar) {
          handleClick();
        }
      }}>
        <DashNavLink
          expandSidebar={expandSidebar}
          link={link}
          text={text}
          icon={icon}
        />
      </li>
    );
  });


  
  // MAIN RETURN/RENDER OF COMPONENT
  // ====================================================================
  return (
    <nav className={isExpanded}>
      <div className={classes.sidebarIconsContainer}>
        <div className={classes.sidebarLogoChevronContainer}>
          {/* FMC logo link back to homepage */}
          <Link href="/">
            <Image
              src={FMC_logo}
              alt="FMC logo"
              className={classes.sidebarNavlogo}
              priority
            />
          </Link>
          <span />
          {/* arrow icon to open/close sidebar */}
          <div
            className={chevronContainer}
            onClick={() => {handleClick()}}
          >
            <FontAwesomeIcon
              icon={sidebarChevronIcon}
              className={`${expandSidebar && classes.sidebarLinkActive} ${
                classes.sidebarLink
              } fa-2x`}
            />
          </div>
          <span />
        </div>
        <span />
        {/* links to dashboard components */}
        <ul>
          {sidebarLinks}
        </ul>
        <span />
      </div>
    </nav>
  );
}