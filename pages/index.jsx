// /*import BGimageTablet from '../assets/Tablet_BG.svg';
// import BGimageMobile from '../assets/Mobile_BG.svg';*/
// Imported Components
import GeneralLayout from "../components/general/GeneralLayout.jsx";
// Import stylesheet
import classes from "../styles/Index.module.css";



export default function Home() {
  return <div className={classes.generalIntro}></div>;
}


Home.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
}
