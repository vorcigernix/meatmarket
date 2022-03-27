import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { useRouter } from "next/router";
import Link from "next/link";

import addPolygonNetwork from "/components/injectPolygonMain";

import { marketplaceAddress } from "../config";

import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import Loader from "../components/loader";

export default function MyAssets() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const router = useRouter();
  useEffect(() => {
    loadNFTs();
    //loadTestNFTS();
  }, []);

  async function loadTestNFTS() {
    const items = [
      {
        price: 0.1,
        tokenId: 22,
        tokenURI: "https://polygon.io/assets/22",
        seller: "0x8980980",
        owner: "0x8980980",
        image: "https://dummyimage.com/200x200",
        name: "Adam Sobotka",
        location: "Czech Republic",
        description:
          "Experienced software developer with a focus on web development and mobile development.",
        linked: "https://www.linkedin.com/in/adamsobotka/",
        mobile: "89099000980",
        email: "vorcigernix@gmail.com",
        github: "https://github.com/vorcigernix",
        skills: "javascript, management",
      },
    ];
    setNfts(items);
    setLoadingState("loaded");
  }
  async function loadNFTs() {
    await addPolygonNetwork();
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketplaceContract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );
    const data = await marketplaceContract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenURI = await marketplaceContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenURI);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          tokenURI,
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
      <section className="text-zinc-600  dark:text-zinc-300 ">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="font-title sm:text-4xl text-3xl mb-4 font-medium dark:text-white">
              We found&nbsp;
              <br className="hidden lg:inline-block" />
              no profiles
            </h1>
            <p className="mb-2 leading-relaxed ">
              <b className=" text-pink-400">How to get started.</b> From a
              technology standpoint, you can be ready to get started with You.nf
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
              You&apos;ll need to cover a regulation, accounting, tax
              obligations and security concerns to be able to use You.nf as a
              legal entity. You are welcome to try our product as an individual
              though and we will do our best to help your teams to onboard.
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
    <section className="text-zinc-600 dark:text-zinc-300 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="font-title sm:text-4xl text-3xl mb-4 dark:text-white">
            Your contacts
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            These are You.nf profiles you bought, a contact list in a sense. You
            can see detailed information about each profile and you can do your
            preliminary research or contect them directly.
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
            <div key={`yourcard${i}`} className="p-4 lg:w-1/4 md:w-1/2">
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
                  <span className="flex flex-row justify-center items-center gap-12 my-6">
                    <a className="text-zinc-400 pb-2" href={nft.linked}>
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                      </svg>
                    </a>
                    <a
                      className="text-zinc-400"
                      href={`tel:${nft.mobile}`}
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </a>
                    <a
                      className="text-zinc-400"
                      href={`mailto:${nft.email}`}
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
