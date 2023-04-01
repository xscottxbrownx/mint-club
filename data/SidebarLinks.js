// Imported assets
import {
  faBell,
  faImage,
  faCoins,
  faChartLine,
  faDollarSign,
  faLandmark,
} from "@fortawesome/free-solid-svg-icons";



const sidebarLinks = [
  { link: "/Dashboard/Gallery",
    text: "Gallery",
    icon: faImage,
  },
  { link: "/Dashboard/Wallet",
    text: "Wallet",
    icon: faCoins,
  },
  { link: "/Dashboard/History",
    text: "History",
    icon: faLandmark,
  },
  { link: "/Dashboard/Charting",
    text: "Chart",
    icon: faChartLine,
  },
  { link: "/Dashboard/Marketplace",
    text: "Shop",
    icon: faDollarSign,
  },
  { link: "/Dashboard/Notifications",
    text: "Notify",
    icon: faBell,
  }
]

export default sidebarLinks;