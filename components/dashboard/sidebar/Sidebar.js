// Imports from React
import { useState } from "react";
// Imports from Next
import Link from "next/link";
import Image from "next/image";
// Imported custom components
import { DashNavLink } from "./dashboardNavLink/DashNavLink";
// Imported stylesheet
import classes from "./Sidebar.module.css";
// Imported assets
import FMC_logo from "../../../public/navbar_logo_dropshadow.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faImage,
  faCoins,
  faChartLine,
  faChevronLeft,
  faChevronRight,
  faDollarSign,
  faLandmark,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [expandSidebar, setExpandSidebar] = useState(false);

  const handleClick = () => {
    const expandmenu = document.getElementsByClassName(classes.sidebar)[0];
    expandmenu.classList.toggle(classes.expanded);
    setExpandSidebar((expandSidebar) => !expandSidebar);
  };

  return (
    <nav className={classes.sidebar}>
      <div className={classes.sidebarIconsContainer}>
        <div className={classes.sidebarLogoChevronContainer}>
          <Link href="/">
            <Image
              src={FMC_logo}
              alt="FMC logo"
              className={classes.sidebarNavlogo}
              priority
            />
          </Link>
          <span></span>
          <div
            className={
              expandSidebar
                ? classes.sidebarChevronLeft
                : classes.sidebarChevronRight
            }
            onClick={() => {
              handleClick();
            }}
          >
            <FontAwesomeIcon
              icon={expandSidebar ? faChevronLeft : faChevronRight}
              className={`${expandSidebar && classes.sidebarLinkActive} ${
                classes.sidebarLink
              } fa-2x`}
            />
          </div>
          <span></span>
        </div>
        <span></span>
        <ul>
          <li
            onClick={() => {
              if (expandSidebar) {
                handleClick();
              }
            }}
          >
            <DashNavLink
              expandSidebar={expandSidebar}
              link="/Dashboard/Gallery"
              text="Gallery"
              icon={faImage}
            />
          </li>
          <li
            onClick={() => {
              if (expandSidebar) {
                handleClick();
              }
            }}
          >
            <DashNavLink
              expandSidebar={expandSidebar}
              link="/Dashboard/Wallet"
              text="Wallet"
              icon={faCoins}
            />
          </li>
          <li
            onClick={() => {
              if (expandSidebar) {
                handleClick();
              }
            }}
          >
            <DashNavLink
              expandSidebar={expandSidebar}
              link="/Dashboard/History"
              text="History"
              icon={faLandmark}
            />
          </li>
          <li
            onClick={() => {
              if (expandSidebar) {
                handleClick();
              }
            }}
          >
            <DashNavLink
              expandSidebar={expandSidebar}
              link="/Dashboard/Marketplace"
              text="Shop"
              icon={faDollarSign}
            />
          </li>
          <li
            onClick={() => {
              if (expandSidebar) {
                handleClick();
              }
            }}
          >
            <DashNavLink
              expandSidebar={expandSidebar}
              link="/Dashboard/Charting"
              text="Chart"
              icon={faChartLine}
            />
          </li>
          <li
            onClick={() => {
              if (expandSidebar) {
                handleClick();
              }
            }}
          >
            <DashNavLink
              expandSidebar={expandSidebar}
              link="/Dashboard/Notifications"
              text="Notify"
              icon={faBell}
            />
          </li>
        </ul>
        <span></span>
      </div>
    </nav>
  );
};

export default Sidebar;
