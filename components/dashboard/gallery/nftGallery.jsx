// Imports from React
import { useEffect, useState } from "react";
// Imported Stylesheet
import styles from "./NftGallery.module.css";
// Imports from Wagmi
import { useAccount } from "wagmi";
// Imported Components
import NftCard from "./NftCard";


export default function NFTGallery({}) {
  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState();
  const [walletOrCollectionAddress, setWalletOrCollectionAddress] = useState(isConnected ? address : "vitalik.eth");
  const [fetchMethod, setFetchMethod] = useState(isConnected ? "connectedWallet" : "wallet");
  const [pageKey, setPageKey] = useState(false);
  const [spamFilter, setSpamFilter] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const [chain, setChain] = useState(process.env.NEXT_PUBLIC_ALCHEMY_NETWORK);

  // set fetchMethod based on selection (wallet address, collection, or connected wallet)
  const changeFetchMethod = (e) => {
    setNfts();
    setPageKey();
    switch (e.target.value) {
      case "wallet":
        setWalletOrCollectionAddress("vitalik.eth");
        break;
      case "collection":
        setWalletOrCollectionAddress(
          "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e"
        );
        break;
      case "connectedWallet":
        setWalletOrCollectionAddress(address);
        break;
    }
    setFetchMethod(e.target.value);
  };

  // fetch NFTs with proper API call based on fetchMethod
  const fetchNFTs = async (pagekey) => {
    setIsloading(true);
    setNfts();
    if (!pageKey) setIsloading(true);
    const endpoint =
      fetchMethod == "wallet" || fetchMethod == "connectedWallet"
        ? "/api/getNftsForOwner"
        : "/api/getNftsForCollection";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          address:
            fetchMethod == "connectedWallet"
              ? address
              : walletOrCollectionAddress,
          pageKey: pagekey ? pagekey : null,
          chain: chain,
          excludeFilter: spamFilter,
        }),
        // [ENHANCEMENT] - Make load more button render 100 MORE nft's to the gallery display
        // currently it replaces the 100 displayed with the next 100
      }).then((res) => res.json());
      setNfts(res.nfts);
      if (res.pageKey) {
        setPageKey(res.pageKey);
      // if (nfts?.length && pageKey) {
      //   setNfts((prevState) => [...prevState, ...res.nfts]);
      } else {
        setPageKey();
        // setNfts();
        // setNfts(res.nfts);
      }
      // if (res.pageKey) {
      //   setPageKey(res.pageKey);
      // } else {
      //   setPageKey();
      // }
    } catch (e) {
      console.log(e);
    }
    setIsloading(false);
  };

  // fetch NFTs if fetchMethod or spamFilter change
  useEffect(() => {
    fetchNFTs();
  }, [fetchMethod, spamFilter]);
  


  // render NFTs from address as a Gallery/grid
  return (
    <div className={styles.nft_gallery_page}>
      <div>
        {/* ===== START OF RENDER TOP INPUTS ===== */}
        <div className={styles.fetch_selector_container}>
          <h2 style={{ fontSize: "20px" }}>Explore NFTs by</h2>
          {/* select the fetchMethod */}
          <div className={styles.select_container}>
            <select
              defaultValue={isConnected ? "connectedWallet" : "wallet"}
              onChange={(e) => {
                changeFetchMethod(e);
              }}
            >
              <option value={"wallet"}>address</option>
              <option value={"collection"}>collection</option>
              <option value={"connectedWallet"}>connected wallet</option>
            </select>
          </div>
        </div>
        <div className={styles.inputs_container}>
          <div className={styles.input_button_container}>
            {/* wallet/collection address input */}
            <input
              value={walletOrCollectionAddress}
              onChange={(e) => {
                setWalletOrCollectionAddress(e.target.value);
              }}
              placeholder="Enter NFT contract or wallet address"
            />
            <div className={styles.buttons_under_input}>
              {/* select the blockchain */}
              <div className={styles.select_container_alt}>
                <select
                  onChange={(e) => {
                    setChain(e.target.value);
                  }}
                  defaultValue={process.env.ALCHEMY_NETWORK}
                >
                  <option value={"ETH_MAINNET"}>Mainnet</option>
                  <option value={"MATIC_MAINNET"}>Polygon</option>
                  <option value={"ETH_GOERLI"}>Goerli</option>
                  <option value={"MATIC_MUMBAI"}>Mumbai</option>
                </select>
              </div>
              {/* search button */}
              <div onClick={() => fetchNFTs()} className={styles.button_blue}>
                <a>Search</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ===== END OF RENDER TOP INPUTS ===== */}

      
      {/* ===== START OF RENDER NFTs AS A GALLERY ===== */}
      {/* if loading RENDER LOADING popup */}
      {isLoading ? (
        <div className={styles.loading_box}>
          <p>Loading...</p>
        </div>
      // if done loading, show a spam toggle and diaply nfts as a grid gallery  
      ) : (
        <div className={styles.nft_gallery}>
          {/* RENDER a "HIDE SPAM" TOGGLE if not an nft collection address */}
          {nfts?.length && fetchMethod != "collection" && (
            <div
              style={{
                display: "flex",
                gap: ".5rem",
                width: "100%",
                justifyContent: "end",
              }}
            >
              <p>Hide spam</p>
              <label className={styles.switch}>
                <input
                  onChange={(e) => setSpamFilter(e.target.checked)}
                  checked={spamFilter}
                  type="checkbox"
                />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
            </div>
          )}

          {/* RENDER NFTS as a grid GALLERY of cards */}
          <div className={styles.nfts_display}>
            {nfts?.length ? (
              nfts.map((nft, index) => {
                return <NftCard key={index} nft={nft} />;
              })
            ) : (
              <div className={styles.loading_box}>
                <p>No NFTs found for the selected address</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* if more than 100 nfts, RENDER a "LOAD MORE" button */}
      {pageKey && nfts?.length && (
        <div>
          <a
            className={styles.button_blue}
            onClick={() => {
              fetchNFTs(pageKey);
            }}
          >
            Load more
          </a>
        </div>
      )}
      {/* ===== END OF RENDER NFTs AS A GALLERY ===== */}
    </div>
  );
}