import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import Link from "next/link";

import addPolygonNetwork from "/components/injectPolygon";

import { nftmarketaddress, nftaddress } from "../config";

import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

import Loader from "../components/loader";

export default function MyAssets() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    await addPolygonNetwork();
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
    const data = await marketContract.fetchMyNFTs();

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
          image: meta.data.image,
          name: meta.data.name,
          location: meta.data.location,
          description: meta.data.description,
          linked: meta.data.linked,
          mobile: meta.data.mobile,
          email: meta.data.email,
          github: meta.data.github,
          skills: meta.data.skills,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }
  if (loadingState === "loaded" && !nfts.length)
    return (
      <section className="text-zinc-600 dark:text-zinc-300 ">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="font-title sm:text-4xl text-3xl mb-4 font-medium dark:text-white">
              We found&nbsp;
              <br className="hidden lg:inline-block" />
              no profiles
            </h1>
            <p className="mb-2 leading-relaxed ">
              <b className=" text-pink-400">How to get started.</b> From a
              technology standpoint, you can be ready to get started with Younf
              in a few minutes. You need to{" "}
              <a
                className=" dark:text-white font-bold"
                href="https://metamask.io/download.html"
              >
                install a wallet
              </a>{" "}
              and send a funds to it.
            </p>
            <p className="mb-8 leading-relaxed ">
              We know that this is not how companies operate though. Best way to
              start would be probably to reach out to a consultant experienced
              in blockchain and web3 technologies.
            </p>
            <div className="flex justify-center">
              <Link href="https://metamask.io/download.html" passHref>
                <button className="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded font-sans ">
                  Install wallet
                </button>
              </Link>
              <Link href="/profiles" passHref>
                <a className="text-pink-500 inline-flex items-center ml-6 hover:underline underline-offset-8 decoration-2">
                  Show profiles
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
              You need to cover a regulation, accounting and tax obligations and
              security concerns to be able to use Younf as a legal entity. You
              are welcome to try our product as an individual though and we will
              do our best to help your teams to onboard.
            </p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 shadow-lg shadow-pink-500/50">
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
        </div>
      </section>
    );
  return (
    <>
      <section className="text-zinc-600 dark:text-zinc-300 ">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <h2 className="sm:text-3xl pl-5 text-2xl text-zinc-900 dark:text-zinc-300 font-medium font-title mb-2 md:w-2/5">
            Your Contacts
          </h2>
          <div className="md:w-3/5 md:pl-6">
            <p className="leading-relaxed text-base">
              This is your collection. You can get more on the profiles page.
            </p>
            <div className="flex md:mt-4 mt-6">
              <Link href="/profiles" passHref>
                <a className="text-pink-500 inline-flex items-center hover:underline underline-offset-8 decoration-2">
                  Get more
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
          <div key="wrapper" className="flex flex-wrap md:space-x-5 space-y-5">
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
                      <a
                        className="text-pink-500 inline-flex items-center md:mb-2 lg:mb-0 text-sm"
                        href={nft.linked}
                      >
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="0"
                          className="w-5 h-5 mr-1"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="none"
                            d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                          ></path>
                          <circle cx="4" cy="4" r="2" stroke="none"></circle>
                        </svg>
                        LinkedIn
                      </a>
                      <a
                        href={`tel:${nft.mobile}`}
                        className="text-zinc-400 dark:text-zinc-300 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        Phone
                      </a>

                      <a
                        href={`mailto:${nft.email}`}
                        className="text-zinc-400 dark:text-zinc-300 inline-flex items-center leading-none text-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        Email
                      </a>
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

function a() {
  return (
    <div
      key={i}
      className="flex flex-col sm:flex-row md:mt-10 rounded-xl shadow-lg shadow-pink-500/50 p-8 md:p-4"
    >
      <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
        <div className="inline-flex items-center justify-center bg-zinc-200 text-zinc-400 rounded-full">
          <img
            src={nft.image}
            alt="profile picture"
            className="object-cover object-center rounded-full w-32 h-32"
          />
        </div>
        <div className="flex flex-col items-center text-center justify-center">
          <h2 className="font-medium font-title mt-4 text-zinc-900 text-lg">
            {nft.name}
          </h2>
          <div className="w-12 h-1 bg-pink-500 rounded mt-2 mb-4"></div>
          <p className="text-sm">
            <Link href={`mailto:${nft.email}`}>{nft.email}</Link>
          </p>
          <p className="text-sm pt-2">
            <Link href={`tel:${nft.mobile}`}>{nft.mobile}</Link>
          </p>
        </div>
      </div>
      <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-zinc-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
        <p className="leading-relaxed text-sm mb-4 inline-flex">
          <Link href={nft.linked} passHref>
            <a>
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </Link>
          <Link href={`https://github.com/${nft.github}`} passHref>
            <a>
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5 mr-4"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
                ></path>
              </svg>
            </a>
          </Link>
          {nft.skills}
        </p>
        <p className="leading-relaxed text-sm mb-4 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>{" "}
          {nft.location}
        </p>
        <p className="leading-relaxed text-lg mb-4">{nft.description}</p>
        <a
          href="https://opensea.io"
          className="text-pink-500 inline-flex items-center"
        >
          Market
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
      </div>
    </div>
  );
}
