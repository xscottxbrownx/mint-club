// Imported Components
// import DashboardLayout from "../../components/dashboard/DashboardLayout";
// // Imported stylesheet
// import classes from "../../styles/dashboard/Wallet.module.css";

// const Wallet = () => {
//   return (
//     <div className={classes.walletContainer}>
//       <div className={classes.placeholder}>WALLET COMPONENT</div>
//     </div>
//   );
// };

// export default Wallet;


// Wallet.getLayout = function getLayout(page) {
//   return <DashboardLayout>{page}</DashboardLayout>;
// };

// PLACEHOLDER CONTENT⬆️


//========================================================
//========================================================



// Imported Components
import DashboardLayout from "../../components/dashboard/DashboardLayout";
// Imports from React
import { useState, useEffect } from "react";
// Imports from Wagmi
import { useAccount } from "wagmi";
// Imported stylesheet
import styles from "../../styles/dashboard/Wallet.module.css";


export default function Wallet({ walletAddress, chain }) {
  const [tokensBalance, setTokensBalance] = useState();
  const [isLoading, setIsloading] = useState(false);
  const { address, isConnected, isDisconnected } = useAccount();
  const [propAddress, setPropAddress] = useState();

  useEffect(() => {
    const getNFTs = async () => {
      setIsloading(true);
      if (isConnected || walletAddress) {
        try {
          const fetchedTokensBalance = await fetch("/api/getTokensBalance", {
            method: "POST",
            body: JSON.stringify({
              address: walletAddress ? walletAddress : address,
              chain,
            }),
          }).then((res) => res.json());
          setTokensBalance(fetchedTokensBalance);
        } catch (e) {
          console.log(e);
        }
      }

      setIsloading(false);
    };

    getNFTs();
  }, []);

  useEffect(() => {
    if (!propAddress?.length && address) setPropAddress(address);
  }, [address]);
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className={styles.token_panel_container}>
      <div className={styles.token_box}>
        <h2>
        {/* UNDEFINED ISSUE HERE */}
        {console.log(walletAddress, "walletAddress")}
        {console.log(propAddress, "propAddress")}
          {isDisconnected && walletAddress?.length
            ? `${walletAddress.slice(0, 10)}...${walletAddress.contract.slice(
                38
              )} `
            : `${propAddress?.slice(0, 10)}...${propAddress?.slice(38)}`}
        </h2>
        <div className={styles.tokens_container}>
          {tokensBalance?.length &&
            tokensBalance.map((token) => {
              return (
                <div key={token.symbol} className={styles.token}>
                  <div className={styles.token_name_container}>
                    <div className={styles.image_container}>
                      <img
                        src={
                          token.logo
                            ? token.logo
                            : "http://via.placeholder.com/50"
                        }
                        
                      />
                    </div>
                    <p className={styles.token_name}>{token.name}</p>
                  </div>

                  <div className={styles.info_container}>
                    <div className={styles.token_name_sybol_container}>
                      <p className={styles.token_balance}>{token.balance}</p>
                      <p className={styles.token_symbol}>{token.symbol}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}


Wallet.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};