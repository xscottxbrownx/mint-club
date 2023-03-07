// Imported Components
import Footer from "./footer/Footer";
import GeneralNavbar from "./navbar/GeneralNavbar";

export default function GeneralLayout({ children }) {
  return (
    <>
      <GeneralNavbar />
      {children}
      <Footer />
    </>
  );
}
