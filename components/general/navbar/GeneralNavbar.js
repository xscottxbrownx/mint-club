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


const GeneralNavbar = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    const navmenu = document.getElementsByClassName(classes.navlist)[0];
    navmenu.classList.toggle(classes.active);
    setActive((active) => !active);
  };

  return (
    <nav className={classes.navbar}>
      <Link href="/" className={classes.navlogo}>
        <Image priority src={FMC_logo} alt="FMC logo" />
      </Link>

      <button
        onClick={() => {
          handleClick();
        }}
      >
        {active ? (
          <FontAwesomeIcon
            className={`${classes.closeIcon} fa-2x`}
            icon={faTimes}
          />
        ) : (
          <FontAwesomeIcon
            className={`${classes.hamburgerIcon} fa-2x`}
            icon={faBars}
          />
        )}
      </button>

      <div className={classes.navlist}>
        <ul>
          <li>
            <Link
              href="/General/About"
              className={classes.navlink}
              onClick={() => {
                handleClick();
              }}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/General/Team"
              className={classes.navlink}
              onClick={() => {
                handleClick();
              }}
            >
              Team
            </Link>
          </li>
          <li>
            <Link
              href="/General/Vision"
              className={classes.navlink}
              onClick={() => {
                handleClick();
              }}
            >
              Vision
            </Link>
          </li>
          <li>
            <Link href="/Dashboard/Intro" className={classes.navlink}>
              Member Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default GeneralNavbar;
