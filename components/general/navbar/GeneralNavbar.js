// Imports from React
import { useState } from "react";
// Imports from Next
import Link from "next/link";
import Image from "next/image";
// Imported assets
import FMC_logo from "../../../public/navbar_logo_dropshadow.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// Imported stylesheet
import classes from "./GeneralNavbar.module.css";



export default function GeneralNavbar() {
  
  const [active, setActive] = useState(false);
  const links = ["About", "Team", "Vision"];


  const handleClick = () => {
    const navmenu = document.getElementsByClassName(classes.navlist)[0];
    navmenu.classList.toggle(classes.active);
    setActive((active) => !active);
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
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={`/General/${link}`}
                className={classes.navlink}
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
