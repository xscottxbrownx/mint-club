// Imports from React
import { useState } from "react";
// Imports from Next
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// Imported assets
import FMC_logo from "../../../public/navbar_logo_dropshadow.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// Imported stylesheet
import classes from "./GeneralNavbar.module.css";



export default function GeneralNavbar() {
  
  const [active, setActive] = useState(false);
  const router = useRouter();
  const currentRoute = router.pathname;
  const generalLinks = ["About", "Team", "Vision"];


  const handleClick = () => {
    const navmenu = document.getElementsByClassName(classes.navlist)[0];
    if ( window.innerWidth <= 600 || (window.innerWidth > 600 && navmenu.classList.contains(classes.active)) ) {
      navmenu.classList.toggle(classes.active);
      setActive((active) => !active);
    }
    return
  };


  const menuIcon = 
    active 
      ? <FontAwesomeIcon className={`${classes.closeIcon} fa-2x`} icon={faTimes} />
      : <FontAwesomeIcon className={`${classes.hamburgerIcon} fa-2x`} icon={faBars} />



  return (
    <nav className={classes.navbar}>
      <Link href="/" className={classes.navlogo}>
        <Image priority src={FMC_logo} alt="FMC logo" />
      </Link>

      <button onClick={() => {handleClick()}}>
        {menuIcon}
      </button>

      <div className={classes.navlist}>
        <ul>
          {generalLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={`/General/${link}`}
                className={currentRoute === `/General/${link}` ? classes.navlinkActive : classes.navlink}
                onClick={() => {handleClick()}}
              >
                {link}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/Dashboard/Intro" className={classes.navlink}>
              Member Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}