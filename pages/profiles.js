import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import Link from "next/link";

import { marketplaceAddress } from "../config";

import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";

import Loader from "../components/loader";

//let rpcEndpoint = "https://polygon-rpc.com/";

export default function Profiles() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    //const provider = new ethers.providers.JsonRpcProvider();
    const provider = new ethers.providers.InfuraProvider(
      "matic",
      "f0671e059fde4ab1a541db0a8ea9aa1d"
    );
    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      provider
    );
    const data = await contract.fetchMarketItems();

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
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price,
    });
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
      <section className="text-zinc-600 dark:text-zinc-300 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="font-title sm:text-4xl text-3xl mb-4 dark:text-white">
              You.nf Profiles
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              These are You.nf profiles you can buy. By buying them, you get a
              direct contact information.
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
              <div key={`younfcard${i}`} className="p-4 lg:w-1/4 md:w-1/2">
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
                      <button
                        className="text-pink-500 inline-flex items-center md:mb-2 lg:mb-0"
                        onClick={() => buyNft(nft)}
                      >
                        Get contact for {nft.price} ⟠
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
