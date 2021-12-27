import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import Link from "next/link";

import { nftmarketaddress, nftaddress } from "../config";

import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

export default function MyAssets() {
	const [nfts, setNfts] = useState([]);
	const [loadingState, setLoadingState] = useState("not-loaded");
	useEffect(() => {
		loadNFTs();
	}, []);
	async function loadNFTs() {
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
		return <h1 className='py-10 px-20 text-3xl'>No assets owned</h1>;
	return (
		<>
			<section className='text-gray-600 body-font'>
				<div className='container px-5 py-24 mx-auto flex flex-wrap'>
					<h2 className='sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5'>
						Your Contacts
					</h2>
					<div className='md:w-3/5 md:pl-6'>
						<p className='leading-relaxed text-base'>
							This is your collection. You can get more on the main page.
						</p>
						<div className='flex md:mt-4 mt-6'>
							<Link href='/'>
								<a className='text-purple-500 inline-flex items-center'>
									Get more
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
				<div className='container px-5 py-24 mx-auto flex flex-col'>
					<div className='lg:w-4/6 mx-auto'>
						{nfts.map((nft, i) => (
							<div
								key={i}
								className='flex flex-col sm:flex-row md:mt-10 rounded-xl shadow-lg shadow-purple-500/50 p-8 md:p-4'>
								<div className='sm:w-1/3 text-center sm:pr-8 sm:py-8'>
									<div className='w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400'>
										<img
											src={nft.image}
											alt='profile picture'
											className='rounded-full'
										/>
									</div>
									<div className='flex flex-col items-center text-center justify-center'>
										<h2 className='font-medium title-font mt-4 text-gray-900 text-lg'>
											{nft.name}
										</h2>
										<div className='w-12 h-1 bg-purple-500 rounded mt-2 mb-4'></div>
										<p className='text-sm'>
											<Link href={`mailto:${nft.email}`}>{nft.email}</Link>
										</p>
										<p className='text-sm pt-2'>
											<Link href={`tel:${nft.mobile}`}>{nft.mobile}</Link>
										</p>

									</div>
								</div>
								<div className='sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left'>
									<p className='leading-relaxed text-sm mb-4 inline-flex'>
										<Link href={nft.linked}>
											<a>
												<svg
													width='28'
													height='28'
													fill='currentColor'
													className='text-gray-600 mr-3 text-opacity-50 transform'>
													<path
														fillRule='evenodd'
														clipRule='evenodd'
														d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
													/>
												</svg>
											</a>
										</Link>
										<Link href={`https://github.com/${nft.github}`}>
											<a>
												<svg
													width='28'
													height='28'
													fill='currentColor'
													className='text-gray-600 mr-3 text-opacity-50 transform'>
													<path
														fillRule='evenodd'
														clipRule='evenodd'
														d='M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z'></path>
												</svg>
											</a>
										</Link>
										{nft.skills}
									</p>
									<p className='leading-relaxed text-lg mb-4'>
										{nft.description}
									</p>
									<a className='text-purple-500 inline-flex items-center'>
										Market
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
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
