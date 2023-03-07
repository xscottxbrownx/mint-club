// import styles from "../styles/Home.module.css";
// import NFTGallery from "../components/nftGallery";

// export default function Home() {
//   return (
//     <div>
//       <main className={styles.main}>
//         <NFTGallery />
//       </main>
//     </div>
//   );
// }

// // Imported components
// import Footer from "../components/general/footer/Footer.js";

// /*import BGimageTablet from '../assets/Tablet_BG.svg';
// import BGimageMobile from '../assets/Mobile_BG.svg';*/

// // Import stylesheet
// import classes from "../styles/GeneralIntro.module.css";

// const GeneralIntro = () => {
//   return (
//     <>
//       <div className={classes.generalIntro}></div>
//       <Footer />
//     </>
//   );
// };

// export default GeneralIntro;

// Imported Components
import GeneralLayout from "../components/general/GeneralLayout.jsx";
// Import stylesheet
import classes from "../styles/Index.module.css";

export default function Home() {
  return <div className={classes.generalIntro}></div>;
}

Home.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};
