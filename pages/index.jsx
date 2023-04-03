// Imports from Next
import Image from "next/image.js";
// Imported Components
import GeneralLayout from "../components/general/GeneralLayout.jsx";
// Import Stylesheet
import classes from "../styles/Index.module.css";
// Imported Assests
import BGimageDesktop from "../public/Desktop_BG.png"



export default function Home() {

  return (
    <div className={classes.generalIntro}>
      <Image src={BGimageDesktop} alt="Free Mint Club logo" className={classes.generalIntroImage} />
    </div>
  );
}


Home.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
}
