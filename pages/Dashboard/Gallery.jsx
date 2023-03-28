// Imported Components
import NFTGallery from "../../components/dashboard/gallery/nftGallery";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
// Imported Stylesheet
import classes from "../../styles/dashboard/Gallery.module.css";


export default function Gallery() {
	return (
		<div className={classes.main}>
			<NFTGallery />
		</div>
	)
}

Gallery.getLayout = function getLayout(page) {
	return <DashboardLayout>{page}</DashboardLayout>
}