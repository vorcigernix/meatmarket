import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import Link from "next/link";

import { nftaddress, nftmarketaddress, marketplaceAddress } from "../config";

import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";
import Loader from "../components/loader";

let rpcEndpoint = "https://polygon-rpc.com/";
//"https://polygon-mumbai.g.alchemy.com/v2/elWZjOPfS0H03lYqe4-fSCu7LM4i7HUD";

export default function Profiles() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);


    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          itemId: i.itemId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          location: meta.data.location,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }
  async function buyNft(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.itemId,
      {
        value: price,
      }
    );
    await transaction.wait();
    loadNFTs();
  }
  if (loadingState === "loaded" && !nfts.length)
    return (
      <>
        <section className="text-zinc-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
              <picture>
                <source srcSet="/images/4.avif" type="image/avif" />
                <img
                  className="object-cover object-center rounded"
                  decoding="async"
                  loading="lazy"
                  src="/images/4.jpg"
                  alt="hero image"
                />
              </picture>
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-zinc-900 dark:text-white">
                This page is empty <br className="hidden lg:inline-block" />
                and that&apos;s great.
              </h1>
              <p className="mb-8 leading-relaxed dark:text-zinc-300">
                It is empty because all profile cards created in the system are
                bought already. If you represent a company or agency, it is a
                great opportunity to finish the first steps decribed{" "}
                <Link href="/about" passHref>
                  <a className="underline">here</a>
                </Link>
                .
              </p>
              <p className="mb-8 leading-relaxed dark:text-zinc-300">
                If you are a profesional, looking for a place to create your
                profile card NFT, even better. Go create your profile quickly{" "}
                <Link href="/create-item" passHref>
                  <a className="underline">here</a>
                </Link>{" "}
                and be among first cards listed on this page.
              </p>
              <div className="flex justify-center">
                <Link href="/about" passHref>
                  <a className="text-pink-500 inline-flex items-center hover:underline underline-offset-8 decoration-2">
                    Help, what is this about?
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
            </div>
          </div>
        </section>
      </>
    );
  return (
    <>
      <section className="text-zinc-600  ">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <h2 className="sm:text-3xl pl-5 text-2xl text-zinc-900 dark:text-zinc-400 font-medium font-title mb-2 md:w-2/5">
            You.nf Profiles
          </h2>
          <div className="md:w-3/5 md:pl-6">
            <p className="leading-relaxed text-base dark:text-zinc-400">
              These are You.nf profiles you can buy. By buying them, you get a
              direct contact information.
            </p>

            <div className="flex md:mt-4 mt-6">
              <Link href="/about">
                <a className="text-pink-500 inline-flex items-center hover:underline underline-offset-8 decoration-2">
                  More details
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
          </div>
        </div>
      </section>
      <section>
        <div className="container px-5 pb-24 mx-auto">
          <div key="wrapper" className="flex flex-wrap space-x-5 space-y-5">
            <Loader loadingState={loadingState}></Loader>

            {nfts.map((nft, i) => (
              <div key={`card${i}`} className="p-1 md:w-1/4 lg:w-1/5  ">
                <div className="h-full dark:bg-zinc-900 rounded-lg overflow-hidden shadow-lg shadow-pink-500/50">
                  <img
                    className="lg:h-72 md:h-72 w-full object-cover object-center"
                    src={nft.image}
                    alt={nft.name}
                  />
                  <div className="p-6">
                    <h2 className="tracking-widest text-xs font-title font-medium text-zinc-400 mb-1">
                      {nft.location}
                    </h2>
                    <h1 className="text-lg font-medium text-zinc-900 dark:text-zinc-200 mb-3">
                      {nft.name}
                    </h1>
                    <p className="leading-relaxed mb-3 h-16 text-zinc-800 dark:text-zinc-400 ">
                      {nft.description}
                    </p>
                    <div className="flex items-center flex-wrap ">
                      <button
                        className="text-pink-500 inline-flex items-center md:mb-2 lg:mb-0"
                        onClick={() => buyNft(nft)}
                      >
                        Get
                        <svg
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </button>
                      <span className="text-zinc-400 dark:text-zinc-300 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1"></span>
                      <span className="text-zinc-900 dark:text-zinc-200 inline-flex items-center leading-none text-sm">
                        <img
                          className="w-5 h-5"
                          src="eth.svg"
                          alt="ethereum logo"
                        />
                        {nft.price}
                      </span>
                    </div>
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
