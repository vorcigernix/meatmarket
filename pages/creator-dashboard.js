import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

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
		return <h1 className='py-10 px-20 text-3xl'>No cards created</h1>;
	return (
		<section className='text-gray-600 body-font'>
			<div className='container px-5 py-24 mx-auto'>
				<h2 className='text-2xl py-2'>Created Cards</h2>
				<div className='flex flex-wrap -m-4'>
					{nfts.map((nft, i) => (
						<div key={i} className='xl:w-1/3 md:w-1/2 p-4'>
							<div className='rounded-xl shadow-lg shadow-purple-500/50 p-6'>
								<div className='w-10 h-10 inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-500 mb-4'>
									<img
										src={nft.image}
										alt='profile picture'
										className='rounded-full'
									/>
								</div>
								<h2 className='text-lg text-gray-900 font-medium title-font mb-2'>
									{nft.name}{" "}
									{nft.sold && (
										<span className='text-green-500 text-sm'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-6 w-6'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
												/>
											</svg>
											Sold
										</span>
									)}
								</h2>
								<p className='leading-relaxed text-base'>{nft.description}</p>

								<div className='w-12 h-1 bg-purple-500 rounded mt-2 mb-4'></div>
								<p className=' text-sm'>{nft.skills}</p>
								<p>{nft.price} ETH</p>
								{nft.sold && (
									<p className='text-sm  break-all'>Owner: {nft.owner}</p>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
