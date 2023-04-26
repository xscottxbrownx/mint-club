// Imports from React
import { useState } from "react";
// Imports from Next
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// Imported Components
import GeneralLinksData from "../../../data/GeneralLinks";
// Imported assets
import FMC_logo from "../../../public/navbar_logo_dropshadow.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// Imported stylesheet
import classes from "./GeneralNavbar.module.css";



export default function GeneralNavbar() {
  
  const [active, setActive] = useState(false);
  const router = useRouter();


  // click of link or hamburger menu icon in these conditions will flip active state 
  const handleClick = () => {
    if ( window.innerWidth <= 600 || (window.innerWidth > 600 && active) ) {
      setActive((active) => !active);
    }
    return
  };


  // determine which menu icon (hamburger or X) based on active state
  const menuIcon = 
    active 
      ? <FontAwesomeIcon className={`${classes.closeIcon} fa-2x`} icon={faTimes} />
      : <FontAwesomeIcon className={`${classes.hamburgerIcon} fa-2x`} icon={faBars} />


  // determine which nav menu styling based on active state
  const allLinks =
    active
      ? classes.navlistShow
      : classes.navlist


  // create general links in navbar using generalLinksData array
  const generalLinks = GeneralLinksData.map((link, index) => {
    
    const routeCheck = router.pathname === `/General/${link}`

    const liClass = 
      routeCheck
        ? classes.navlinkShowLiActive
        : null

    const linkClass =
      routeCheck
        ? classes.navlinkActive
        : classes.navlink

    return (
      <li key={index} className={liClass}>
        <Link
          href={`/General/${link}`}
          className={linkClass}
          onClick={() => {handleClick()}}
        >
          {link}
        </Link>
      </li>
    )
  });

  
  // add the dashboard link that is different from mapped links
  generalLinks.push(
    <li key={generalLinks.length}>
      <Link href="/Dashboard/Intro" className={classes.navlink}>
        Member Dashboard
      </Link>
    </li>
  );



  // MAIN RETURN/RENDER OF COMPONENT
  // ====================================================================  
  return (
    <nav className={classes.navbar}>
      {/* FMC logo/home link */}
      <Link href="/" className={classes.navlogo}>
        <Image priority src={FMC_logo} alt="FMC logo" />
      </Link>
      {/* Mobile hamburger menu */}
      <div onClick={() => {handleClick()}}>
        {menuIcon}
      </div>
      {/* Nav links */}
      <div className={allLinks}>
        <ul>
          {generalLinks}
        </ul>
      </div>
    </nav>
  );
}