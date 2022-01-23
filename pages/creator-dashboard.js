import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import Link from "next/link";

import addPolygonNetwork from "/components/injectPolygon";

import { nftmarketaddress, nftaddress } from "../config";

import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([]);
  const [sold, setSold] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    addPolygonNetwork();
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchItemsCreated();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
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
          seaId: i.nftContract,
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
      <section className="text-gray-600 dark:text-gray-300 ">
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
    <section className="text-gray-600 ">
      <div className="container px-5 py-24 mx-auto">
        <h2 className="text-2xl py-2">Created Cards</h2>
        <div className="flex flex-wrap -m-4">
          {nfts.map((nft, i) => (
            <div key={i} className="xl:w-1/3 md:w-1/2 p-4">
              <div className="rounded-xl shadow-lg shadow-pink-500/50 p-6">
                <div className="inline-flex items-center justify-center mb-4">
                  <img
                    className="object-cover object-center rounded-full w-14 h-14 mx-auto my-4 mr-4"
                    alt="profile picture"
                    src={nft.image}
                  />
                  <span>{nft.name}</span>
                </div>
                <h2 className="text-lg text-gray-900 font-medium font-title mb-2">
                  {nft.sold && (
                    <span className="text-green-500 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
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
                      Sold
                    </span>
                  )}
                </h2>
                <p className="leading-relaxed text-base">{nft.description}</p>

                <div className="w-12 h-1 bg-pink-500 rounded mt-2 mb-4"></div>
                <p className=" text-sm">{nft.skills}</p>
                <p>{nft.price} ETH</p>
                {nft.sold && (
                  <p className="text-sm  break-all">Owner: {nft.owner}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
