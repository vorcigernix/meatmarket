import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import Link from "next/link";

import addPolygonNetwork from "/components/injectPolygonMain";

import { marketplaceAddress } from "../config";

import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";

import Loader from "../components/loader";

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([]);
  const [sold, setSold] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, [nfts]);
  async function loadNFTs() {
    await addPolygonNetwork();
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );
    const data = await contract.fetchItemsListed();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await contract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          sold: i.sold,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
          skills: meta.data.skills,
          seaId: tokenUri,
        };
        return item;
      })
    );
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter((i) => i.sold);
    setSold(soldItems);
    setNfts(items);
    setLoadingState("loaded");
    console.log(items);
  }
  if (loadingState === "loaded" && !nfts.length)
    return (
      <section className="text-zinc-600 dark:text-zinc-300 ">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="font-title sm:text-4xl text-3xl mb-4 font-medium dark:text-white">
              You created&nbsp;
              <br className="hidden lg:inline-block" />
              no profiles
            </h1>
            <p className="mb-2 leading-relaxed ">
              <b className=" text-pink-400">How to get started.</b> If you
              don&apos;t have any wallet installed, you should start by
              <a
                className=" dark:text-white font-bold"
                href="https://metamask.io/download.html"
              >
                {" "}
                installing Metamask
              </a>{" "}
              and sending a funds to it.
            </p>
            <p className="mb-8 leading-relaxed ">
              While other wallets may work, we support only Metamask. If you are
              new to the blockchain, you should start by learning more about
              Ethereum{" "}
              <a
                href="https://ethereum.org/en/"
                rel="noreferrer"
                target="_blank"
                className="font-bold dark:text-white"
              >
                here
              </a>
              . Ethereum is a decentralized platform that runs smart contracts,
              NFT itself is only a type of smart contract.
            </p>
            <div className="flex justify-center">
              <Link href="https://metamask.io/download.html" passHref>
                <button className="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded font-sans ">
                  Install wallet
                </button>
              </Link>
              <Link href="/create-item" passHref>
                <a className="text-pink-500 inline-flex items-center ml-6 hover:underline underline-offset-8 decoration-2">
                  Create profiles
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </Link>
            </div>
            <p className="my-8 leading-relaxed">
              If you have a wallet installed, you should receive a dialog that
              add a Polygon network to your wallet and switch to this network.
              This is perfectly legitimate, but if you don&apos;t want us to
              configure your wallet, you can create follow a guide{" "}
              <a
                href="https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/"
                rel="noreferrer"
                target="_blank"
                className="font-bold dark:text-white"
              >
                here
              </a>
              . With wallet set
            </p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 shadow-lg shadow-pink-500/50">
            <picture>
              <source srcSet="/images/3.avif" type="image/avif" />
              <img
                className="object-cover object-center rounded"
                decoding="async"
                loading="lazy"
                src="/images/3.jpg"
                alt="hero image"
              />
            </picture>
          </div>
        </div>
      </section>
    );
  return (
    <>
      <section className="text-zinc-600 dark:text-zinc-300 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="font-title sm:text-4xl text-3xl mb-4 dark:text-white">
              Contact cards created
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              These are You.nf profiles you created. Those not sold already are
              listed on a Profiles page.
            </p>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              <Link href="/about">
                <a className="text-pink-500 inline-flex items-center hover:underline underline-offset-8 decoration-2">
                  Tell me more
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </Link>
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <Loader loadingState={loadingState}></Loader>
            {nfts.map((nft, i) => (
              <div key={`token${i}`} className="p-4 lg:w-1/4 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center">
                  <img
                    className="flex-shrink-0 rounded-lg w-full h-64 object-cover object-center mb-4 shadow-lg shadow-pink-500/50"
                    src={nft.image}
                    alt={nft.name}
                  />
                  <div className="w-full">
                    <h2 className="title-font font-medium text-lg text-zinc-900 dark:text-zinc-300">
                      {nft.name}
                    </h2>
                    <h3 className="text-zinc-500 mb-3">{nft.location}</h3>
                    <p className="mb-4">{nft.description}</p>
                    <span className="inline-flex">
                      {nft.sold && (
                        <a
                          className="text-pink-500 inline-flex items-center md:mb-2 lg:mb-0 text-sm"
                          target="_blank"
                          rel="noreferrer"
                          href={`https://mumbai.polygonscan.com/address/${nft.owner}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            />
                          </svg>
                          Owned
                        </a>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
