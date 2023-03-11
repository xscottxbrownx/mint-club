// Imported Components
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import TokenBalancesDisplay from "../../components/dashboard/wallet/tokenBalancesDisplay.jsx"
// Imports from Wagmi
import { useAccount } from "wagmi";


export default function Wallet() {
  const {address} = useAccount();
  return(
    <TokenBalancesDisplay walletAddress={address} chain={"ETH_MAINNET"}/>
  );
}

Wallet.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};