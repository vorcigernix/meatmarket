import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import Link from "next/link";

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";

let rpcEndpoint =
	"https://polygon-mumbai.g.alchemy.com/v2/elWZjOPfS0H03lYqe4-fSCu7LM4i7HUD";

export default function Home() {
	const [nfts, setNfts] = useState([]);
	const [loadingState, setLoadingState] = useState("not-loaded");
	useEffect(() => {
		loadNFTs();
	}, []);
	async function loadNFTs() {
		const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
		//const provider = new ethers.providers.InfuraProvider("maticmum", {projectId: "f0671e059fde4ab1a541db0a8ea9aa1d",projectSecret: "056ae48abd6d4f0682f5df28258d3ea2",});
		//const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/f0671e059fde4ab1a541db0a8ea9aa1d");
		//const provider = new ethers.providers.InfuraProvider("maticmum", { projectId: "f0671e059fde4ab1a541db0a8ea9aa1d",});
		//const provider = new ethers.providers.InfuraProvider("ropsten","f0671e059fde4ab1a541db0a8ea9aa1d");

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
			<section className='text-gray-600 body-font'>
				<div className='container px-5 py-24 mx-auto flex flex-wrap'>
					<h2 className='sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5'>
						This page is empty and that&apos;s great.
						<img
							className='object-cover object-center rounded-full w-32 h-32 mx-auto my-10 md:m-8'
							alt='hero'
							src='https://source.unsplash.com/random/128x128/?space'
						/>
					</h2>

					<div className='md:w-3/5 md:pl-6'>
						<p className='leading-relaxed text-base pb-8'>
							It is empty because all profile cards created in the system are
							bought already. If you represent a company or agency, it is a
							great opportunity to finish the first steps decribed{" "}
							<Link href='/about' passHref>
								<a className='underline'>here</a>
							</Link>
							.
						</p>
						<p className='leading-relaxed text-base'>
							If you are a profesional, looking for a place to create your
							profile card NFT, even better. Go create your profile quickly{" "}
							<Link href='/create-item' passHref>
								<a className='underline'>here</a>
							</Link>{" "}
							and be among first cards listed on this page.
						</p>
						<div className='flex md:mt-4 mt-6'>
							<Link href='/about' passHref>
								<a className='text-purple-500 inline-flex items-center'>
									Help, what is this about?
									<svg
										fill='none'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										className='w-4 h-4 ml-2'
										viewBox='0 0 24 24'>
										<path d='M5 12h14M12 5l7 7-7 7'></path>
									</svg>
								</a>
							</Link>
						</div>
					</div>
				</div>
			</section>
		);
	return (
		<>
			<section
				className={`h-1 my-2 bg-gradient-to-l from-pink-500  via-purple-500 to-pink-500 background-animate ${
					loadingState == "loaded" && "hidden"
				}`}></section>
			<section className='text-gray-600 body-font'>
				<div className='container px-5 py-24 mx-auto flex flex-wrap'>
					<h2 className='sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5'>
						Younf Profiles
					</h2>
					<div className='md:w-3/5 md:pl-6'>
						{loadingState === "not-loaded" ? (
							<p className='leading-relaxed text-base'>
								We are loading the profiles from smart contract, please wait. By buying them, you get a
								direct contact information.
							</p>
						) : (
							<p className='leading-relaxed text-base'>
								These are Younf profiles you can buy. By buying them, you get a
								direct contact information.
							</p>
						)}
						<div className='flex md:mt-4 mt-6'>
							<Link href='/about'>
								<a className='text-purple-500 inline-flex items-center'>
									Wait, but why
									<svg
										fill='none'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										className='w-4 h-4 ml-2'
										viewBox='0 0 24 24'>
										<path d='M5 12h14M12 5l7 7-7 7'></path>
									</svg>
								</a>
							</Link>
						</div>
					</div>
				</div>
			</section>
			<section className='text-gray-600 body-font'>
				<div className='container px-5 pb-24 mx-auto'>
					<div className='flex flex-wrap -m-4 '>
						{nfts.map((nft, i) => (
							<div key={i} className='p-1 md:w-1/3 lg:w-1/4  '>
								<div className='h-full  rounded-lg overflow-hidden shadow-lg shadow-purple-500/50'>
									<img
										className='lg:h-96 md:h-80 w-full object-cover object-center'
										src={nft.image}
										alt={nft.name}
									/>
									<div className='p-6'>
										<h2 className='tracking-widest text-xs title-font font-medium text-gray-400 mb-1'>
											{nft.location}
										</h2>
										<h1 className='title-font text-lg font-medium text-gray-900 mb-3'>
											{nft.name}
										</h1>
										<p className='leading-relaxed mb-3'>{nft.description}</p>
										<div className='flex items-center flex-wrap '>
											<button
												className='text-purple-500 inline-flex items-center md:mb-2 lg:mb-0'
												onClick={() => buyNft(nft)}>
												Get
												<svg
													className='w-4 h-4 ml-2'
													viewBox='0 0 24 24'
													stroke='currentColor'
													strokeWidth='2'
													fill='none'
													strokeLinecap='round'
													strokeLinejoin='round'>
													<path d='M5 12h14'></path>
													<path d='M12 5l7 7-7 7'></path>
												</svg>
											</button>
											<span className='text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1'></span>
											<span className='text-gray-900 inline-flex items-center leading-none text-sm'>
												<img
													className='w-5 h-5'
													src='eth.svg'
													alt='ethereum logo'
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
